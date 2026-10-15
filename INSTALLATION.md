# 📺 TizeOSN Installation & Setup Guide

This guide walks you through setting up **TizeOSN** on your Samsung Smart TV running Tizen OS.

---

## 1. Understanding How TizeOSN Works

TizeOSN is built as a **Site Modification Module** (`packageType: "mods"`) for **TizenBrew**.
Instead of requiring you to install a complex new native TV app every time you want an update, TizenBrew loads OSN+ in your TV's browser environment and automatically injects TizeOSN's script (`dist/userScript.js`).

This enables:
- Seamless ad-blocking without root access.
- Easy remote key integration (Samsung Smart Remote).
- Automatic updates directly from GitHub.

---

## 2. Installing via TizenBrew (Recommended)

### Step 1: Open TizenBrew on your Samsung Smart TV
Ensure you have the latest version of TizenBrew installed and running on your TV. If you need to install TizenBrew, refer to the [TizenBrew Repository](https://github.com/reisxd/TizenBrew) or use the [TizenBrewInstaller](https://github.com/reisxd/TizenBrewInstaller).

### Step 2: Navigate to Module Manager
1. In the TizenBrew main menu, press the **🟢 Green Button** on your remote control (or navigate to **Module Manager** in the top bar).

### Step 3: Select "Add GitHub Module"
1. Scroll past any existing modules to the action tiles at the end.
2. Click on the tile titled **Add GitHub Module** (do **not** select Add NPM Module).

### Step 4: Enter the Repository Name
In the text box labeled `Module Name (For gh):`, type:
```text
iHosam/TizeOSN@main
```
*(Important: Do **NOT** prefix it with `gh/`. TizenBrew already handles the `gh/` prefix when you select the GitHub tile).*

3. Press **Done / Enter** on your TV's virtual keyboard.
4. TizenBrew will register `gh/iHosam/TizeOSN@main` and navigate back to the module list.

### Step 5: Launch TizeOSN
1. Return to the TizenBrew **Home** screen.
2. Select the **TizeOSN (1.0.0)** tile and press Enter.
3. OSN+ will launch with full ad-blocking and enhancements activated!

---

## 3. Configuring Auto-Launch (Optional)

If you use OSN+ regularly and want TizenBrew to jump straight into TizeOSN when opened:

1. Open **TizenBrew**.
2. Go to **Settings**.
3. Select **Auto-Launch Module**.
4. Choose **TizeOSN**.
5. Save your settings. Now, launching TizenBrew immediately opens ad-free OSN+!

---

## 4. Remote Control Shortcuts

| Remote Key | Function in TizeOSN |
| :--- | :--- |
| **Red Button** (`ColorF0Red`) | Open/Close **TizeOSN Settings Menu** |
| **Green Button** (`ColorF1Green`) | Show live **AdBlock statistics** & blocked counter toast |
| **Yellow Button** (`ColorF2Yellow`) | Cycle **Playback Speed** ($1.0\times \to 1.25\times \to 1.5\times \to 2.0\times \to 0.75\times$) |
| **Blue Button** (`ColorF3Blue`) | Force-click active **Skip button** on screen |
| **Play / Pause** | Toggle video playback |
| **Fast Forward** | Seek forward 10 seconds |
| **Rewind** | Seek backward 10 seconds |
| **Return / Back** | Close Settings Menu or navigate backward |

---

## 5. Testing Locally (In Browser or Emulator)

You can test TizeOSN on your PC browser (Chrome / Edge / Firefox) before pushing to your TV:

1. Install a userscript manager like **Violentmonkey** or **Tampermonkey**.
2. Create a new userscript with the following header:
   ```javascript
   // ==UserScript==
   // @name         TizeOSN Test
   // @namespace    https://github.com/halha/TizeOSN
   // @match        https://osnplus.com/*
   // @match        https://www.osnplus.com/*
   // @run-at       document-start
   // @grant        none
   // ==/UserScript==
   ```
3. Copy the compiled code from `dist/userScript.js` into the userscript.
4. Open [osnplus.com](https://osnplus.com).
5. You will see the **🛡️ TizeOSN** badge on the bottom-right corner and notifications when ads are blocked!

---

## 6. Troubleshooting

- **Ads are still appearing:**
  - Open TizeOSN Settings (press the **Red** remote button or click the shield badge) and verify that **Block Video Ads & Commercials** is set to **ON**.
  - Refresh the page using the **Reload OSN+** option in the settings menu.

- **Remote keys not responding:**
  - Make sure TizenBrew has granted the `tvinputdevice` privilege.
  - Restart the TizenBrew app on your TV.

- **Audio/Video out of sync:**
  - Cycle the playback speed back to **1.0x** using the Yellow remote button.
