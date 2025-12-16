# خمن الكلمة 3.0 (Guess The Word 3.0)

This is a premium Arabic Wordle clone built with React, TypeScript, and Tailwind CSS.

## Features

- **Infinite Play**: Play as many times as you want with the "New Game" button.
- **Premium Design**: Glassmorphism, gradients, and smooth animations.
- **Mobile First**: Optimized for all screen sizes.
- **Smart Dictionary**: Includes a comprehensive list of 4-letter Arabic words.
- **Arabic Keyboard**: Full support for Arabic characters including Hamza variations.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)
1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. Visit your GitHub Pages URL once deployment completes

### Manual Deployment
If you prefer to deploy manually:
```bash
npm run deploy
```

### GitHub Pages Configuration
- The workflow is configured in `.github/workflows/deploy.yml`
- Builds the React app and deploys to GitHub Pages
- Automatically triggers on pushes to the `main` branch
- The deployed site will be available at: `https://kaledh4.github.io/GAME_WORD/`

## Credits

Based on the original Kalima/Wordle concepts, enhanced for a premium experience.
