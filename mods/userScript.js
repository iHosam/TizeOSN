/**
 * TizeOSN - Ad-Free OSN+ Client for Samsung Smart TVs (Tizen OS)
 * Launched via TizenBrew
 *
 * @version 1.0.0
 * @author TizeOSN Contributors
 * @license GPL-3.0-only
 */

import { injectStyles } from './ui/styles.js';
import { initUserAgentSpoofing } from './features/userAgentSpoofing.js';
import { initAdBlock } from './features/adblock.js';
import { initAutoSkip } from './features/autoSkip.js';
import { initSpatialNav } from './features/spatialNav.js';
import { initPlaybackControl } from './features/playbackControl.js';
import { showToast } from './ui/osd.js';
import { toggleSettings } from './ui/settings.js';
import { t } from './translations/index.js';

(function () {
  'use strict';

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
