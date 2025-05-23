# GitHub Pages Deployment Guide for SolarMan Energy

Follow these steps to deploy your SolarMan Energy website to GitHub Pages:

## Step 1: Prepare Your Repository

1. Create a new GitHub repository (if you haven't already)
2. Make sure it's public if you want to use the free GitHub Pages hosting

## Step 2: Fix Path References

In your React application, ensure asset paths work with GitHub Pages:

1. If you're deploying to a subdirectory (e.g., `username.github.io/solarman-energy/`), update your `vite.config.ts` to include the base path:

```typescript
// vite.config.ts
export default defineConfig({
  // Add this line:
  base: '/solarman-energy/', // Replace with your repo name
  // Other config options...
})
```

2. Convert any absolute paths in your code to relative paths:
   - Change `/images/example.jpg` to `./images/example.jpg`
   - For assets imported in components, use import statements instead of absolute paths

## Step 3: Build the Project

Run the build command to create a production-ready version:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets.

## Step 4: Deploy to GitHub Pages

### Option 1: Manual Deployment

1. Copy the contents of the `dist` directory to the `public` directory
2. Push everything to your GitHub repository
3. Configure GitHub Pages in your repository settings to deploy from the `/public` directory

### Option 2: Automated Deployment with GitHub Actions

Create a `.github/workflows/deploy.yml` file with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: dist
```

## Step 5: Verify Your Deployment

After deployment, your site should be accessible at:
`https://yourusername.github.io/solarman-energy/`

## Troubleshooting

- If images or styles are missing, double-check relative paths
- Ensure the `.nojekyll` file exists in your deployment to prevent GitHub from processing your files with Jekyll
- Check that your repository is public and GitHub Pages is enabled in repository settings