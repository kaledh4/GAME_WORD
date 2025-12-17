# Arabic Wordle Game - Workflow and Deployment Guide

## Branch Structure

This repository uses two main branches:
- `main` - The primary branch for development and production deployment
- `master` - Legacy branch (will be removed in future)

## GitHub Actions Workflow

The project is configured with GitHub Actions for automated deployment to GitHub Pages.

### Current Workflow (`main` branch)

1. **Trigger**: Any push or pull request to the `main` branch
2. **Build Process**:
   - Setup Node.js environment (v18)
   - Install dependencies with `npm ci`
   - Build the React application with `npm run build`
3. **Deployment**:
   - Deploy to GitHub Pages using `actions/deploy-pages@v4`

### Configuration Files

- Workflow file: `.github/workflows/deploy.yml`
- Build command: `npm run build`
- Output directory: `./build`

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Getting Started
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts
- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Removes the single build dependency

## Deployment Process

1. Make changes on the `main` branch
2. Push changes to GitHub
3. GitHub Actions automatically builds and deploys to GitHub Pages
4. Visit https://kaledh4.github.io/GAME_WORD/ to see the live site

## Git Configuration

The repository is configured with the following user information:
- Username: `kaledh4`
- Email: `kaled.h4@gmail.com`

## Troubleshooting

### Common Issues
1. **Deployment Failures**: Check the GitHub Actions logs in the repository's Actions tab
2. **Build Errors**: Ensure all dependencies are properly installed with `npm ci`
3. **Styling Issues**: Verify Tailwind CSS is properly configured

### Branch Management
To switch between branches:
```bash
# Switch to main branch
git checkout main

# View all branches
git branch
```

## Contributing

1. Create a new branch from `main` for your feature
2. Make your changes
3. Commit and push your changes
4. Create a Pull Request to merge into `main`

## Contact

For questions or support, contact:
- GitHub: kaledh4
- Email: kaled.h4@gmail.com