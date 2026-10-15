# 🛡️ TizeOSN - Ad-Free OSN+ for Samsung Smart TVs (Tizen OS)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Platform](https://img.shields.io/badge/Platform-Samsung%20Tizen%20TV-black.svg)](https://developer.samsung.com/smarttv)
[![Launcher](https://img.shields.io/badge/Launcher-TizenBrew-orange.svg)](https://github.com/reisxd/TizenBrew)

**TizeOSN** is an open-source, ad-free and sponsor-free client modification for **OSN+** ([osnplus.com](https://osnplus.com)) tailored specifically for Samsung Smart TVs running **Tizen OS**.

Modeled after [TizenTube](https://github.com/reisxd/TizenTube), TizeOSN integrates directly into the **[TizenBrew](https://github.com/reisxd/TizenBrew)** homebrew loader ecosystem. It injects an optimized userscript into the OSN+ web application to strip advertisements, automate binge-watching controls (Skip Intro / Recap / Next Episode), and provide an enhanced 10-foot TV viewing experience.

---

## ✨ Features

### 🚫 Complete Video & Interface Ad-Blocking
- **Network-Level Interception:** Hooks `window.fetch` and `XMLHttpRequest` to neutralize ad calls (Google IMA SDK, DoubleClick, FreeWheel, and OSN+ ad-decision servers).
- **JSON Manifest Sanitization:** Strips `adBreaks`, `adPods`, `adOpportunities`, and cue points from video stream descriptors before playback begins.
- **Instant Video Ad Skipper:** For any video commercials that manage to load, TizeOSN immediately mutes audio, accelerates playback to maximum speed ($16\times$), seeks past the ad segment, and restores the main stream in milliseconds.
- **Cosmetic Filtering:** Hides promotional trays, banner ads, and "Upgrade to Ad-Free" upsell modals.

### ⏭️ Smart Binge Watching (Auto-Skip)
- **Auto-Skip Intro:** Automatically detects and triggers "Skip Intro" / "تخطي المقدمة" as soon as it appears.
- **Auto-Skip Recap:** Automatically skips "Previously On" / "تخطي الملخص" segments.
- **Auto Next Episode:** Seamlessly triggers "Next Episode" / "الحلقة التالية" when end credits roll.

### 🎮 Samsung Remote Control & Spatial Navigation
Full integration with Samsung Smart TV remote controls:
- **D-Pad (Up / Down / Left / Right / Enter):** Smooth navigation across tiles and player controls.
- **Media Keys:**
  - `Play` / `Pause` / `PlayPause`: Instant media control.
  - `Fast Forward`: Skip forward 10 seconds.
  - `Rewind`: Jump back 10 seconds.
  - `Stop`: Stop playback.
- **Color Keys:**
  - 🔴 **Red Button (`ColorF0Red`):** Toggle the **TizeOSN Settings Menu**.
  - 🟢 **Green Button (`ColorF1Green`):** Quick on-screen AdBlock statistics toast.
  - 🟡 **Yellow Button (`ColorF2Yellow`):** Cycle playback speeds ($0.75\times$, $1.0\times$, $1.25\times$, $1.5\times$, $2.0\times$).
  - 🔵 **Blue Button (`ColorF3Blue`):** Force manual trigger of skip buttons on screen.
  - ↩ **Return / Back:** Dismiss menus or return to the previous view.

### 🌍 Bilingual Interface (العربية & English)
- Native Arabic (`ar`) and English (`en`) support for all menus, toasts, and key legends.
- Automatically synchronizes with your OSN+ or Samsung TV language setting.

### 📺 10-Foot TV On-Screen Display (OSD)
- Beautiful blurred dark overlay menu designed for comfortable viewing on 1080p and 4K TV screens.
- Live counter of blocked advertisements.
- Unobtrusive corner toast notifications.

---

## 🚀 How to Launch via TizenBrew

TizenBrew is a homebrew loader and package manager for Samsung Tizen TVs that allows sideloading modules without repeatedly building `.wgt` packages in Tizen Studio.

### Prerequisites:
1. Ensure **TizenBrew** is installed on your Samsung TV (see the [TizenBrew Repository](https://github.com/reisxd/TizenBrew)).

### Steps:
1. Open **TizenBrew** on your TV.
2. Press the **🟢 Green Button** on your remote (or select **Module Manager** in the header).
3. Scroll to the right and select the tile named **Add GitHub Module**.
4. In the text input (`Module Name (For gh):`), enter:
   ```text
   iHosam/TizeOSN@main
   ```
   *(Note: Do **not** type `gh/`, as TizenBrew automatically adds the prefix).*
5. Press **Done / Enter** on your TV's on-screen keyboard.
6. Return to the **Home** screen and launch **TizeOSN**!

> **Tip:** You can set TizeOSN to **Auto-Launch** inside TizenBrew Settings so that opening TizenBrew automatically starts OSN+.

---

## 🛠️ Project Structure

```text
TizeOSN/
├── package.json              # TizenBrew module manifest & NPM dependencies
├── rollup.config.js          # Rollup bundler configuration
├── dist/
│   └── userScript.js         # Compiled self-contained injection script
├── mods/                     # Source modules
│   ├── userScript.js         # Main entry point & initialization
│   ├── config.js             # LocalStorage settings manager
│   ├── features/
│   │   ├── adblock.js        # Multi-layer ad-blocking engine
│   │   ├── autoSkip.js       # Auto-skip intro/recap/credits
│   │   ├── spatialNav.js     # TV remote keycodes & D-pad navigation
│   │   ├── playbackControl.js# Playback speed & quality controllers
│   │   └── userAgentSpoofing.js# Tizen TV compatibility layer
│   ├── ui/
│   │   ├── settings.js       # TV modal settings dialog
│   │   ├── osd.js            # On-screen notifications / toasts
│   │   └── styles.js         # Injected CSS stylesheet
│   └── translations/
│       ├── en.js             # English translation strings
│       ├── ar.js             # Arabic translation strings
│       └── index.js          # Language detection & resolution
└── standalone/               # Standalone Tizen packaging files
    ├── config.xml            # Tizen Web Application widget configuration
    ├── index.html            # Standalone launcher & key registration
    └── icon.png              # App icon
```

---

## 💻 Building from Source

To modify, customize, or build the bundle yourself:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iHosam/TizeOSN.git
   cd TizeOSN
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile the bundle:**
   ```bash
   npm run build
   ```
   The compiled script will be written to `dist/userScript.js`.

4. **Watch mode (for active development):**
   ```bash
   npm run watch
   ```

---

## 📦 Standalone Installation (Alternative to TizenBrew)

If you prefer building a standalone Tizen `.wgt` package using Tizen Studio:

1. Open **Tizen Studio**.
2. Select **File > Import > Tizen Project**.
3. Point to the `standalone/` directory.
4. Ensure your Samsung TV Certificate Profile is configured.
5. Right-click the project and select **Build Signed Package**.
6. Sideload the generated `.wgt` onto your TV using the Tizen Device Manager CLI (`tizen install -n TizeOSN.wgt -t <DeviceID>`).

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0). See the [LICENSE](LICENSE) file for details.

*Disclaimer: TizeOSN is an independent open-source project and is not affiliated with, endorsed by, or sponsored by OSN, OSN+, or Samsung Electronics.*
