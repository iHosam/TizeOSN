function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* TizeOSN - Ad-Free OSN+ Client for Samsung Smart TVs (Tizen OS) | GPL-3.0 */
(function () {
  'use strict';

  /**
   * TizeOSN Injected Stylesheet
   * Contains adblock CSS suppression and TV UI styling.
   */
  var CSS_STYLES = `
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
    var style = document.createElement('style');
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
          var constructor = this.constructor;
          return this.then(value => constructor.resolve(callback()).then(() => value), reason => constructor.resolve(callback()).then(() => {
            throw reason;
          }));
        };
      }
      if (!Object.fromEntries) {
        Object.fromEntries = function (entries) {
          if (!entries || !entries[Symbol.iterator]) {
            throw new Error('Object.fromEntries() requires a single iterable argument');
          }
          var obj = {};
          var _iterator = _createForOfIteratorHelper(entries),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                k = _step$value[0],
                v = _step$value[1];
              obj[k] = v;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return obj;
        };
      }

      // Suppress console spam or anti-adblock debugger loops
      var origDebug = console.debug;
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

  var STORAGE_KEY = 'tizeosn_settings';
  var DEFAULT_CONFIG = {
    enableAdBlock: true,
    enableAutoSkipIntro: true,
    enableAutoSkipRecap: true,
    enableAutoNextEpisode: true,
    autoSkipDelayMs: 600,
    preferredPlaybackSpeed: 1.0,
    preferredVideoQuality: 'auto',
    enableSpatialNav: true,
    showOsdToasts: true,
    language: 'auto',
    // 'auto', 'ar', or 'en'
    blockedAdsCount: 0,
    enableDebugLogging: false
  };
  var cachedConfig = null;
  var listeners = new Set();
  function getConfig() {
    if (cachedConfig) return cachedConfig;
    try {
      var raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        cachedConfig = Object.assign({}, DEFAULT_CONFIG, JSON.parse(raw));
        return cachedConfig;
      }
    } catch (e) {
      // Return fallback without throwing
    }
    cachedConfig = Object.assign({}, DEFAULT_CONFIG);
    return cachedConfig;
  }
  function configRead(key) {
    var cfg = getConfig();
    return cfg && cfg[key] !== undefined ? cfg[key] : DEFAULT_CONFIG[key];
  }
  function configWrite(key, value) {
    var cfg = getConfig();
    cfg[key] = value;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.warn('[TizeOSN] Failed to save config to localStorage:', e);
    }
    notifyListeners(key, value);
  }
  function incrementBlockedAds() {
    var current = configRead('blockedAdsCount') || 0;
    configWrite('blockedAdsCount', current + 1);
    return current + 1;
  }
  function subscribeConfig(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
  function notifyListeners(key, value) {
    listeners.forEach(fn => {
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
    hintBackKey: 'Back to close'
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
    hintBackKey: 'رجوع للإغلاق'
  };
  var translations = {
    en,
    ar
  };
  function getCurrentLanguage() {
    var pref = configRead('language');
    if (pref === 'ar' || pref === 'en') return pref;

    // Auto-detect based on html lang, document direction, or navigator language
    var docLang = document.documentElement.lang || '';
    var docDir = document.documentElement.dir || '';
    var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (docLang.startsWith('ar') || docDir === 'rtl' || navLang.startsWith('ar')) {
      return 'ar';
    }
    return 'en';
  }
  function t(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var lang = getCurrentLanguage();
    var dict = translations[lang] || translations.en;
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

  var container = null;
  var toastTimeout = null;
  function ensureContainer() {
    if (container && document.body.contains(container)) return container;
    container = document.createElement('div');
    container.id = 'tizeosn-osd-container';
    container.className = isRTL() ? 'tizeosn-rtl' : 'tizeosn-ltr';
    document.body.appendChild(container);
    return container;
  }
  function showToast(message) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2800;
    if (!configRead('showOsdToasts')) return;
    try {
      var parent = ensureContainer();

      // Clear any existing toast for rapid-fire alerts
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      var toast = document.createElement('div');
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
   * TizeOSN AdBlock Engine v1.0.4
   * Multi-layer impenetrable ad defense:
   * 1. Stream API hook: Enforces hasAds=false and captures clean manifest URL.
   * 2. Response modifier: In-place text()/json() overrides (safe for all Tizen web engines).
   * 3. Broadpeak SSAI neutralizer: Blocks BkM/BkYou manifest stitching requests.
   * 4. Shaka Player load interceptor: Forces playback of pristine unstitched manifest.
   * 5. Pause-ad & Preroll eliminator: Stubs pause-ad endpoints and wipes preroll trailers.
   * 6. DOM ad event suppressor: Captures and kills Apollo ad overlay events.
   */

  var lastToastTime = 0;

  // Store the clean, unstitched manifest URL across calls
  window.__TIZEOSN_CLEAN_MANIFEST__ = null;
  function notifyAdBlocked(label) {
    incrementBlockedAds();
    var now = Date.now();
    if (now - lastToastTime > 4000) {
      lastToastTime = now;
      showToast(t('toastAdBlocked'));
    }
    if (label) {
      console.log('[TizeOSN AdBlock]', label);
    }
  }

  // Known third-party ad networks, telemetry trackers, and pause-ad endpoints
  var AD_PATTERNS = [/googleads\.g\.doubleclick\.net/i, /pubads\.g\.doubleclick\.net/i, /securepubads\.g\.doubleclick\.net/i, /pagead2\.googlesyndication\.com/i, /imasdk\.googleapis\.com/i, /\.fwmrm\.net/i, /\.freewheel\.tv/i, /adnxs\.com/i, /rubiconproject\.com/i, /criteo\.com/i, /app\.adjust\.com/i, /\.appsflyer\.com/i, /api\.branch\.io/i, /api\.mixpanel\.com/i, /api\.moengage\.com/i, /omweb-v1/i, /omid-session-client/i, /adTracking/i, /adMetrics/i, /adPalSession/i, /\/ad-breaks/i, /\/ad_breaks/i, /\/ad-pods/i, /adOpportunity/i, /\/adrule/i, /vast(\.xml|\?)/i, /vmap(\.xml|\?)/i, /vpaid/i, /\/telemetry\/ad/i, /\/analytics\/ad/i, /\/tracking\/ad/i, /\/beacon\/ad/i, /\/osn\/ads\/v1\//i, /\/save-advertising-id/i];
  function isAdUrl(url) {
    if (!url || typeof url !== 'string') return false;
    // Core content APIs that we pass through but sanitize
    if (url.includes('/osn/media/v1/stream') || url.includes('/osn/subs/v1/get-purchases-entitlements') || url.includes('/osn/media/v1/get-playback-config') || url.includes('/osn/media/v1/get-watch-content')) {
      return false;
    }
    for (var i = 0; i < AD_PATTERNS.length; i++) {
      if (AD_PATTERNS[i].test(url)) return true;
    }
    return false;
  }

  /**
   * Detect Broadpeak Dynamic Ad Insertion (SSAI) manifest requests
   */
  function isBroadpeakSsaiUrl(url) {
    if (!url || typeof url !== 'string') return false;
    return url.includes('bk-ml=1') || url.includes('nanocdnhost=') || url.includes('bk-precache=') || url.includes('bpk-token=') || url.includes('requestBkYou');
  }

  /**
   * Deep object sanitizer to remove SSAI markers, cue points, and ad flags
   */
  function sanitizeAdData(obj) {
    if (!obj || _typeof(obj) !== 'object') return obj;
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
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
      obj.cuePoints = obj.cuePoints.filter(cp => !cp || !cp.type || !cp.type.toLowerCase().includes('ad'));
    }

    // Catalog promo trays
    if (Array.isArray(obj.items)) {
      obj.items = obj.items.filter(item => {
        if (!item) return true;
        if (item.type === 'ad' || item.isAd || item.adSlot) return false;
        var title = (item.title || item.name || '').toLowerCase();
        if (title.includes('upgrade to ad-free') || title.includes('ترقية باقة')) return false;
        return true;
      });
    }
    for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
      var k = _Object$keys[_i];
      if (_typeof(obj[k]) === 'object' && obj[k] !== null) {
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
    var originalFetch = window.fetch;
    if (!originalFetch) return;
    window.fetch = function (resource, init) {
      var url = typeof resource === 'string' ? resource : resource && resource.url || '';

      // Check if ad blocking is active
      if (!configRead('enableAdBlock')) {
        return originalFetch.apply(this, arguments);
      }

      // A. Block pure third-party ad networks, pause ads & telemetry
      if (isAdUrl(url)) {
        notifyAdBlocked(`Blocked ad request: ${url.slice(0, 80)}`);
        if (url.includes('.xml') || url.includes('vast') || url.includes('vmap')) {
          return Promise.resolve(new Response('<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"/>', {
            status: 200,
            headers: {
              'Content-Type': 'application/xml'
            }
          }));
        }
        return Promise.resolve(new Response(JSON.stringify({
          adBreaks: [],
          ads: [],
          status: 'no_ads',
          podLength: 0
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      }

      // B. Block Broadpeak SSAI manifest requests (forces Apollo fallback to clean original manifest)
      if (isBroadpeakSsaiUrl(url)) {
        notifyAdBlocked(`Blocked Broadpeak SSAI manifest request: ${url.slice(0, 80)}`);
        return Promise.reject(new TypeError('Broadpeak SSAI blocked'));
      }

      // C. Intercept OSN+ Core Endpoints
      var isStreamApi = url.includes('/osn/media/v1/stream');
      var isEntitlementsApi = url.includes('/osn/subs/v1/get-purchases-entitlements');
      var isPlaybackConfigApi = url.includes('/osn/media/v1/get-playback-config');
      var isWatchContentApi = url.includes('/osn/media/v1/get-watch-content');
      if (isStreamApi || isEntitlementsApi || isPlaybackConfigApi || isWatchContentApi) {
        return originalFetch.apply(this, arguments).then(response => {
          if (!response || !response.ok) return response;

          // Wrap response.text without constructing new Response (avoids Headers TypeError on Tizen)
          var origText = response.text.bind(response);
          response.text = function () {
            return origText().then(rawText => {
              try {
                var data = JSON.parse(rawText);
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
              return response.text().then(text => JSON.parse(text));
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
    var originalOpen = XMLHttpRequest.prototype.open;
    var originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
      this._tizeosn_url = typeof url === 'string' ? url : url && url.toString() || '';
      return originalOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function () {
      var url = this._tizeosn_url;
      if (configRead('enableAdBlock')) {
        // A. Block pure ad networks
        if (isAdUrl(url)) {
          notifyAdBlocked(`XHR blocked ad: ${url.slice(0, 60)}`);
          Object.defineProperty(this, 'readyState', {
            writable: true,
            value: 4
          });
          Object.defineProperty(this, 'status', {
            writable: true,
            value: 200
          });
          Object.defineProperty(this, 'responseText', {
            writable: true,
            value: JSON.stringify({
              adBreaks: [],
              ads: [],
              status: 'no_ads'
            })
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
        var origOnload = this.onload;
        this.onload = function () {
          try {
            if (this.responseText) {
              var data = JSON.parse(this.responseText);
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
                value: JSON.stringify(data)
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
  var inJsonSanitizer = false;
  function initJsonInterceptor() {
    var origParse = JSON.parse;
    JSON.parse = function () {
      var res = origParse.apply(this, arguments);
      if (inJsonSanitizer) return res;
      inJsonSanitizer = true;
      try {
        if (res && _typeof(res) === 'object') {
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
    MockAdsLoader.prototype.getSettings = function () {
      return this.settings;
    };
    MockAdsLoader.prototype.requestAds = function () {
      var self = this;
      setTimeout(() => {
        if (typeof self._onLoaded === 'function') {
          self._onLoaded({
            getAdsManager() {
              return new MockAdsManager();
            }
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
      var self = this;
      setTimeout(() => {
        if (typeof self._onEvent === 'function') {
          self._onEvent({
            type: 'allAdsCompleted'
          });
          self._onEvent({
            type: 'contentResumeRequested'
          });
        }
      }, 10);
    };
    MockAdsManager.prototype.stop = function () {};
    MockAdsManager.prototype.pause = function () {};
    MockAdsManager.prototype.resume = function () {};
    MockAdsManager.prototype.destroy = function () {};
    MockAdsManager.prototype.setVolume = function () {};
    MockAdsManager.prototype.getVolume = function () {
      return 1;
    };
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
      ViewMode: {
        NORMAL: 'normal',
        FULLSCREEN: 'fullscreen'
      },
      AdError: {
        Type: {}
      },
      AdEvent: {
        Type: {
          ALL_ADS_COMPLETED: 'allAdsCompleted',
          CONTENT_RESUME_REQUESTED: 'contentResumeRequested',
          CONTENT_PAUSE_REQUESTED: 'contentPauseRequested',
          LOADED: 'loaded',
          STARTED: 'started',
          COMPLETE: 'complete'
        }
      }
    };
  }

  /**
   * 5. Broadpeak / Apollo Ad DOM Event Suppressor
   * Prevents Apollo UI from switching to the PlayerAdsOverlay
   */
  function initAdEventsSuppressor() {
    var adEvents = ['onadbreakbegin', 'onadbegin', 'onadskippable', 'onaddata', 'onadend', 'onadbreakend'];
    adEvents.forEach(evtName => {
      document.addEventListener(evtName, e => {
        if (!configRead('enableAdBlock')) return;
        e.stopImmediatePropagation();
        console.debug('[TizeOSN] Suppressed SSAI DOM event:', evtName);
      }, true);
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
        var origLoad = window.shaka.Player.prototype.load;
        window.shaka.Player.prototype.load = function (asset, startTime, mimeType) {
          var targetManifest = asset;

          // If a clean manifest was captured from /osn/media/v1/stream, enforce it!
          if (window.__TIZEOSN_CLEAN_MANIFEST__) {
            if (typeof asset === 'string') {
              console.log('[TizeOSN] Shaka load: Enforcing clean original manifest URL ->', window.__TIZEOSN_CLEAN_MANIFEST__);
              targetManifest = window.__TIZEOSN_CLEAN_MANIFEST__;
            } else if (asset && _typeof(asset) === 'object' && asset.manifestUrl) {
              asset.manifestUrl = window.__TIZEOSN_CLEAN_MANIFEST__;
            }
          } else if (typeof asset === 'string' && isBroadpeakSsaiUrl(asset)) {
            // If broadpeak query parameters are attached, strip them to restore pure stream
            try {
              var urlObj = new URL(asset);
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
          var netProto = window.shaka.net && window.shaka.net.NetworkingEngine && window.shaka.net.NetworkingEngine.prototype;
          if (netProto && netProto.request && !netProto._tizeosn_hooked) {
            netProto._tizeosn_hooked = true;
            var origRequest = netProto.request;
            netProto.request = function (type, request) {
              if (configRead('enableAdBlock') && request && request.uris) {
                for (var i = 0; i < request.uris.length; i++) {
                  if (isAdUrl(request.uris[i]) || isBroadpeakSsaiUrl(request.uris[i])) {
                    notifyAdBlocked('Shaka blocked ad network request');
                    return Promise.resolve({
                      data: new ArrayBuffer(0),
                      headers: {}
                    });
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
      var isExplicitAdContainer = video.closest('[class*="AdContainer"], [class*="adContainer"], [id*="adContainer"], [class*="PrerollVideo"]');
      var isMarkedAd = video.getAttribute('data-is-ad') === 'true';
      if (isExplicitAdContainer || isMarkedAd) {
        notifyAdBlocked();
        video.muted = true;
        video.playbackRate = 16.0;
      }
    });

    // Watch for skip buttons in DOM
    var skipBtn = document.querySelector('.videoAdUiSkipButton, [class*="skip-ad"], [class*="skipAd"], [aria-label*="Skip Ad"], [aria-label*="تخطي الاعلان"], [aria-label*="تخطي"]');
    if (skipBtn && configRead('enableAdBlock')) {
      try {
        skipBtn.click();
        notifyAdBlocked('Clicked on-screen skip button');
      } catch (e) {}
    }
  }
  function initVideoElementWatcher() {
    document.querySelectorAll('video').forEach(attachVideoAdSkipper);
    var observer = new MutationObserver(mutations => {
      var _iterator2 = _createForOfIteratorHelper(mutations),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var m = _step2.value;
          var _iterator3 = _createForOfIteratorHelper(m.addedNodes),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var node = _step3.value;
              if (node.nodeName === 'VIDEO') {
                attachVideoAdSkipper(node);
              } else if (node.querySelectorAll) {
                node.querySelectorAll('video').forEach(attachVideoAdSkipper);
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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
      initAdEventsSuppressor();
      initShakaInterceptor();
      initVideoElementWatcher();
      console.log('[TizeOSN] AdBlock Engine v1.0.4 initialized successfully.');
    } catch (err) {
      console.error('[TizeOSN] AdBlock initialization error:', err);
    }
  }

  /**
   * TizeOSN Auto-Skip & Binge Module
   * Automatically clicks "Skip Intro", "Skip Recap", and "Next Episode" buttons.
   */

  var lastSkipIntroTime = 0;
  var lastSkipRecapTime = 0;
  var lastNextEpisodeTime = 0;

  // Patterns for Skip buttons in English and Arabic
  var INTRO_REGEX = /skip\s*intro|تخطي\s*المقدمة/i;
  var RECAP_REGEX = /skip\s*recap|تخطي\s*الملخص|previously\s*on/i;
  var NEXT_EPISODE_REGEX = /next\s*episode|الحلقة\s*التالية|watch\s*next/i;
  function checkAndClickButtons() {
    var now = Date.now();

    // Find all visible clickable buttons, divs, or spans
    var candidates = document.querySelectorAll('button, [role="button"], [class*="skip"], [class*="Skip"], [class*="next-episode"], [class*="nextEpisode"]');
    candidates.forEach(el => {
      // Only check visible elements
      if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) return;
      var text = (el.innerText || el.textContent || el.getAttribute('aria-label') || '').trim();
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
    var observer = new MutationObserver(() => {
      checkAndClickButtons();
    });
    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });
    console.log('[TizeOSN] Auto-Skip module initialized.');
  }

  /**
   * TizeOSN Settings Modal UI
   * TV-optimized modal dialog with full D-pad remote control navigation.
   */

  var modalElement = null;
  var isVisible = false;
  var focusedIndex = 0;
  var focusableItems = [];
  var SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];
  var LANG_OPTIONS = ['auto', 'en', 'ar'];
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
    var blockedCount = configRead('blockedAdsCount') || 0;
    var currentLang = configRead('language');
    var currentSpeed = configRead('preferredPlaybackSpeed') || 1.0;
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
    var key = e.keyCode || e.which;

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
      var item = focusableItems[focusedIndex];
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
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      } else {
        el.classList.remove('tizeosn-focused');
      }
    });
  }
  function handleItemAction(el) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var action = el.getAttribute('data-action');
    var key = el.getAttribute('data-key');
    if (action === 'toggle' && key) {
      var newVal = !configRead(key);
      configWrite(key, newVal);
      var toggle = el.querySelector('.tizeosn-toggle');
      if (toggle) {
        toggle.classList.toggle('tizeosn-toggle-active', newVal);
      }
    } else if (action === 'cycle-speed') {
      var cur = configRead('preferredPlaybackSpeed') || 1.0;
      var curIdx = SPEED_OPTIONS.indexOf(cur);
      var nextIdx = (curIdx + direction + SPEED_OPTIONS.length) % SPEED_OPTIONS.length;
      var newSpeed = SPEED_OPTIONS[nextIdx];
      configWrite('preferredPlaybackSpeed', newSpeed);
      var valEl = el.querySelector('.tizeosn-select-value');
      if (valEl) valEl.textContent = newSpeed + 'x';
      showToast(t('toastSpeedSet') + newSpeed + 'x');
    } else if (action === 'cycle-lang') {
      var _cur = configRead('language');
      var _curIdx = LANG_OPTIONS.indexOf(_cur);
      var _nextIdx = (_curIdx + direction + LANG_OPTIONS.length) % LANG_OPTIONS.length;
      var newLang = LANG_OPTIONS[_nextIdx];
      configWrite('language', newLang);
      updateModalContent();
      updateFocus();
    } else if (action === 'reset-stats') {
      configWrite('blockedAdsCount', 0);
      var statsEl = document.getElementById('tizeosn-stats-val');
      if (statsEl) statsEl.textContent = '0';
      showToast('Statistics Reset');
    } else if (action === 'reload-page') {
      window.location.reload();
    }
  }

  /**
   * TizeOSN Spatial Navigation & TV Remote Key Handler
   * Maps Samsung Tizen TV remote keys (D-pad, Color keys, Media keys).
   *
   * NOTE: Media keys (Play, Pause, FastForward, Rewind) are registered with Tizen
   * so the system forwards them, but we allow them to bubble naturally to OSN+'s
   * native MediaKeyInterceptor so Shaka Player seeks smoothly without MSE pipeline desync.
   */

  var TIZEN_KEYS = ['ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue', 'MediaPlayPause', 'MediaPlay', 'MediaPause', 'MediaStop', 'MediaFastForward', 'MediaRewind', 'MediaTrackNext', 'MediaTrackPrevious'];
  function registerTizenDeviceKeys() {
    if (typeof tizen !== 'undefined' && tizen.tvinputdevice && tizen.tvinputdevice.registerKey) {
      TIZEN_KEYS.forEach(key => {
        try {
          tizen.tvinputdevice.registerKey(key);
        } catch (e) {
          // Some older/newer remote models don't support certain color or track keys
        }
      });
    }
  }
  function getActiveVideo() {
    var videos = Array.from(document.querySelectorAll('video'));
    if (videos.length === 0) return null;
    var playing = videos.find(v => !v.paused && v.duration > 0);
    return playing || videos[0];
  }
  function handleColorKey(keyCode) {
    // Red Key (403): Toggle Settings Modal
    if (keyCode === 403) {
      toggleSettings();
      return true;
    }

    // Green Key (404): Quick AdBlock Stats Toast
    if (keyCode === 404) {
      var count = configRead('blockedAdsCount') || 0;
      var isEnabled = configRead('enableAdBlock');
      showToast(`🛡️ TizeOSN: ${isEnabled ? 'Active' : 'Disabled'} (${count} ${t('adsBlockedLabel')})`);
      return true;
    }

    // Yellow Key (405): Cycle Playback Speed
    if (keyCode === 405) {
      var video = getActiveVideo();
      var speeds = [1.0, 1.25, 1.5, 2.0, 0.75];
      var current = configRead('preferredPlaybackSpeed') || 1.0;
      var nextIdx = (speeds.indexOf(current) + 1) % speeds.length;
      var newSpeed = speeds[nextIdx];
      configWrite('preferredPlaybackSpeed', newSpeed);
      if (video) video.playbackRate = newSpeed;
      showToast(`${t('toastSpeedSet')} ${newSpeed}x`);
      return true;
    }

    // Blue Key (406): Quick Skip Intro/Recap
    if (keyCode === 406) {
      var skipBtn = document.querySelector('button[class*="skip"], [class*="Skip"], [aria-label*="Skip"], [aria-label*="تخطي"]');
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
    window.addEventListener('keydown', e => {
      var code = e.keyCode || e.which;

      // 1. If modal is visible, route directly to modal key handler
      if (isSettingsVisible()) {
        if (handleModalKey(e)) return;
      }

      // 2. Color keys - TizeOSN custom shortcuts
      if ([403, 404, 405, 406].includes(code)) {
        if (handleColorKey(code)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      // 3. Media keys (Play, Pause, FastForward 417, Rewind 412, Stop 413, PlayPause 10252)
      // We intentionally DO NOT block or preventDefault here!
      // Letting them pass through allows OSN+'s native MediaKeyInterceptor component
      // to handle seeking (+10s / -10s) and playback state smoothly through Shaka.
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
      var speed = configRead('preferredPlaybackSpeed') || 1.0;
      if (video.playbackRate !== speed && !video.paused) {
        video.playbackRate = speed;
      }
    }

    // Hook new video elements
    document.addEventListener('play', e => {
      if (e.target && e.target.nodeName === 'VIDEO') {
        applySpeed(e.target);
      }
    }, true);

    // Subscribe to config changes
    subscribeConfig((key, val) => {
      if (key === 'preferredPlaybackSpeed') {
        document.querySelectorAll('video').forEach(v => {
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
   * @version 1.0.4
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
    console.log('%c🛡️ TizeOSN v1.0.4 Active %c| Ad-Free OSN+ for TizenBrew', 'background: #0284c7; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;', 'color: #38bdf8; font-weight: bold;');

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
      var badge = document.createElement('div');
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
        showToast(`${t('appName')} v1.0.4 Ready!`);
      });
    } else {
      addOnScreenBadge();
      showToast(`${t('appName')} v1.0.4 Ready!`);
    }
  })();
})();
