/**
 * TizeOSN AdBlock Engine
 * Multi-layer ad interceptor: Network (fetch/XHR), JSON sanitizer, SSAI neutralizer,
 * Shaka Player hooks, and DOM ad event suppressor.
 */

import { configRead, incrementBlockedAds } from '../config.js';
import { showToast } from '../ui/osd.js';
import { t } from '../translations/index.js';

let lastToastTime = 0;

function notifyAdBlocked() {
  incrementBlockedAds();
  const now = Date.now();
  if (now - lastToastTime > 4000) {
    lastToastTime = now;
    showToast(t('toastAdBlocked'));
  }
}

// Known ad tracking, metrics, and third-party ad server domains
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
];

function isAdUrl(url) {
  if (!url || typeof url !== 'string') return false;
  // Never block core OSN API endpoints
  if (url.includes('/osn/media/v1/') || url.includes('/osn/subs/v1/') || url.includes('/osn/account/v1/')) {
    return false;
  }
  for (let i = 0; i < AD_PATTERNS.length; i++) {
    if (AD_PATTERNS[i].test(url)) return true;
  }
  return false;
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
 * Intercepts pure ad requests AND modifies OSN+ stream & entitlement responses
 */
function initFetchInterceptor() {
  const originalFetch = window.fetch;
  if (!originalFetch) return;

  window.fetch = function (resource, init) {
    const url = typeof resource === 'string' ? resource : (resource && resource.url) || '';

    // Check if ad blocking is active
    const adBlockEnabled = configRead('enableAdBlock');
    if (!adBlockEnabled) {
      return originalFetch.apply(this, arguments);
    }

    // A. Intercept and block pure ad server / telemetry requests
    if (isAdUrl(url)) {
      notifyAdBlocked();

      if (url.includes('.xml') || url.includes('vast') || url.includes('vmap')) {
        return Promise.resolve(new Response(
          '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"/>',
          { status: 200, headers: { 'Content-Type': 'application/xml' } }
        ));
      }

      if (url.includes('json') || (init && init.headers && JSON.stringify(init.headers).includes('json'))) {
        return Promise.resolve(new Response(
          JSON.stringify({ adBreaks: [], ads: [], status: 'no_ads', podLength: 0 }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        ));
      }

      return Promise.resolve(new Response('', { status: 204, statusText: 'No Content' }));
    }

    // B. Intercept OSN+ Stream API: neutralize SSAI before player initializes
    if (url.includes('/osn/media/v1/stream')) {
      return originalFetch.apply(this, arguments).then((response) => {
        if (!response.ok) return response;
        return response.text().then((rawText) => {
          try {
            const data = JSON.parse(rawText);
            if (data) {
              data.hasAds = false;
              if (data.adBreaks) data.adBreaks = [];
              if (data.cuePoints) data.cuePoints = [];
              notifyAdBlocked();
              console.log('[TizeOSN] Neutralized hasAds in /osn/media/v1/stream -> Direct pristine DASH stream loaded.');
            }
            return new Response(JSON.stringify(data), {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          } catch (e) {
            return new Response(rawText, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          }
        });
      });
    }

    // C. Intercept OSN+ Entitlements: enable Ad-Free & 4K profiles
    if (url.includes('/osn/subs/v1/get-purchases-entitlements')) {
      return originalFetch.apply(this, arguments).then((response) => {
        if (!response.ok) return response;
        return response.text().then((rawText) => {
          try {
            const data = JSON.parse(rawText);
            if (data && data.entitlements) {
              if (data.entitlements.videoStreamingEntitlement) {
                data.entitlements.videoStreamingEntitlement.showAdsOnVideoStreaming = false;
                data.entitlements.videoStreamingEntitlement.supportsVideoStreaming = true;
              }
              if (data.entitlements.videoStreamingQualityEntitlement) {
                data.entitlements.videoStreamingQualityEntitlement.supports4kQuality = true;
              }
              console.log('[TizeOSN] Enforced ad-free tier & 4K entitlements in response.');
            }
            return new Response(JSON.stringify(data), {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          } catch (e) {
            return new Response(rawText, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          }
        });
      });
    }

    // D. Intercept OSN+ Playback Config: remove preroll video ads
    if (url.includes('/osn/media/v1/get-playback-config')) {
      return originalFetch.apply(this, arguments).then((response) => {
        if (!response.ok) return response;
        return response.text().then((rawText) => {
          try {
            const data = JSON.parse(rawText);
            if (data && data.preroll) {
              delete data.preroll;
              data.preroll = null;
              notifyAdBlocked();
              console.log('[TizeOSN] Suppressed preroll video in /get-playback-config.');
            }
            return new Response(JSON.stringify(data), {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          } catch (e) {
            return new Response(rawText, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          }
        });
      });
    }

    // E. Intercept OSN+ Watch Content: sanitize any catalog ad indicators
    if (url.includes('/osn/media/v1/get-watch-content')) {
      return originalFetch.apply(this, arguments).then((response) => {
        if (!response.ok) return response;
        return response.text().then((rawText) => {
          try {
            const data = JSON.parse(rawText);
            sanitizeAdData(data);
            return new Response(JSON.stringify(data), {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          } catch (e) {
            return new Response(rawText, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          }
        });
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

    if (configRead('enableAdBlock') && isAdUrl(url)) {
      notifyAdBlocked();

      Object.defineProperty(this, 'readyState', { writable: true, value: 4 });
      Object.defineProperty(this, 'status', { writable: true, value: 200 });

      if (url && (url.includes('.xml') || url.includes('vast'))) {
        Object.defineProperty(this, 'responseText', {
          writable: true,
          value: '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"/>',
        });
        Object.defineProperty(this, 'responseXML', {
          writable: true,
          value: new DOMParser().parseFromString('<VAST version="3.0"/>', 'application/xml'),
        });
      } else {
        Object.defineProperty(this, 'responseText', {
          writable: true,
          value: JSON.stringify({ adBreaks: [], ads: [], status: 'no_ads' }),
        });
      }

      setTimeout(() => {
        if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
        if (typeof this.onload === 'function') this.onload();
      }, 10);
      return;
    }

    // Hook onload for core OSN endpoints via XHR if any
    if (url && (url.includes('/osn/media/v1/stream') || url.includes('/osn/subs/v1/get-purchases-entitlements'))) {
      const origOnload = this.onload;
      this.onload = function () {
        try {
          if (this.responseText) {
            const data = JSON.parse(this.responseText);
            sanitizeAdData(data);
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
 * 6. Shaka Player & Networking Engine Interceptor
 */
function initShakaInterceptor() {
  function hookShaka() {
    if (typeof window !== 'undefined' && window.shaka && window.shaka.Player && !window.shaka._tizeosn_hooked) {
      window.shaka._tizeosn_hooked = true;

      // Hook Shaka player load
      const origLoad = window.shaka.Player.prototype.load;
      window.shaka.Player.prototype.load = function (asset, startTime, mimeType) {
        console.log('[TizeOSN] Shaka Player loading asset:', typeof asset === 'string' ? asset : (asset && asset.manifestUrl) || asset);
        return origLoad.apply(this, arguments);
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
                if (isAdUrl(request.uris[i])) {
                  notifyAdBlocked();
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
  setInterval(hookShaka, 1000);
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
      notifyAdBlocked();
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
    console.log('[TizeOSN] AdBlock Engine v1.0.3 initialized successfully.');
  } catch (err) {
    console.error('[TizeOSN] AdBlock initialization error:', err);
  }
}
