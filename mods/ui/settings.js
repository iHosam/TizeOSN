/**
 * TizeOSN Settings Modal UI
 * TV-optimized modal dialog with full D-pad remote control navigation.
 */

import { configRead, configWrite, incrementBlockedAds } from '../config.js';
import { t, isRTL, getCurrentLanguage } from '../translations/index.js';
import { showToast } from './osd.js';

let modalElement = null;
let isVisible = false;
let focusedIndex = 0;
let focusableItems = [];

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];
const LANG_OPTIONS = ['auto', 'en', 'ar'];

export function isSettingsVisible() {
  return isVisible;
}

export function toggleSettings() {
  if (isVisible) {
    hideSettings();
  } else {
    showSettings();
  }
}

export function showSettings() {
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

export function hideSettings() {
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

export function handleModalKey(e) {
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
