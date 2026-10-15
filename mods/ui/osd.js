/**
 * TizeOSN On-Screen Display (OSD) Toasts
 * Clean notifications designed for TV 10-foot viewing experience.
 */

import { configRead } from '../config.js';
import { isRTL } from '../translations/index.js';

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

export function showToast(message, duration = 2800) {
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
