# Quick Start Guide

## For Developers

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## For GitHub Setup

1. Create a new repository on GitHub
2. Run the commands from `GITHUB_SETUP.md`
3. Or use the quick commands below:

```bash
# Initialize and push (replace YOUR_USERNAME)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/picsum-explorer.git
git push -u origin main
```

## Project Features Checklist

✅ Infinite scroll  
✅ Masonry/Pinterest layout  
✅ Blur-up image loading  
✅ Component-based architecture  
✅ Ambient focus mode  
✅ Auto-sliding carousel  
✅ Ambient audio (brown noise)  
✅ Smooth animations  
✅ Responsive design  
✅ Performance optimizations  

## Key Files

- `src/App.jsx` - Main app component
- `src/components/AmbientMode.jsx` - Focus mode feature
- `src/hooks/useAmbientAudio.js` - Audio generation
- `README.md` - Full documentation
- `GITHUB_SETUP.md` - GitHub deployment guide

## Need Help?

Check the main `README.md` for detailed documentation and feature explanations.

