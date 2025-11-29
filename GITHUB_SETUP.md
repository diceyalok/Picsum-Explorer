# GitHub Setup Guide

Follow these steps to push your Picsum Explorer project to GitHub.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Repository name: `picsum-explorer` (or your preferred name)
5. Description: `Beautiful React gallery app with infinite scroll, masonry layout, and ambient focus mode`
6. Choose **Public** (or Private if you prefer)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **"Create repository"**

## Step 2: Initialize Git (if not already done)

```bash
# Navigate to your project directory
cd usestate

# Initialize git repository (if not already initialized)
git init

# Check current status
git status
```

## Step 3: Stage and Commit Your Files

```bash
# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Picsum Explorer with infinite scroll, masonry layout, blur-up loading, and ambient focus mode"

# Check commit was created
git log --oneline
```

## Step 4: Connect to GitHub Remote

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/picsum-explorer.git

# Verify remote was added
git remote -v
```

## Step 5: Push to GitHub

```bash
# Push to main branch (or master if that's your default)
git branch -M main
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or use SSH: `git remote set-url origin git@github.com:YOUR_USERNAME/picsum-explorer.git`

## Step 6: Set Up GitHub Pages (Optional - for hosting)

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select **"Deploy from a branch"**
5. Choose **main** branch and **/root** folder
6. Click **Save**
7. Your site will be available at: `https://YOUR_USERNAME.github.io/picsum-explorer/`

### Update Vite Config for GitHub Pages

Add this to `vite.config.js`:

```javascript
export default {
  base: '/picsum-explorer/', // Replace with your repo name
  // ... rest of config
}
```

## Step 7: Add Repository Topics (Optional)

On your GitHub repository page:
1. Click the gear icon next to "About"
2. Add topics: `react`, `vite`, `tailwindcss`, `gallery`, `photography`, `infinite-scroll`, `masonry-layout`

## Step 8: Update README Badges (Optional)

If you want to add badges, update the first line of README.md:

```markdown
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/picsum-explorer?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/picsum-explorer?style=social)
```

## Troubleshooting

### Authentication Issues
If you have trouble pushing:
```bash
# Use GitHub CLI (recommended)
gh auth login

# Or configure Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Large Files
If you have large files:
```bash
# Remove node_modules from git if accidentally added
git rm -r --cached node_modules
echo "node_modules/" >> .gitignore
git commit -m "Remove node_modules from git"
```

### Update Remote URL
If you need to change the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git
```

## Next Steps After Pushing

1. **Add a license file** (MIT License recommended)
2. **Enable Issues** in repository settings
3. **Create a `.github/workflows` folder** for CI/CD (optional)
4. **Add screenshots** to README for better presentation
5. **Create releases** when you make significant updates

## Continuous Deployment

Consider setting up automatic deployment:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Connect your GitHub repo for automatic deployments
- **GitHub Actions**: Set up CI/CD workflows

---

🎉 **Congratulations!** Your project is now on GitHub!

