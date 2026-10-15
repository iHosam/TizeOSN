/* TizeOSN - Ad-Free OSN+ Client for Samsung Smart TVs (Tizen OS) | GPL-3.0 */
(function () {
  'use strict';

  /**
   * TizeOSN Injected Stylesheet
   * Contains adblock CSS suppression and TV UI styling.
   */

  const CSS_STYLES = `
/* --- TizeOSN Ad Suppression Rules --- */
.osn-ad-container,
[class*="AdContainer"],
[class*="adContainer"],
[class*="ad-container"],
[class*="adBanner"],
[class*="AdBanner"],
[class*="ad-banner"],
[class*="sponsored"],
[class*="Sponsored"],
[class*="promoBanner"],
[class*="PromoBanner"],
[class*="upgrade-tier-banner"],
[class*="subscription-upsell"],
[id*="ad-container"],
[id*="ad_container"],
[id*="adSlot"],
[id*="ad-slot"],
.video-ad-overlay,
.advertisement-badge,
.ad-countdown-timer,
[data-testid*="ad-break"],
[data-testid*="ad-slot"],
[data-ad-type] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  height: 0 !important;
  width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* --- TizeOSN OSD Toasts --- */
#tizeosn-osd-container {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 2147483647;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Cairo", "Noto Sans Arabic", sans-serif;
}

#tizeosn-osd-container.tizeosn-rtl {
  right: auto;
  left: 32px;
}

.tizeosn-toast {
  background: rgba(15, 23, 42, 0.92);
  border: 1.5px solid rgba(56, 189, 248, 0.5);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px rgba(56, 189, 248, 0.25);
  border-radius: 14px;
  padding: 14px 22px;
  margin-bottom: 12px;
  backdrop-filter: blur(12px);
  color: #f8fafc;
  font-size: 19px;
  font-weight: 600;
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.tizeosn-toast-visible {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.tizeosn-toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tizeosn-toast-icon {
  font-size: 22px;
}

/* --- TizeOSN Settings Modal Dialog --- */
#tizeosn-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(8, 12, 22, 0.88);
  backdrop-filter: blur(20px);
  z-index: 2147483646;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Cairo", "Noto Sans Arabic", sans-serif;
  color: #f8fafc;
  opacity: 0;
  transition: opacity 0.25s ease;
  direction: ltr;
}

#tizeosn-modal-overlay.tizeosn-rtl {
  direction: rtl;
}

#tizeosn-modal-overlay.tizeosn-modal-visible {
  opacity: 1;
}

.tizeosn-modal-card {
  width: 82vw;
  max-width: 1100px;
  height: 80vh;
  background: #0f172a;
  border: 2px solid rgba(56, 189, 248, 0.4);
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tizeosn-modal-header {
  padding: 28px 36px;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tizeosn-modal-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #38bdf8;
}

.tizeosn-badge {
  background: #0284c7;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tizeosn-modal-subtitle {
  font-size: 16px;
  color: #94a3b8;
  margin-top: 4px;
}

.tizeosn-stats-pill {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.35);
  padding: 10px 18px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #e0f2fe;
}

.tizeosn-stats-count {
  color: #38bdf8;
  font-size: 20px;
  font-weight: 800;
}

.tizeosn-modal-body {
  flex: 1;
  padding: 24px 36px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tizeosn-section-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #64748b;
  margin-top: 10px;
  margin-bottom: 4px;
}

.tizeosn-item {
  background: rgba(30, 41, 59, 0.5);
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tizeosn-item.tizeosn-focused {
  background: rgba(56, 189, 248, 0.15);
  border-color: #38bdf8;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
  transform: scale(1.015);
}

.tizeosn-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tizeosn-item-title {
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
}

.tizeosn-item-desc {
  font-size: 14px;
  color: #94a3b8;
}

.tizeosn-item-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tizeosn-toggle {
  width: 58px;
  height: 32px;
  background: #334155;
  border-radius: 9999px;
  position: relative;
  transition: background 0.2s ease;
}

.tizeosn-toggle-active {
  background: #0284c7;
}

.tizeosn-toggle-knob {
  width: 26px;
  height: 26px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s ease;
}

.tizeosn-toggle-active .tizeosn-toggle-knob {
  transform: translateX(26px);
}

.tizeosn-select-value {
  font-size: 18px;
  font-weight: 700;
  color: #38bdf8;
  padding: 6px 14px;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tizeosn-modal-footer {
  padding: 18px 36px;
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tizeosn-hints {
  display: flex;
  gap: 20px;
  font-size: 15px;
  color: #94a3b8;
  font-weight: 500;
}

.tizeosn-hint-pill {
  display: flex;
  align-items: center;
  gap: 6px;
}
`;

  function injectStyles() {
    if (document.getElementById('tizeosn-injected-styles')) return;
    const style = document.createElement('style');
    style.id = 'tizeosn-injected-styles';
    style.textContent = CSS_STYLES;
    (document.head || document.documentElement).appendChild(style);
  }

  /**
   * TizeOSN User-Agent & Device Capability Spoofing
   * Ensures seamless compatibility with Samsung Tizen Smart TV web engines.
   */

  function initUserAgentSpoofing() {
    try {
      // If running in older web engine, polyfill Promise.finally and Object.fromEntries if missing
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          const constructor = this.constructor;
          return this.then(
            (value) => constructor.resolve(callback()).then(() => value),
            (reason) => constructor.resolve(callback()).then(() => { throw reason; })
          );
        };
      }

      if (!Object.fromEntries) {
        Object.fromEntries = function (entries) {
          if (!entries || !entries[Symbol.iterator]) {
            throw new Error('Object.fromEntries() requires a single iterable argument');
          }
          const obj = {};
          for (const [k, v] of entries) {
            obj[k] = v;
          }
          return obj;
        };
      }

      // Suppress console spam or anti-adblock debugger loops
      const origDebug = console.debug;
      console.debug = function () {
        if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('[TizeOSN]')) {
          return origDebug.apply(this, arguments);
        }
      };

      console.log('[TizeOSN] Environment compatibility layers applied.');
    } catch (e) {
      console.warn('[TizeOSN] User-agent spoofing note:', e);
    }
  }

  /**
   * TizeOSN Configuration Manager
   * Handles persistent settings stored in localStorage with event dispatching.
   */

  const STORAGE_KEY = 'tizeosn_settings';

  const DEFAULT_CONFIG = {
    enableAdBlock: true,
    enableAutoSkipIntro: true,
    enableAutoSkipRecap: true,
    enableAutoNextEpisode: true,
    autoSkipDelayMs: 600,
    preferredPlaybackSpeed: 1.0,
    preferredVideoQuality: 'auto',
    enableSpatialNav: true,
    showOsdToasts: true,
    language: 'auto', // 'auto', 'ar', or 'en'
    blockedAdsCount: 0,
    enableDebugLogging: false,
  };

  let cachedConfig = null;
  const listeners = new Set();

  function getConfig() {
    if (cachedConfig) return cachedConfig;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        cachedConfig = Object.assign({}, DEFAULT_CONFIG, JSON.parse(raw));
        return cachedConfig;
      }
    } catch (e) {
      console.warn('[TizeOSN] Failed to read config from localStorage:', e);
    }
    cachedConfig = Object.assign({}, DEFAULT_CONFIG);
    return cachedConfig;
  }

  function configRead(key) {
    const cfg = getConfig();
    return cfg[key] !== undefined ? cfg[key] : DEFAULT_CONFIG[key];
  }

  function configWrite(key, value) {
    const cfg = getConfig();
    cfg[key] = value;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.warn('[TizeOSN] Failed to save config to localStorage:', e);
    }
    notifyListeners(key, value);
  }

  function incrementBlockedAds() {
    const current = configRead('blockedAdsCount') || 0;
    configWrite('blockedAdsCount', current + 1);
    return current + 1;
  }

  function subscribeConfig(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function notifyListeners(key, value) {
    listeners.forEach((fn) => {
      try {
        fn(key, value, cachedConfig);
      } catch (e) {
        console.error('[TizeOSN] Error in config listener:', e);
      }
    });
  }

  var en = {
    appName: 'TizeOSN',
    appTagline: 'Ad-Free OSN+ Experience for Samsung Tizen TV',
    settingsTitle: 'TizeOSN Settings',
    settingsSubtitle: 'Configure your ad-free and playback experience',
    
    // Sections
    adBlockSection: 'Ad-Blocker & Privacy',
    playbackSection: 'Playback & Automation',
    systemSection: 'System & Preferences',
    aboutSection: 'About TizeOSN',

    // Options
    enableAdBlock: 'Block Video Ads & Commercials',
    enableAdBlockDesc: 'Intercepts pre-roll and mid-roll video advertisements seamlessly',
    
    enableAutoSkipIntro: 'Auto-Skip Intro',
    enableAutoSkipIntroDesc: 'Automatically clicks "Skip Intro" as soon as it appears',

    enableAutoSkipRecap: 'Auto-Skip Recap',
    enableAutoSkipRecapDesc: 'Automatically bypasses "Previously On" recap segments',

    enableAutoNextEpisode: 'Auto-Play Next Episode',
    enableAutoNextEpisodeDesc: 'Automatically advances to the next episode during end credits',

    preferredPlaybackSpeed: 'Default Playback Speed',
    preferredPlaybackSpeedDesc: 'Choose your preferred video playback rate',

    showOsdToasts: 'On-Screen Notifications',
    showOsdToastsDesc: 'Display quick toast notifications when ads or intros are skipped',

    language: 'Interface Language',
    languageDesc: 'Choose English, Arabic, or automatic detection',

    // Stats
    adsBlocked: 'Total Ads Neutralized',
    adsBlockedLabel: 'ads blocked',
    resetStats: 'Reset Statistics',

    // Actions
    close: 'Close',
    reload: 'Reload OSN+',
    restoreDefaults: 'Reset to Defaults',

    // Toasts
    toastAdBlocked: '🛡️ TizeOSN: Video Ad Neutralized',
    toastIntroSkipped: '⏭️ TizeOSN: Skipped Intro',
    toastRecapSkipped: '⏩ TizeOSN: Skipped Recap',
    toastNextEpisode: '📺 TizeOSN: Playing Next Episode',
    toastSpeedSet: '⚡ Playback Speed: ',

    // Remote Hints
    hintRedKey: '🔴 Red: Settings',
    hintGreenKey: '🟢 Green: Ad Stats',
    hintYellowKey: '🟡 Yellow: Speed',
    hintBlueKey: '🔵 Blue: Skip',
    hintBackKey: 'Back to close',
  };

  var ar = {
    appName: 'تايز أو إس إن (TizeOSN)',
    appTagline: 'تجربة OSN+ بدون إعلانات لشاشات سامسونج الذكية تايزن',
    settingsTitle: 'إعدادات TizeOSN',
    settingsSubtitle: 'تخصيص المشاهدة بدون إعلانات وتحسين تجربة العرض',

    // Sections
    adBlockSection: 'حظر الإعلانات والخصوصية',
    playbackSection: 'التشغيل والأتمتة',
    systemSection: 'النظام والتفضيلات',
    aboutSection: 'حول TizeOSN',

    // Options
    enableAdBlock: 'حظر إعلانات الفيديو والفواصل',
    enableAdBlockDesc: 'اعتراض وتخطي إعلانات الفيديو التمهيدية وأثناء العرض بسلاسة',

    enableAutoSkipIntro: 'تخطي المقدمة تلقائياً',
    enableAutoSkipIntroDesc: 'الضغط تلقائياً على زر "تخطي المقدمة" فور ظهوره',

    enableAutoSkipRecap: 'تخطي الملخص تلقائياً',
    enableAutoSkipRecapDesc: 'تجاوز مقاطع ملخص الأحداث السابقة تلقائياً',

    enableAutoNextEpisode: 'تشغيل الحلقة التالية تلقائياً',
    enableAutoNextEpisodeDesc: 'الانتقال السلس للحلقة التالية أثناء شارة النهاية',

    preferredPlaybackSpeed: 'سرعة التشغيل الافتراضية',
    preferredPlaybackSpeedDesc: 'اختر سرعة تشغيل الفيديو المفضلة لديك',

    showOsdToasts: 'إشعارات الشاشة (Toasts)',
    showOsdToastsDesc: 'إظهار إشعار سريع عند حظر إعلان أو تخطي مقدمة',

    language: 'لغة الواجهة',
    languageDesc: 'اختر العربية أو الإنجليزية أو الكشف التلقائي',

    // Stats
    adsBlocked: 'إجمالي الإعلانات المحظورة',
    adsBlockedLabel: 'إعلان تم حظره',
    resetStats: 'إعادة ضبط الإحصائيات',

    // Actions
    close: 'إغلاق',
    reload: 'إعادة تحميل OSN+',
    restoreDefaults: 'استعادة الإعدادات الافتراضية',

    // Toasts
    toastAdBlocked: '🛡️ TizeOSN: تم حظر وتخطي إعلان الفيديو',
    toastIntroSkipped: '⏭️ TizeOSN: تم تخطي المقدمة تلقائياً',
    toastRecapSkipped: '⏩ TizeOSN: تم تخطي الملخص',
    toastNextEpisode: '📺 TizeOSN: جاري تشغيل الحلقة التالية',
    toastSpeedSet: '⚡ سرعة التشغيل: ',

    // Remote Hints
    hintRedKey: '🔴 أحمر: الإعدادات',
    hintGreenKey: '🟢 أخضر: إحصائيات الإعلانات',
    hintYellowKey: '🟡 أصفر: السرعة',
    hintBlueKey: '🔵 أزرق: تخطي',
    hintBackKey: 'رجوع للإغلاق',
  };

  const translations = { en, ar };

  function getCurrentLanguage() {
    const pref = configRead('language');
    if (pref === 'ar' || pref === 'en') return pref;

    // Auto-detect based on html lang, document direction, or navigator language
    const docLang = document.documentElement.lang || '';
    const docDir = document.documentElement.dir || '';
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    if (docLang.startsWith('ar') || docDir === 'rtl' || navLang.startsWith('ar')) {
      return 'ar';
    }
    return 'en';
  }

  function t(key, fallback = '') {
    const lang = getCurrentLanguage();
    const dict = translations[lang] || translations.en;
    if (dict[key] !== undefined) {
      return dict[key];
    }
    if (translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return fallback || key;
  }

  function isRTL() {
    return getCurrentLanguage() === 'ar';
  }

  /**
   * TizeOSN On-Screen Display (OSD) Toasts
   * Clean notifications designed for TV 10-foot viewing experience.
   */


  let container = null;
  let toastTimeout = null;

  function ensureContainer() {
    if (container && document.body.contains(container)) return container;
    container = document.createElement('div');
    container.id = 'tizeosn-osd-container';
    container.className = isRTL() ? 'tizeosn-rtl' : 'tizeosn-ltr';
    document.body.appendChild(container);
    return container;
  }

  function showToast(message, duration = 2800) {
    if (!configRead('showOsdToasts')) return;

    try {
      const parent = ensureContainer();
      
      // Clear any existing toast for rapid-fire alerts
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }

      const toast = document.createElement('div');
      toast.className = 'tizeosn-toast';
      toast.innerHTML = `
      <div class="tizeosn-toast-content">
        <span class="tizeosn-toast-icon">🛡️</span>
        <span class="tizeosn-toast-text">${message}</span>
      </div>
    `;

      parent.appendChild(toast);

      // Trigger animation in
      requestAnimationFrame(() => {
        toast.classList.add('tizeosn-toast-visible');
      });

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('tizeosn-toast-visible');
        setTimeout(() => {
          if (toast.parentNode === parent) {
            parent.removeChild(toast);
          }
        }, 400);
      }, duration);
    } catch (e) {
      console.debug('[TizeOSN OSD] Toast error:', e);
    }
  }

  /**
   * TizeOSN AdBlock Engine
   * Multi-layer ad interceptor: Network (fetch/XHR), JSON parser, Video element, and IMA SDK neutralizer.
   */


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
  function initAdBlock() {
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

  /**
   * TizeOSN Auto-Skip & Binge Module
   * Automatically clicks "Skip Intro", "Skip Recap", and "Next Episode" buttons.
   */


  let lastSkipIntroTime = 0;
  let lastSkipRecapTime = 0;
  let lastNextEpisodeTime = 0;

  // Patterns for Skip buttons in English and Arabic
  const INTRO_REGEX = /skip\s*intro|تخطي\s*المقدمة/i;
  const RECAP_REGEX = /skip\s*recap|تخطي\s*الملخص|previously\s*on/i;
  const NEXT_EPISODE_REGEX = /next\s*episode|الحلقة\s*التالية|watch\s*next/i;

  function checkAndClickButtons() {
    const now = Date.now();

    // Find all visible clickable buttons, divs, or spans
    const candidates = document.querySelectorAll(
      'button, [role="button"], [class*="skip"], [class*="Skip"], [class*="next-episode"], [class*="nextEpisode"]'
    );

    candidates.forEach((el) => {
      // Only check visible elements
      if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) return;

      const text = (el.innerText || el.textContent || el.getAttribute('aria-label') || '').trim();
      if (!text) return;

      // 1. Auto Skip Intro
      if (configRead('enableAutoSkipIntro') && INTRO_REGEX.test(text)) {
        if (now - lastSkipIntroTime > 5000) {
          lastSkipIntroTime = now;
          setTimeout(() => {
            try {
              el.click();
              showToast(t('toastIntroSkipped'));
            } catch (e) {}
          }, configRead('autoSkipDelayMs') || 500);
        }
      }

      // 2. Auto Skip Recap
      else if (configRead('enableAutoSkipRecap') && RECAP_REGEX.test(text)) {
        if (now - lastSkipRecapTime > 5000) {
          lastSkipRecapTime = now;
          setTimeout(() => {
            try {
              el.click();
              showToast(t('toastRecapSkipped'));
            } catch (e) {}
          }, configRead('autoSkipDelayMs') || 500);
        }
      }

      // 3. Auto Next Episode
      else if (configRead('enableAutoNextEpisode') && NEXT_EPISODE_REGEX.test(text)) {
        if (now - lastNextEpisodeTime > 8000) {
          lastNextEpisodeTime = now;
          setTimeout(() => {
            try {
              el.click();
              showToast(t('toastNextEpisode'));
            } catch (e) {}
          }, 1200);
        }
      }
    });
  }

  function initAutoSkip() {
    // Interval timer for playback inspection
    setInterval(checkAndClickButtons, 600);

    // MutationObserver for instant reaction when button DOM nodes mount
    const observer = new MutationObserver(() => {
      checkAndClickButtons();
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
    });

    console.log('[TizeOSN] Auto-Skip module initialized.');
  }

  /**
   * TizeOSN Settings Modal UI
   * TV-optimized modal dialog with full D-pad remote control navigation.
   */


  let modalElement = null;
  let isVisible = false;
  let focusedIndex = 0;
  let focusableItems = [];

  const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];
  const LANG_OPTIONS = ['auto', 'en', 'ar'];

  function isSettingsVisible() {
    return isVisible;
  }

  function toggleSettings() {
    if (isVisible) {
      hideSettings();
    } else {
      showSettings();
    }
  }

  function showSettings() {
    if (isVisible) return;
    isVisible = true;

    if (!modalElement) {
      createModal();
    } else {
      updateModalContent();
    }

    modalElement.classList.add('tizeosn-modal-visible');
    focusedIndex = 0;
    updateFocus();
  }

  function hideSettings() {
    if (!isVisible || !modalElement) return;
    isVisible = false;
    modalElement.classList.remove('tizeosn-modal-visible');
  }

  function createModal() {
    modalElement = document.createElement('div');
    modalElement.id = 'tizeosn-modal-overlay';
    modalElement.className = isRTL() ? 'tizeosn-rtl' : 'tizeosn-ltr';

    document.body.appendChild(modalElement);
    updateModalContent();
  }

  function updateModalContent() {
    if (!modalElement) return;

    const blockedCount = configRead('blockedAdsCount') || 0;
    const currentLang = configRead('language');
    const currentSpeed = configRead('preferredPlaybackSpeed') || 1.0;

    modalElement.className = isRTL() ? 'tizeosn-rtl' : 'tizeosn-ltr';
    modalElement.innerHTML = `
    <div class="tizeosn-modal-card">
      <div class="tizeosn-modal-header">
        <div>
          <div class="tizeosn-modal-title">
            <span>🛡️ ${t('appName')}</span>
            <span class="tizeosn-badge">TizenBrew Mod</span>
          </div>
          <div class="tizeosn-modal-subtitle">${t('settingsSubtitle')}</div>
        </div>
        <div class="tizeosn-stats-pill">
          <span class="tizeosn-stats-count" id="tizeosn-stats-val">${blockedCount}</span>
          <span>${t('adsBlockedLabel')}</span>
        </div>
      </div>

      <div class="tizeosn-modal-body" id="tizeosn-items-container">
        <!-- Section: Adblock -->
        <div class="tizeosn-section-title">${t('adBlockSection')}</div>
        
        <div class="tizeosn-item" data-action="toggle" data-key="enableAdBlock">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('enableAdBlock')}</div>
            <div class="tizeosn-item-desc">${t('enableAdBlockDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-toggle ${configRead('enableAdBlock') ? 'tizeosn-toggle-active' : ''}">
              <div class="tizeosn-toggle-knob"></div>
            </div>
          </div>
        </div>

        <!-- Section: Playback -->
        <div class="tizeosn-section-title">${t('playbackSection')}</div>

        <div class="tizeosn-item" data-action="toggle" data-key="enableAutoSkipIntro">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('enableAutoSkipIntro')}</div>
            <div class="tizeosn-item-desc">${t('enableAutoSkipIntroDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-toggle ${configRead('enableAutoSkipIntro') ? 'tizeosn-toggle-active' : ''}">
              <div class="tizeosn-toggle-knob"></div>
            </div>
          </div>
        </div>

        <div class="tizeosn-item" data-action="toggle" data-key="enableAutoSkipRecap">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('enableAutoSkipRecap')}</div>
            <div class="tizeosn-item-desc">${t('enableAutoSkipRecapDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-toggle ${configRead('enableAutoSkipRecap') ? 'tizeosn-toggle-active' : ''}">
              <div class="tizeosn-toggle-knob"></div>
            </div>
          </div>
        </div>

        <div class="tizeosn-item" data-action="toggle" data-key="enableAutoNextEpisode">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('enableAutoNextEpisode')}</div>
            <div class="tizeosn-item-desc">${t('enableAutoNextEpisodeDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-toggle ${configRead('enableAutoNextEpisode') ? 'tizeosn-toggle-active' : ''}">
              <div class="tizeosn-toggle-knob"></div>
            </div>
          </div>
        </div>

        <div class="tizeosn-item" data-action="cycle-speed" data-key="preferredPlaybackSpeed">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('preferredPlaybackSpeed')}</div>
            <div class="tizeosn-item-desc">${t('preferredPlaybackSpeedDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-select-value">${currentSpeed}x</div>
          </div>
        </div>

        <!-- Section: System -->
        <div class="tizeosn-section-title">${t('systemSection')}</div>

        <div class="tizeosn-item" data-action="cycle-lang" data-key="language">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('language')}</div>
            <div class="tizeosn-item-desc">${t('languageDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-select-value">${currentLang.toUpperCase()}</div>
          </div>
        </div>

        <div class="tizeosn-item" data-action="toggle" data-key="showOsdToasts">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('showOsdToasts')}</div>
            <div class="tizeosn-item-desc">${t('showOsdToastsDesc')}</div>
          </div>
          <div class="tizeosn-item-control">
            <div class="tizeosn-toggle ${configRead('showOsdToasts') ? 'tizeosn-toggle-active' : ''}">
              <div class="tizeosn-toggle-knob"></div>
            </div>
          </div>
        </div>

        <div class="tizeosn-item" data-action="reset-stats">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('resetStats')}</div>
            <div class="tizeosn-item-desc">Clear the blocked ads counter</div>
          </div>
          <div class="tizeosn-item-control">
            <span class="tizeosn-select-value">⟲</span>
          </div>
        </div>

        <div class="tizeosn-item" data-action="reload-page">
          <div class="tizeosn-item-info">
            <div class="tizeosn-item-title">${t('reload')}</div>
            <div class="tizeosn-item-desc">Refresh OSN+ web application</div>
          </div>
          <div class="tizeosn-item-control">
            <span class="tizeosn-select-value">🔄</span>
          </div>
        </div>
      </div>

      <div class="tizeosn-modal-footer">
        <div class="tizeosn-hints">
          <div class="tizeosn-hint-pill"><span>🔴</span> <span>${t('hintRedKey')}</span></div>
          <div class="tizeosn-hint-pill"><span>▲▼</span> <span>Navigate</span></div>
          <div class="tizeosn-hint-pill"><span>OK / ◄►</span> <span>Toggle</span></div>
          <div class="tizeosn-hint-pill"><span>↩</span> <span>${t('hintBackKey')}</span></div>
        </div>
      </div>
    </div>
  `;

    focusableItems = Array.from(modalElement.querySelectorAll('.tizeosn-item'));
    focusableItems.forEach((el, index) => {
      el.addEventListener('click', () => {
        focusedIndex = index;
        handleItemAction(el);
        updateFocus();
      });
    });
  }

  function handleModalKey(e) {
    if (!isVisible) return false;

    const key = e.keyCode || e.which;

    // Arrow Down
    if (key === 40) {
      e.preventDefault();
      e.stopPropagation();
      if (focusedIndex < focusableItems.length - 1) {
        focusedIndex++;
        updateFocus();
      }
      return true;
    }

    // Arrow Up
    if (key === 38) {
      e.preventDefault();
      e.stopPropagation();
      if (focusedIndex > 0) {
        focusedIndex--;
        updateFocus();
      }
      return true;
    }

    // Enter (13) or Arrow Left (37) / Arrow Right (39)
    if (key === 13 || key === 37 || key === 39) {
      e.preventDefault();
      e.stopPropagation();
      const item = focusableItems[focusedIndex];
      if (item) {
        handleItemAction(item, key === 37 ? -1 : 1);
      }
      return true;
    }

    // Back / Return (10009 or Escape 27)
    if (key === 10009 || key === 27) {
      e.preventDefault();
      e.stopPropagation();
      hideSettings();
      return true;
    }

    // Red key (403)
    if (key === 403) {
      e.preventDefault();
      e.stopPropagation();
      hideSettings();
      return true;
    }

    return true; // absorb all input while modal is open
  }

  function updateFocus() {
    focusableItems.forEach((el, idx) => {
      if (idx === focusedIndex) {
        el.classList.add('tizeosn-focused');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        el.classList.remove('tizeosn-focused');
      }
    });
  }

  function handleItemAction(el, direction = 1) {
    const action = el.getAttribute('data-action');
    const key = el.getAttribute('data-key');

    if (action === 'toggle' && key) {
      const newVal = !configRead(key);
      configWrite(key, newVal);
      const toggle = el.querySelector('.tizeosn-toggle');
      if (toggle) {
        toggle.classList.toggle('tizeosn-toggle-active', newVal);
      }
    } else if (action === 'cycle-speed') {
      const cur = configRead('preferredPlaybackSpeed') || 1.0;
      const curIdx = SPEED_OPTIONS.indexOf(cur);
      const nextIdx = (curIdx + direction + SPEED_OPTIONS.length) % SPEED_OPTIONS.length;
      const newSpeed = SPEED_OPTIONS[nextIdx];
      configWrite('preferredPlaybackSpeed', newSpeed);
      const valEl = el.querySelector('.tizeosn-select-value');
      if (valEl) valEl.textContent = newSpeed + 'x';
      showToast(t('toastSpeedSet') + newSpeed + 'x');
    } else if (action === 'cycle-lang') {
      const cur = configRead('language');
      const curIdx = LANG_OPTIONS.indexOf(cur);
      const nextIdx = (curIdx + direction + LANG_OPTIONS.length) % LANG_OPTIONS.length;
      const newLang = LANG_OPTIONS[nextIdx];
      configWrite('language', newLang);
      updateModalContent();
      updateFocus();
    } else if (action === 'reset-stats') {
      configWrite('blockedAdsCount', 0);
      const statsEl = document.getElementById('tizeosn-stats-val');
      if (statsEl) statsEl.textContent = '0';
      showToast('Statistics Reset');
    } else if (action === 'reload-page') {
      window.location.reload();
    }
  }

  /**
   * TizeOSN Spatial Navigation & TV Remote Key Handler
   * Maps Samsung Tizen TV remote keys (D-pad, Color keys, Media keys).
   */


  const TIZEN_KEYS = [
    'ColorF0Red',
    'ColorF1Green',
    'ColorF2Yellow',
    'ColorF3Blue',
    'MediaPlayPause',
    'MediaPlay',
    'MediaPause',
    'MediaStop',
    'MediaFastForward',
    'MediaRewind',
    'MediaTrackNext',
    'MediaTrackPrevious',
  ];

  function registerTizenDeviceKeys() {
    if (typeof tizen !== 'undefined' && tizen.tvinputdevice && tizen.tvinputdevice.registerKey) {
      TIZEN_KEYS.forEach((key) => {
        try {
          tizen.tvinputdevice.registerKey(key);
        } catch (e) {
          console.debug('[TizeOSN] registerKey failed for:', key, e);
        }
      });
    }
  }

  function getActiveVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (videos.length === 0) return null;
    // Return the currently playing or largest video element
    const playing = videos.find((v) => !v.paused && v.duration > 0);
    return playing || videos[0];
  }

  function handleMediaKey(keyCode) {
    const video = getActiveVideo();
    if (!video) return false;

    // MediaPlayPause (10252)
    if (keyCode === 10252) {
      if (video.paused) video.play();
      else video.pause();
      return true;
    }

    // MediaPlay (415)
    if (keyCode === 415) {
      video.play();
      return true;
    }

    // MediaPause (19)
    if (keyCode === 19) {
      video.pause();
      return true;
    }

    // MediaFastForward (417)
    if (keyCode === 417) {
      video.currentTime = Math.min(video.duration || 99999, video.currentTime + 10);
      showToast('⏩ +10s');
      return true;
    }

    // MediaRewind (412)
    if (keyCode === 412) {
      video.currentTime = Math.max(0, video.currentTime - 10);
      showToast('⏪ -10s');
      return true;
    }

    // MediaStop (413)
    if (keyCode === 413) {
      video.pause();
      video.currentTime = 0;
      return true;
    }

    return false;
  }

  function handleColorKey(keyCode) {
    // Red Key (403): Toggle Settings Modal
    if (keyCode === 403) {
      toggleSettings();
      return true;
    }

    // Green Key (404): Quick AdBlock Stats Toast
    if (keyCode === 404) {
      const count = configRead('blockedAdsCount') || 0;
      const isEnabled = configRead('enableAdBlock');
      showToast(`🛡️ TizeOSN: ${isEnabled ? 'Active' : 'Disabled'} (${count} ${t('adsBlockedLabel')})`);
      return true;
    }

    // Yellow Key (405): Cycle Playback Speed
    if (keyCode === 405) {
      const video = getActiveVideo();
      const speeds = [1.0, 1.25, 1.5, 2.0, 0.75];
      const current = configRead('preferredPlaybackSpeed') || 1.0;
      const nextIdx = (speeds.indexOf(current) + 1) % speeds.length;
      const newSpeed = speeds[nextIdx];
      configWrite('preferredPlaybackSpeed', newSpeed);
      if (video) video.playbackRate = newSpeed;
      showToast(`${t('toastSpeedSet')} ${newSpeed}x`);
      return true;
    }

    // Blue Key (406): Quick Skip Intro/Recap
    if (keyCode === 406) {
      const skipBtn = document.querySelector(
        'button[class*="skip"], [class*="Skip"], [aria-label*="Skip"], [aria-label*="تخطي"]'
      );
      if (skipBtn) {
        try {
          skipBtn.click();
          showToast(t('toastIntroSkipped'));
        } catch (e) {}
      } else {
        showToast('No skip prompt active');
      }
      return true;
    }

    return false;
  }

  function initSpatialNav() {
    registerTizenDeviceKeys();

    window.addEventListener('keydown', (e) => {
      const code = e.keyCode || e.which;

      // 1. If modal is visible, route directly to modal key handler
      if (isSettingsVisible()) {
        if (handleModalKey(e)) return;
      }

      // 2. Color keys
      if ([403, 404, 405, 406].includes(code)) {
        if (handleColorKey(code)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      // 3. Media keys
      if ([10252, 415, 19, 417, 412, 413].includes(code)) {
        if (handleMediaKey(code)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    }, true);

    console.log('[TizeOSN] Spatial Navigation and Remote Keys ready.');
  }

  /**
   * TizeOSN Playback Controller
   * Enforces playback rate preferences and video quality rules.
   */


  function initPlaybackControl() {
    function applySpeed(video) {
      if (!video) return;
      const speed = configRead('preferredPlaybackSpeed') || 1.0;
      if (video.playbackRate !== speed && !video.paused) {
        video.playbackRate = speed;
      }
    }

    // Hook new video elements
    document.addEventListener('play', (e) => {
      if (e.target && e.target.nodeName === 'VIDEO') {
        applySpeed(e.target);
      }
    }, true);

    // Subscribe to config changes
    subscribeConfig((key, val) => {
      if (key === 'preferredPlaybackSpeed') {
        document.querySelectorAll('video').forEach((v) => {
          v.playbackRate = val;
        });
      }
    });

    console.log('[TizeOSN] Playback Controller initialized.');
  }

  /**
   * TizeOSN - Ad-Free OSN+ Client for Samsung Smart TVs (Tizen OS)
   * Launched via TizenBrew
   *
   * @version 1.0.0
   * @author TizeOSN Contributors
   * @license GPL-3.0-only
   */


  (function () {

    // Prevent multiple injections
    if (window.__TIZEOSN_INITIALIZED__) {
      console.log('[TizeOSN] Already initialized, skipping.');
      return;
    }
    window.__TIZEOSN_INITIALIZED__ = true;

    console.log(
      '%c🛡️ TizeOSN v1.0.0 Active %c| Ad-Free OSN+ for TizenBrew',
      'background: #0284c7; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      'color: #38bdf8; font-weight: bold;'
    );

    // 1. Initialize environment compatibility
    initUserAgentSpoofing();

    // 2. Inject CSS rules for ad suppression and modal styles
    injectStyles();

    // 3. Initialize AdBlock Engine (Network, JSON, Player, IMA)
    initAdBlock();

    // 4. Initialize Auto-Skip (Intro, Recap, Next Episode)
    initAutoSkip();

    // 5. Initialize TV Remote Keys & Spatial Navigation
    initSpatialNav();

    // 6. Initialize Playback Speed Controller
    initPlaybackControl();

    // 7. Add quick on-screen floating trigger for non-remote environments / testing
    function addOnScreenBadge() {
      const badge = document.createElement('div');
      badge.id = 'tizeosn-quick-badge';
      badge.innerHTML = `🛡️`;
      badge.title = 'TizeOSN Settings (or press Red Key on TV Remote)';
      badge.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 44px;
      height: 44px;
      background: rgba(15, 23, 42, 0.85);
      border: 1.5px solid rgba(56, 189, 248, 0.5);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      cursor: pointer;
      z-index: 2147483640;
      box-shadow: 0 4px 15px rgba(0,0,0,0.6);
      transition: transform 0.2s ease;
      backdrop-filter: blur(8px);
    `;

      badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.15)';
      });
      badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1.0)';
      });
      badge.addEventListener('click', () => {
        toggleSettings();
      });

      (document.body || document.documentElement).appendChild(badge);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        addOnScreenBadge();
        showToast(`${t('appName')} v1.0.0 Ready!`);
      });
    } else {
      addOnScreenBadge();
      showToast(`${t('appName')} v1.0.0 Ready!`);
    }
  })();

})();
