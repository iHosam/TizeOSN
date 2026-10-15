/**
 * TizeOSN AdBlock Engine v1.0.4
 * Multi-layer impenetrable ad defense:
 * 1. Stream API hook: Enforces hasAds=false and captures clean manifest URL.
 * 2. Response modifier: In-place text()/json() overrides (safe for all Tizen web engines).
 * 3. Broadpeak SSAI neutralizer: Blocks BkM/BkYou manifest stitching requests.
 * 4. Shaka Player load interceptor: Forces playback of pristine unstitched manifest.
 * 5. Pause-ad & Preroll eliminator: Stubs pause-ad endpoints and wipes preroll trailers.
 * 6. DOM ad event suppressor: Captures and kills Apollo ad overlay events.
 */

import { configRead, incrementBlockedAds } from '../config.js';
import { showToast } from '../ui/osd.js';
import { t } from '../translations/index.js';

let lastToastTime = 0;

// Store the clean, unstitched manifest URL across calls
window.__TIZEOSN_CLEAN_MANIFEST__ = null;

function notifyAdBlocked(label) {
  incrementBlockedAds();
  const now = Date.now();
  if (now - lastToastTime > 4000) {
    lastToastTime = now;
    showToast(t('toastAdBlocked'));
  }
  if (label) {
    console.log('[TizeOSN AdBlock]', label);
  }
}

// Known third-party ad networks, telemetry trackers, and pause-ad endpoints
const AD_PATTERNS = [
  /googleads\.g\.doubleclick\.net/i,
  /pubads\.g\.doubleclick\.net/i,
  /securepubads\.g\.doubleclick\.net/i,
  /pagead2\.googlesyndication\.com/i,
  /imasdk\.googleapis\.com/i,
  /\.fwmrm\.net/i,
  /\.freewheel\.tv/i,
  /adnxs\.com/i,
  /rubiconproject\.com/i,
  /criteo\.com/i,
  /app\.adjust\.com/i,
  /\.appsflyer\.com/i,
  /api\.branch\.io/i,
  /api\.mixpanel\.com/i,
  /api\.moengage\.com/i,
  /omweb-v1/i,
  /omid-session-client/i,
  /adTracking/i,
  /adMetrics/i,
  /adPalSession/i,
  /\/ad-breaks/i,
  /\/ad_breaks/i,
  /\/ad-pods/i,
  /adOpportunity/i,
  /\/adrule/i,
  /vast(\.xml|\?)/i,
  /vmap(\.xml|\?)/i,
  /vpaid/i,
  /\/telemetry\/ad/i,
  /\/analytics\/ad/i,
  /\/tracking\/ad/i,
  /\/beacon\/ad/i,
  /\/osn\/ads\/v1\//i,
  /\/save-advertising-id/i,
];

function isAdUrl(url) {
  if (!url || typeof url !== 'string') return false;
  // Core content APIs that we pass through but sanitize
  if (
    url.includes('/osn/media/v1/stream') ||
    url.includes('/osn/subs/v1/get-purchases-entitlements') ||
    url.includes('/osn/media/v1/get-playback-config') ||
    url.includes('/osn/media/v1/get-watch-content')
  ) {
    return false;
  }
  for (let i = 0; i < AD_PATTERNS.length; i++) {
    if (AD_PATTERNS[i].test(url)) return true;
  }
  return false;
}

/**
 * Detect Broadpeak Dynamic Ad Insertion (SSAI) manifest requests
 */
function isBroadpeakSsaiUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return (
    url.includes('bk-ml=1') ||
    url.includes('nanocdnhost=') ||
    url.includes('bk-precache=') ||
    url.includes('bpk-token=') ||
    url.includes('requestBkYou')
  );
}

/**
 * Deep object sanitizer to remove SSAI markers, cue points, and ad flags
 */
