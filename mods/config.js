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

export function getConfig() {
  if (cachedConfig) return cachedConfig;
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
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

export function configRead(key) {
  const cfg = getConfig();
  return cfg && cfg[key] !== undefined ? cfg[key] : DEFAULT_CONFIG[key];
}

export function configWrite(key, value) {
  const cfg = getConfig();
  cfg[key] = value;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch (e) {
    console.warn('[TizeOSN] Failed to save config to localStorage:', e);
  }
  notifyListeners(key, value);
}

export function incrementBlockedAds() {
  const current = configRead('blockedAdsCount') || 0;
  configWrite('blockedAdsCount', current + 1);
  return current + 1;
}

export function configReset() {
  cachedConfig = Object.assign({}, DEFAULT_CONFIG);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  notifyListeners('*', cachedConfig);
}

export function subscribeConfig(fn) {
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
