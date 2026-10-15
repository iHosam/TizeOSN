/**
 * TizeOSN AdBlock Engine
 * Multi-layer ad interceptor: Network (fetch/XHR), JSON parser, Video element, and IMA SDK neutralizer.
 */

import { configRead, incrementBlockedAds } from '../config.js';
import { showToast } from '../ui/osd.js';
import { t } from '../translations/index.js';

let lastToastTime = 0;

function notifyAdBlocked() {
  incrementBlockedAds();
  const now = Date.now();
  if (now - lastToastTime > 3500) {
    lastToastTime = now;
    showToast(t('toastAdBlocked'));
  }
}

// Known ad domains & path keywords
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
  /\/api\/.*ads/i,
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
  for (let i = 0; i < AD_PATTERNS.length; i++) {
    if (AD_PATTERNS[i].test(url)) return true;
  }
  return false;
}

/**
 * 1. Network Interception: window.fetch
 */
function initFetchInterceptor() {
  const originalFetch = window.fetch;
  if (!originalFetch) return;

  window.fetch = function (resource, init) {
    const url = typeof resource === 'string' ? resource : (resource && resource.url) || '';

    if (configRead('enableAdBlock') && isAdUrl(url)) {
      notifyAdBlocked();

      // Return synthetic clean responses
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
    this._tizeosn_url = url;
    return originalOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    if (configRead('enableAdBlock') && isAdUrl(this._tizeosn_url)) {
      notifyAdBlocked();

      Object.defineProperty(this, 'readyState', { writable: true, value: 4 });
      Object.defineProperty(this, 'status', { writable: true, value: 200 });

      if (this._tizeosn_url && (this._tizeosn_url.includes('.xml') || this._tizeosn_url.includes('vast'))) {
        Object.defineProperty(this, 'responseText', {
          writable: true,
          value: '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"/>'
        });
        Object.defineProperty(this, 'responseXML', {
          writable: true,
          value: new DOMParser().parseFromString('<VAST version="3.0"/>', 'application/xml')
        });
      } else {
        Object.defineProperty(this, 'responseText', {
          writable: true,
          value: JSON.stringify({ adBreaks: [], ads: [], status: 'no_ads' })
        });
      }

      setTimeout(() => {
        if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
        if (typeof this.onload === 'function') this.onload();
      }, 10);
      return;
    }

    return originalSend.apply(this, arguments);
  };
}

/**
 * 3. JSON.parse Interceptor: Strip Ad Placements & Cue Points
 */
function sanitizeAdData(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = sanitizeAdData(obj[i]);
    }
    return obj;
  }

  // Strip ad properties
  if (obj.adBreaks) obj.adBreaks = [];
  if (obj.adPods) obj.adPods = [];
  if (obj.adOpportunities) obj.adOpportunities = [];
  if (obj.adPlacements) obj.adPlacements = [];
  if (obj.adSlots) obj.adSlots = [];
  if (obj.midrolls) obj.midrolls = [];
  if (obj.prerolls) obj.prerolls = [];
  if (obj.postrolls) obj.postrolls = [];
  if (obj.cuePoints) {
    // Keep non-ad cue points if any, remove ad cue points
    obj.cuePoints = Array.isArray(obj.cuePoints)
      ? obj.cuePoints.filter(cp => !cp.type || !cp.type.includes('ad'))
      : [];
  }

  // Stream configuration flags
  if ('hasAds' in obj) obj.hasAds = false;
  if ('isAdSupported' in obj) obj.isAdSupported = false;
  if ('adEnabled' in obj) obj.adEnabled = false;

  // Filter catalog promotional / upsell trays
  if (Array.isArray(obj.items)) {
    obj.items = obj.items.filter(item => {
      if (!item) return true;
      if (item.type === 'ad' || item.isAd || item.adSlot) return false;
      const title = (item.title || item.name || '').toLowerCase();
      if (title.includes('upgrade to ad-free') || title.includes('ترقية باقة')) return false;
      return true;
    });
  }

  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k) && typeof obj[k] === 'object') {
      obj[k] = sanitizeAdData(obj[k]);
    }
  }

  return obj;
}

