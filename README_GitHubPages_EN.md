# Steven Leach Group — Interactive Fireworks Card

This is a ready-to-use interactive e-card website. Fireworks **burst where the cursor stops** (on touch devices: tap).

## Quick Start
1. Open `index.html` in a browser (double-click).
2. To preview via a local server (optional):
   ```bash
   python -m http.server 5173
   ```
   Then visit http://localhost:5173

## Customize
- Text: edit the headline and paragraph in `index.html`.
- Colors: tweak gradients in `style.css` or change the `palette` array in `script.js`.
- Logo: replace `assets/logo.png` with your own.
- Music: put your `bgm.mp3` into `assets/` and use the Play/Pause button.

## Deploy to GitHub Pages
1. Create a **public** repository on GitHub (e.g., `slg-fireworks-card`).
2. Upload all files (`index.html`, `style.css`, `script.js`, `assets/`).
3. Go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select **Branch**: `main` and **Folder**: `/ (root)`. Save.
6. Wait 1–2 minutes. A public URL like
   `https://<your-username>.github.io/slg-fireworks-card/`
   will appear. Share this link in your email.

## Notes
- Most browsers block auto-play audio. The user must click the Play button to start music.
- For best performance on older devices, reduce particle count in `script.js` (`n = 90 + Math.random()*50`).

Enjoy and happy holidays!
