# Deployment Guide

This document explains how Legend Player is deployed to GitHub Pages and how to create desktop app releases.

## GitHub Pages Deployment

### Automatic Deployment

The application automatically deploys to GitHub Pages when changes are pushed to the `main` or `master` branch.

**Workflow:** `.github/workflows/deploy.yml`

**Steps:**
1. Push changes to main/master branch
2. GitHub Actions builds the application
3. Deploys to GitHub Pages
4. Site is live at: https://anacondy.github.io/Legend-Player/

### Manual Deployment

You can also trigger deployment manually:
1. Go to Actions tab on GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### GitHub Pages Setup

Ensure GitHub Pages is enabled in repository settings:
1. Go to Settings > Pages
2. Source: GitHub Actions
3. Branch: gh-pages (automatically created)

## Desktop App Releases

### Creating a New Release

Desktop applications are built automatically when a new version tag is created.

**Steps:**

1. Update version in `package.json`:
```json
{
  "version": "5.1.0"
}
```

2. Commit the version change:
```bash
git add package.json
git commit -m "Bump version to 5.1.0"
git push
```

3. Create and push a tag:
```bash
git tag -a v5.1.0 -m "Release version 5.1.0"
git push origin v5.1.0
```

4. GitHub Actions will automatically:
   - Build apps for Windows, macOS, and Linux
   - Create a new release on GitHub
   - Upload all build artifacts

### Manual Build

To build desktop apps locally:

**For current platform:**
```bash
npm run electron-build
```

**For all platforms:**
```bash
npm run electron-build-all
```

Build outputs will be in `dist-electron/` directory.

### Platform-Specific Builds

**Windows only:**
```bash
npm run electron-build -- --win
```

**macOS only:**
```bash
npm run electron-build -- --mac
```

**Linux only:**
```bash
npm run electron-build -- --linux
```

## Build Configuration

The build configuration is in `package.json` under the `build` section:

- **Windows**: NSIS installer and portable executable
- **macOS**: DMG image and ZIP archive
- **Linux**: AppImage and DEB package

## Environment Variables

No environment variables are required for deployment. All configuration is in the repository files.

## Troubleshooting

### GitHub Pages not updating
- Check Actions tab for build errors
- Ensure GitHub Pages source is set to "GitHub Actions"
- Clear browser cache

### Desktop builds failing
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (18+ required)
- On macOS: May need to sign the app for distribution

### Build size too large
- Run `npm run build` and check bundle sizes
- Consider code splitting for large dependencies

## Performance Monitoring

After deployment, monitor:
- Page load times
- Bundle sizes in build output
- Lighthouse scores
- User feedback

## Rollback Procedure

If a deployment has issues:

1. Revert the problematic commit:
```bash
git revert <commit-hash>
git push
```

2. Or roll back to a previous tag:
```bash
git checkout v5.0.0
git tag -a v5.0.1 -m "Rollback to stable version"
git push origin v5.0.1
```

---

For questions about deployment, please open an issue on GitHub.
