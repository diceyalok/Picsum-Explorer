# Picsum Explorer

A beautiful, immersive React gallery app for browsing Lorem Picsum's photography collection. Features infinite scroll, masonry layout, blur-up image loading, and an ambient focus mode with auto-sliding carousel and ambient audio.

![Picsum Explorer](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?logo=tailwind-css)

## ✨ Features

### 🖼️ Core Gallery Features
- **Infinite Scroll** – Automatically loads more images as you scroll down
- **Masonry/Pinterest Layout** – Staggered grid that adapts to different image sizes
- **Blur-Up Image Loading** – Unsplash-style progressive image loading with blur placeholders
- **Responsive Design** – Works seamlessly on mobile, tablet, and desktop
- **Component-Based Architecture** – Clean, maintainable, and reusable code structure

### 🎨 Visual Experience
- **Cream Aesthetic** – Warm gradients, Playfair/Inter typography, and soft shadows
- **Fluid Typography** – Responsive text scaling using CSS `clamp()` variables
- **Smooth Animations** – Elegant transitions and hover effects throughout
- **Loading States** – Beautiful skeleton loaders and spinners

### 🎧 Ambient Focus Mode
- **Immersive Fullscreen** – Distraction-free viewing experience
- **Auto-Sliding Carousel** – Images automatically advance every 8 seconds
- **Smooth Fade Transitions** – Elegant 2-second crossfades between images
- **Ambient Audio** – Soft brown noise background audio for focus
- **Dimmed UI** – Background gallery fades when focus mode is active
- **Keyboard Shortcuts** – Press `ESC` to exit focus mode

### ⚡ Performance Optimizations
- **Image Preloading** – Next images preload for seamless transitions
- **Lazy Loading** – Images load only when needed
- **Blur-Up Technique** – Small thumbnails load first, then full-quality images
- **Intersection Observer** – Efficient infinite scroll implementation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/picsum-explorer.git
cd picsum-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
src/
├─ App.jsx                 # Main application component
├─ main.jsx                # React entry point
├─ index.css               # Global styles, Tailwind imports, custom CSS
├─ components/
│  ├─ Card.jsx             # Image card component
│  ├─ Header.jsx           # Page header component
│  ├─ MasonryGrid.jsx      # Masonry layout wrapper
│  ├─ LoadingSpinner.jsx   # Reusable loading spinner
│  ├─ EndOfGallery.jsx     # End of list indicator
│  ├─ BlurImage.jsx        # Blur-up image component
│  ├─ AmbientMode.jsx      # Ambient focus mode container
│  ├─ AmbientModeToggle.jsx # Focus mode toggle button
│  └─ AmbientCarousel.jsx  # Auto-sliding carousel
├─ hooks/
│  ├─ usePicsumData.js     # Data fetching logic
│  ├─ useInfiniteScroll.js # Infinite scroll implementation
│  ├─ useBlurImage.js      # Blur-up image loading logic
│  └─ useAmbientAudio.js   # Ambient audio generation
└─ assets/                 # Static assets
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19.1.1 + Vite 7.1.7 |
| **Styling** | Tailwind CSS 4.1.17 (utility-first) |
| **Layout** | react-masonry-css 1.0.16 |
| **HTTP Client** | Axios 1.13.2 |
| **Audio** | Web Audio API (native) |
| **Code Quality** | ESLint 9 with React Hooks + React Refresh |

## 🎯 Key Features Explained

### Infinite Scroll
Uses Intersection Observer API to detect when the user scrolls near the bottom of the page. Automatically fetches and appends the next page of images seamlessly.

### Masonry Layout
Pinterest-style staggered grid that arranges images optimally based on their natural aspect ratios. Responsive breakpoints:
- 4 columns on large screens (>1200px)
- 3 columns on medium screens (768px-1200px)
- 2 columns on tablets (500px-768px)
- 1 column on mobile (<500px)

### Blur-Up Image Loading
Implements the Unsplash blur-up technique:
1. Small 40px thumbnail loads instantly
2. Blurred placeholder displays immediately
3. Full-resolution image fades in when loaded
4. Smooth transitions for better perceived performance

### Ambient Focus Mode
Transform your gallery into a digital art frame:
- **Dimmed Background** – Main gallery fades to 30% opacity
- **Fullscreen Overlay** – Immersive viewing experience
- **Auto-Slide** – Images change every 8 seconds automatically
- **Fade Animations** – Smooth 2-second crossfades
- **Ambient Audio** – Soft brown noise for focus (low volume, filtered)
- **Progress Indicator** – Visual dots showing current position

### Component Architecture
Clean separation of concerns:
- **Custom Hooks** – Business logic (data fetching, infinite scroll, audio)
- **UI Components** – Presentational components (Header, Card, Spinner)
- **Feature Components** – Complete features (AmbientMode, MasonryGrid)

## 🎨 Design System

### Colors
- **Primary Background**: Cream tones (`#fdfcf7`, `#fffdf4`)
- **Accent Color**: Amber (`#f59e0b`, `#d97706`)
- **Text**: Slate grays (`#0f172a`, `#475569`)
- **Ambient Mode**: Dark slate (`#020617`)

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Fluid Scaling**: CSS `clamp()` for responsive typography

### Spacing
- Consistent 8px base unit
- Responsive padding and margins
- Flexible gutters in masonry grid

## 🔧 Configuration

### Customizing Ambient Mode
Edit `src/components/AmbientCarousel.jsx`:
```javascript
slideInterval={8000}  // Time between slides (ms)
fadeDuration={2000}   // Fade transition duration (ms)
```

### Adjusting Audio
Edit `src/hooks/useAmbientAudio.js`:
```javascript
gainNode.gain.linearRampToValueAtTime(0.08, ...)  // Volume (0-1)
lowPassFilter.frequency.value = 800                // Filter frequency (Hz)
```

### Masonry Breakpoints
Edit `src/components/MasonryGrid.jsx`:
```javascript
const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  768: 2,
  500: 1
}
```

## 📡 API Reference

Uses the [Lorem Picsum API](https://picsum.photos/):

### Endpoint
```
GET https://picsum.photos/v2/list?page={page}&limit=20
```

### Response
```json
[
  {
    "id": "0",
    "author": "Alejandro Escamilla",
    "width": 5616,
    "height": 3744,
    "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
    "download_url": "https://picsum.photos/id/0/5616/3744"
  }
]
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Ambient audio requires browser support for Web Audio API. Some browsers may require user interaction before audio can play (handled automatically).

## 📝 Development

### Code Style
- ESLint configuration included
- React Hooks best practices
- Functional components only
- Custom hooks for reusable logic

### Adding New Features
1. Create components in `src/components/`
2. Create hooks in `src/hooks/` for business logic
3. Follow existing component patterns
4. Update this README with new features

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Build Output
The `npm run build` command creates an optimized production build in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Lorem Picsum](https://picsum.photos/) for the free photography API
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) teams
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ using React and Vite
