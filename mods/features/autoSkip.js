/**
 * TizeOSN Auto-Skip & Binge Module
 * Automatically clicks "Skip Intro", "Skip Recap", and "Next Episode" buttons.
 */

import { configRead } from '../config.js';
import { showToast } from '../ui/osd.js';
import { t } from '../translations/index.js';

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

export function initAutoSkip() {
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