export function sanitizeAdData(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = sanitizeAdData(obj[i]);
    }
    return obj;
  }

  // Core stream flags: tell player and Broadpeak that no ads are present
  if ('hasAds' in obj) obj.hasAds = false;
  if ('isAdSupported' in obj) obj.isAdSupported = false;
  if ('adEnabled' in obj) obj.adEnabled = false;
  if ('showAdsOnVideoStreaming' in obj) obj.showAdsOnVideoStreaming = false;

  // Clear ad breaks & cue points
  if ('adBreaks' in obj && Array.isArray(obj.adBreaks)) obj.adBreaks = [];
  if ('adBreakDataList' in obj && Array.isArray(obj.adBreakDataList)) obj.adBreakDataList = [];
  if ('adPods' in obj && Array.isArray(obj.adPods)) obj.adPods = [];
  if ('adOpportunities' in obj && Array.isArray(obj.adOpportunities)) obj.adOpportunities = [];
  if ('adPlacements' in obj && Array.isArray(obj.adPlacements)) obj.adPlacements = [];
  if ('adSlots' in obj && Array.isArray(obj.adSlots)) obj.adSlots = [];
  if ('midrolls' in obj && Array.isArray(obj.midrolls)) obj.midrolls = [];
  if ('prerolls' in obj && Array.isArray(obj.prerolls)) obj.prerolls = [];
  if ('postrolls' in obj && Array.isArray(obj.postrolls)) obj.postrolls = [];
  if ('preroll' in obj && obj.preroll) obj.preroll = null;

  if (obj.cuePoints && Array.isArray(obj.cuePoints)) {
    obj.cuePoints = obj.cuePoints.filter((cp) => !cp || !cp.type || !cp.type.toLowerCase().includes('ad'));
  }

  // Catalog promo trays
  if (Array.isArray(obj.items)) {
    obj.items = obj.items.filter((item) => {
      if (!item) return true;
      if (item.type === 'ad' || item.isAd || item.adSlot) return false;
      const title = (item.title || item.name || '').toLowerCase();
      if (title.includes('upgrade to ad-free') || title.includes('ترقية باقة')) return false;
      return true;
    });
  }

  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      obj[k] = sanitizeAdData(obj[k]);
    }
  }

  return obj;
}

/**
 * 1. Network Interception: window.fetch
 * Uses safe in-place Response.prototype.text / json wrapping
 * (Guarantees 100% compatibility across all Samsung Tizen web engine versions)
 */
