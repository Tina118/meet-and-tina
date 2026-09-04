# Meet & Tina 💍

A playful, romantic engagement website — a little gift, made with love. 💛

## Run it

```bash
cd meet-and-tina
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

To build a shareable version: `npm run build` (output goes to `dist/`).

## How to personalise it 💕

Everything is easy to edit — no coding experience needed for the basics.

### 1. Add your photos
- Drop image files into the **`public/`** folder (e.g. `public/us-1.jpg`).
- In `src/App.jsx`, find a placeholder like:
  ```jsx
  <ImagePlaceholder label="us-1" className="g-photo" />
  ```
  and replace it with:
  ```jsx
  <img src="/us-1.jpg" alt="us" className="g-photo" />
  ```
- The photo `label`s to look for: `the-day-we-met`, `first-adventure`, `home-is-you`,
  `forever`, `us-1`…`us-6`, `the-big-moment`, `the-yes-moment`.

### 2. Add your romantic song 🎵
- Put an mp3 in `public/` and name it **`romantic-song.mp3`**.
- The music button (bottom-right) plays it on a loop.
- Until you add one, it plays a soft, generated love tune so there's music from the start.

### 3. Edit the words
- Open `src/App.jsx` and edit the `STORY`, `REASONS`, and `NAMES` at the top.

## The fun bits
- 💛 Floating hearts drift up the whole page
- 🎵 A romantic song player (bottom-right)
- 💍 A playful proposal where the **"No"** button runs away and **"Yes"** grows
- 🎉 A confetti celebration when the answer is yes

Made with 💛.
