/**
 * TizeOSN Playback Controller
 * Enforces playback rate preferences and video quality rules.
 */

import { configRead, subscribeConfig } from '../config.js';

export function initPlaybackControl() {
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