function initFetchInterceptor() {
  const originalFetch = window.fetch;
  if (!originalFetch) return;

  window.fetch = function (resource, init) {
    const url = typeof resource === 'string' ? resource : (resource && resource.url) || '';

    // Check if ad blocking is active
    if (!configRead('enableAdBlock')) {
      return originalFetch.apply(this, arguments);
    }

    // A. Block pure third-party ad networks, pause ads & telemetry
    if (isAdUrl(url)) {
      notifyAdBlocked(`Blocked ad request: ${url.slice(0, 80)}`);

      if (url.includes('.xml') || url.includes('vast') || url.includes('vmap')) {
        return Promise.resolve(new Response(
          '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"/>',
          { status: 200, headers: { 'Content-Type': 'application/xml' } }
        ));
      }

      return Promise.resolve(new Response(
        JSON.stringify({ adBreaks: [], ads: [], status: 'no_ads', podLength: 0 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // B. Block Broadpeak SSAI manifest requests (forces Apollo fallback to clean original manifest)
    if (isBroadpeakSsaiUrl(url)) {
      notifyAdBlocked(`Blocked Broadpeak SSAI manifest request: ${url.slice(0, 80)}`);
      return Promise.reject(new TypeError('Broadpeak SSAI blocked'));
    }

    // C. Intercept OSN+ Core Endpoints
    const isStreamApi = url.includes('/osn/media/v1/stream');
    const isEntitlementsApi = url.includes('/osn/subs/v1/get-purchases-entitlements');
    const isPlaybackConfigApi = url.includes('/osn/media/v1/get-playback-config');
    const isWatchContentApi = url.includes('/osn/media/v1/get-watch-content');

    if (isStreamApi || isEntitlementsApi || isPlaybackConfigApi || isWatchContentApi) {
      return originalFetch.apply(this, arguments).then((response) => {
        if (!response || !response.ok) return response;

        // Wrap response.text without constructing new Response (avoids Headers TypeError on Tizen)
        const origText = response.text.bind(response);
        response.text = function () {
          return origText().then((rawText) => {
            try {
              const data = JSON.parse(rawText);

              if (isStreamApi && data) {
                data.hasAds = false;
                if (data.adBreaks) data.adBreaks = [];
                if (data.cuePoints) data.cuePoints = [];
                if (data.primaryCdnStream && data.primaryCdnStream.manifestUrl) {
                  window.__TIZEOSN_CLEAN_MANIFEST__ = data.primaryCdnStream.manifestUrl;
                }
                notifyAdBlocked('Cleaned stream response: hasAds=false, clean manifest stored');
              } else if (isEntitlementsApi && data && data.entitlements) {
                if (data.entitlements.videoStreamingEntitlement) {
                  data.entitlements.videoStreamingEntitlement.showAdsOnVideoStreaming = false;
                  data.entitlements.videoStreamingEntitlement.supportsVideoStreaming = true;
                }
                if (data.entitlements.videoStreamingQualityEntitlement) {
                  data.entitlements.videoStreamingQualityEntitlement.supports4kQuality = true;
                }
                notifyAdBlocked('Enforced Ad-Free entitlement & 4K quality');
              } else if (isPlaybackConfigApi && data) {
                if (data.preroll) {
                  data.preroll = null;
                }
                notifyAdBlocked('Removed preroll trailer from playback config');
              } else if (isWatchContentApi && data) {
                sanitizeAdData(data);
              }

              return JSON.stringify(data);
            } catch (e) {
              return rawText;
            }
          });
        };

        if (response.json) {
          response.json = function () {
            return response.text().then((text) => JSON.parse(text));
          };
        }

        return response;
      });
    }

    return originalFetch.apply(this, arguments);
  };
}

/**
 * 2. Network Interception: XMLHttpRequest
 */
function initXhrInterceptor() {
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this._tizeosn_url = typeof url === 'string' ? url : (url && url.toString()) || '';
    return originalOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    const url = this._tizeosn_url;

    if (configRead('enableAdBlock')) {
      // A. Block pure ad networks
      if (isAdUrl(url)) {
        notifyAdBlocked(`XHR blocked ad: ${url.slice(0, 60)}`);
        Object.defineProperty(this, 'readyState', { writable: true, value: 4 });
        Object.defineProperty(this, 'status', { writable: true, value: 200 });
        Object.defineProperty(this, 'responseText', {
          writable: true,
          value: JSON.stringify({ adBreaks: [], ads: [], status: 'no_ads' }),
        });
        setTimeout(() => {
          if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
          if (typeof this.onload === 'function') this.onload();
        }, 5);
        return;
      }

      // B. Block Broadpeak SSAI stitched manifest requests via XHR
      if (isBroadpeakSsaiUrl(url)) {
        notifyAdBlocked(`XHR blocked Broadpeak SSAI manifest: ${url.slice(0, 60)}`);
        setTimeout(() => {
          if (typeof this.onerror === 'function') {
            this.onerror(new ProgressEvent('error'));
          }
        }, 5);
        return;
      }
    }

    // C. Intercept OSN+ Core Endpoints via XHR
    if (url && (url.includes('/osn/media/v1/stream') || url.includes('/osn/subs/v1/get-purchases-entitlements'))) {
      const origOnload = this.onload;
      this.onload = function () {
        try {
          if (this.responseText) {
            const data = JSON.parse(this.responseText);
            if (url.includes('/osn/media/v1/stream')) {
              data.hasAds = false;
              if (data.primaryCdnStream && data.primaryCdnStream.manifestUrl) {
                window.__TIZEOSN_CLEAN_MANIFEST__ = data.primaryCdnStream.manifestUrl;
              }
            } else if (url.includes('/osn/subs/v1/get-purchases-entitlements')) {
              if (data && data.entitlements && data.entitlements.videoStreamingEntitlement) {
                data.entitlements.videoStreamingEntitlement.showAdsOnVideoStreaming = false;
              }
            }
            Object.defineProperty(this, 'responseText', {
              writable: true,
              value: JSON.stringify(data),
            });
          }
        } catch (e) {}
        if (typeof origOnload === 'function') origOnload.apply(this, arguments);
      };
    }

    return originalSend.apply(this, arguments);
  };
}

/**
 * 3. Safe JSON.parse Interceptor (re-entrancy protected)
 */
let inJsonSanitizer = false;

function initJsonInterceptor() {
  const origParse = JSON.parse;
  JSON.parse = function () {
    const res = origParse.apply(this, arguments);
    if (inJsonSanitizer) return res;
    inJsonSanitizer = true;
    try {
      if (res && typeof res === 'object') {
        sanitizeAdData(res);
        if (res.primaryCdnStream && res.primaryCdnStream.manifestUrl) {
          window.__TIZEOSN_CLEAN_MANIFEST__ = res.primaryCdnStream.manifestUrl;
        }
      }
      return res;
    } catch (e) {
      return res;
    } finally {
      inJsonSanitizer = false;
    }
  };
}

/**
 * 4. Google IMA SDK Mock & Neutralizer
 */
function initImaMock() {
  window.google = window.google || {};
  if (window.google.ima) return;

  function MockAdsLoader() {
    this.settings = {};
  }
  MockAdsLoader.prototype.contentComplete = function () {};
  MockAdsLoader.prototype.getSettings = function () { return this.settings; };
  MockAdsLoader.prototype.requestAds = function () {
    const self = this;
    setTimeout(() => {
      if (typeof self._onLoaded === 'function') {
        self._onLoaded({
          getAdsManager() { return new MockAdsManager(); },
        });
      }
    }, 20);
  };
  MockAdsLoader.prototype.addEventListener = function (type, handler) {
    if (type === 'adsManagerLoaded') this._onLoaded = handler;
  };

  function MockAdsManager() {}
  MockAdsManager.prototype.init = function () {};
  MockAdsManager.prototype.start = function () {
    const self = this;
    setTimeout(() => {
      if (typeof self._onEvent === 'function') {
        self._onEvent({ type: 'allAdsCompleted' });
        self._onEvent({ type: 'contentResumeRequested' });
      }
    }, 10);
  };
  MockAdsManager.prototype.stop = function () {};
  MockAdsManager.prototype.pause = function () {};
  MockAdsManager.prototype.resume = function () {};
  MockAdsManager.prototype.destroy = function () {};
  MockAdsManager.prototype.setVolume = function () {};
  MockAdsManager.prototype.getVolume = function () { return 1; };
  MockAdsManager.prototype.resize = function () {};
  MockAdsManager.prototype.addEventListener = function (type, handler) {
    this._onEvent = handler;
  };

  function MockAdDisplayContainer() {}
  MockAdDisplayContainer.prototype.initialize = function () {};
  MockAdDisplayContainer.prototype.destroy = function () {};

  window.google.ima = {
    AdDisplayContainer: MockAdDisplayContainer,
    AdsLoader: MockAdsLoader,
    AdsManager: MockAdsManager,
    AdsRenderingSettings() {},
    ImaSdkSettings() {},
    ViewMode: { NORMAL: 'normal', FULLSCREEN: 'fullscreen' },
    AdError: { Type: {} },
    AdEvent: {
      Type: {
        ALL_ADS_COMPLETED: 'allAdsCompleted',
        CONTENT_RESUME_REQUESTED: 'contentResumeRequested',
        CONTENT_PAUSE_REQUESTED: 'contentPauseRequested',
        LOADED: 'loaded',
        STARTED: 'started',
        COMPLETE: 'complete',
      },
    },
  };
}

/**
 * 5. Broadpeak / Apollo Ad DOM Event Suppressor
 * Prevents Apollo UI from switching to the PlayerAdsOverlay
 */
function initAdEventsSuppressor() {
  const adEvents = [
    'onadbreakbegin',
    'onadbegin',
    'onadskippable',
    'onaddata',
    'onadend',
    'onadbreakend',
  ];

  adEvents.forEach((evtName) => {
    document.addEventListener(
      evtName,
      (e) => {
        if (!configRead('enableAdBlock')) return;
        e.stopImmediatePropagation();
        console.debug('[TizeOSN] Suppressed SSAI DOM event:', evtName);
      },
      true
    );
  });
}

/**
 * 6. Shaka Player Interceptor & Clean Manifest Enforcer
 * Intercepts player.load() and forces it to load the clean manifest URL
 */
function initShakaInterceptor() {
  function hookShaka() {
    if (typeof window !== 'undefined' && window.shaka && window.shaka.Player && !window.shaka._tizeosn_hooked) {
      window.shaka._tizeosn_hooked = true;

      const origLoad = window.shaka.Player.prototype.load;
      window.shaka.Player.prototype.load = function (asset, startTime, mimeType) {
        let targetManifest = asset;

        // If a clean manifest was captured from /osn/media/v1/stream, enforce it!
        if (window.__TIZEOSN_CLEAN_MANIFEST__) {
          if (typeof asset === 'string') {
            console.log('[TizeOSN] Shaka load: Enforcing clean original manifest URL ->', window.__TIZEOSN_CLEAN_MANIFEST__);
            targetManifest = window.__TIZEOSN_CLEAN_MANIFEST__;
          } else if (asset && typeof asset === 'object' && asset.manifestUrl) {
            asset.manifestUrl = window.__TIZEOSN_CLEAN_MANIFEST__;
          }
        } else if (typeof asset === 'string' && isBroadpeakSsaiUrl(asset)) {
          // If broadpeak query parameters are attached, strip them to restore pure stream
          try {
            const urlObj = new URL(asset);
            urlObj.searchParams.delete('bk-ml');
            urlObj.searchParams.delete('nanocdnhost');
            urlObj.searchParams.delete('bpk-token');
            urlObj.searchParams.delete('bk-precache');
            urlObj.searchParams.delete('response');
            targetManifest = urlObj.toString();
            console.log('[TizeOSN] Stripped Broadpeak SSAI params from manifest URL ->', targetManifest);
          } catch (e) {}
        }

        return origLoad.call(this, targetManifest, startTime, mimeType);
      };

      // Filter networking requests
      try {
        const netProto = window.shaka.net && window.shaka.net.NetworkingEngine && window.shaka.net.NetworkingEngine.prototype;
        if (netProto && netProto.request && !netProto._tizeosn_hooked) {
          netProto._tizeosn_hooked = true;
          const origRequest = netProto.request;
          netProto.request = function (type, request) {
            if (configRead('enableAdBlock') && request && request.uris) {
              for (let i = 0; i < request.uris.length; i++) {
                if (isAdUrl(request.uris[i]) || isBroadpeakSsaiUrl(request.uris[i])) {
                  notifyAdBlocked('Shaka blocked ad network request');
                  return Promise.resolve({ data: new ArrayBuffer(0), headers: {} });
                }
              }
            }
            return origRequest.apply(this, arguments);
          };
        }
      } catch (e) {}
    }
  }

  hookShaka();
  setInterval(hookShaka, 800);
}

/**
 * 7. Video Element Ad Watcher (Safe: never modifies currentTime of main content)
 */
function attachVideoAdSkipper(video) {
  if (video._tizeosn_attached) return;
  video._tizeosn_attached = true;

  video.addEventListener('timeupdate', () => {
    if (!configRead('enableAdBlock')) return;

    // Standalone ad elements (like prerolls with dedicated container or data-is-ad)
    const isExplicitAdContainer = video.closest(
      '[class*="AdContainer"], [class*="adContainer"], [id*="adContainer"], [class*="PrerollVideo"]'
    );
    const isMarkedAd = video.getAttribute('data-is-ad') === 'true';

    if (isExplicitAdContainer || isMarkedAd) {
      notifyAdBlocked();
      video.muted = true;
      video.playbackRate = 16.0;
    }
  });

  // Watch for skip buttons in DOM
  const skipBtn = document.querySelector(
    '.videoAdUiSkipButton, [class*="skip-ad"], [class*="skipAd"], [aria-label*="Skip Ad"], [aria-label*="تخطي الاعلان"], [aria-label*="تخطي"]'
  );
  if (skipBtn && configRead('enableAdBlock')) {
    try {
      skipBtn.click();
      notifyAdBlocked('Clicked on-screen skip button');
    } catch (e) {}
  }
}

function initVideoElementWatcher() {
  document.querySelectorAll('video').forEach(attachVideoAdSkipper);

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeName === 'VIDEO') {
          attachVideoAdSkipper(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('video').forEach(attachVideoAdSkipper);
        }
      }
    }
  });

  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Main Initialization
 */
export function initAdBlock() {
  try {
    initFetchInterceptor();
    initXhrInterceptor();
    initJsonInterceptor();
    initImaMock();
    initAdEventsSuppressor();
    initShakaInterceptor();
    initVideoElementWatcher();
    console.log('[TizeOSN] AdBlock Engine v1.0.4 initialized successfully.');
  } catch (err) {
    console.error('[TizeOSN] AdBlock initialization error:', err);
  }
}
