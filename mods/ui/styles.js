/**
 * TizeOSN Injected Stylesheet
 * Contains adblock CSS suppression and TV UI styling.
 */

export const CSS_STYLES = `
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

export function injectStyles() {
  if (document.getElementById('tizeosn-injected-styles')) return;
  const style = document.createElement('style');
  style.id = 'tizeosn-injected-styles';
  style.textContent = CSS_STYLES;
  (document.head || document.documentElement).appendChild(style);
}