function initJsonInterceptor() {
  const origParse = JSON.parse;
  JSON.parse = function () {
    const res = origParse.apply(this, arguments);
    if (!configRead('enableAdBlock')) return res;
    try {
      return sanitizeAdData(res);
    } catch (e) {
      return res;
    }
  };
}

/**
 * 4. Google IMA SDK Mock & Neutralizer
 */
function initImaMock() {
  window.google = window.google || {};
  if (window.google.ima) return;

  const noop = () => {};

  class MockAdsLoader {
    constructor() {
      this.settings = {};
    }
    contentComplete() {}
    getSettings() { return this.settings; }
    requestAds() {
      setTimeout(() => {
        if (typeof this._onLoaded === 'function') {
          this._onLoaded({
            getAdsManager: () => new MockAdsManager()
          });
        }
      }, 20);
    }
    addEventListener(type, handler) {
      if (type === 'adsManagerLoaded') this._onLoaded = handler;
    }
  }

  class MockAdsManager {
    init() {}
    start() {
      setTimeout(() => {
        if (typeof this._onEvent === 'function') {
          // Tell host player ads are done and to resume video
          this._onEvent({ type: 'allAdsCompleted' });
          this._onEvent({ type: 'contentResumeRequested' });
        }
      }, 10);
    }
    stop() {}
    pause() {}
    resume() {}
    destroy() {}
    setVolume() {}
    getVolume() { return 1; }
    resize() {}
    addEventListener(type, handler) {
      this._onEvent = handler;
    }
  }

  class MockAdDisplayContainer {
    initialize() {}
    destroy() {}
  }

  window.google.ima = {
    AdDisplayContainer: MockAdDisplayContainer,
    AdsLoader: MockAdsLoader,
    AdsManager: MockAdsManager,
    AdsRenderingSettings: function () {},
    ImaSdkSettings: function () {},
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
      }
    }
  };
}

/**
 * 5. Video Element Ad Fast-Forward & Skipper
 */
function attachVideoAdSkipper(video) {
  if (video._tizeosn_attached) return;
  video._tizeosn_attached = true;

  video.addEventListener('timeupdate', () => {
    if (!configRead('enableAdBlock')) return;

    // Detect if this video is currently an ad
    const isShortAd = video.duration && video.duration > 0 && video.duration < 65;
    const parentHasAdClass = video.closest(
      '[class*="ad-"], [class*="AdContainer"], [class*="adContainer"], [id*="ad-"]'
    );
    const srcHasAd = video.src && isAdUrl(video.src);

    if (parentHasAdClass || srcHasAd || (isShortAd && video.getAttribute('data-is-ad') === 'true')) {
      notifyAdBlocked();
      video.muted = true;
      video.playbackRate = 16.0;
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = video.duration - 0.1;
      }
    }
  });

  // Watch for any skip button overlays on screen
  const skipBtn = document.querySelector(
    '.videoAdUiSkipButton, [class*="skip-ad"], [class*="skipAd"], [aria-label*="Skip Ad"], [aria-label*="تخطي"]'
  );
  if (skipBtn && configRead('enableAdBlock')) {
    try {
      skipBtn.click();
      notifyAdBlocked();
    } catch (e) {}
  }
}

function initVideoElementWatcher() {
  // Check existing video elements
  document.querySelectorAll('video').forEach(attachVideoAdSkipper);

  // Watch for newly added video elements
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
    subtree: true
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
    initVideoElementWatcher();
    console.log('[TizeOSN] AdBlock Engine initialized successfully.');
  } catch (err) {
    console.error('[TizeOSN] AdBlock initialization error:', err);
  }
}
