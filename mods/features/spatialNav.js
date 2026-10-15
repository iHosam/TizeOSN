/**
 * TizeOSN Spatial Navigation & TV Remote Key Handler
 * Maps Samsung Tizen TV remote keys (D-pad, Color keys, Media keys).
 */

import { toggleSettings, isSettingsVisible, handleModalKey } from '../ui/settings.js';
import { configRead, configWrite } from '../config.js';
import { showToast } from '../ui/osd.js';
import { t } from '../translations/index.js';

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

export function registerTizenDeviceKeys() {
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

export function initSpatialNav() {
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
