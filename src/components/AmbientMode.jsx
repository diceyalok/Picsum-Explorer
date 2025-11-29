import React, { useEffect } from 'react'
import AmbientCarousel from './AmbientCarousel'
import useAmbientAudio from '../hooks/useAmbientAudio'

const AmbientMode = ({ isActive, items, onExit, audioContext }) => {
  const { isPlaying, audioError } = useAmbientAudio(isActive, 'white-noise', audioContext)

  // Prevent body scroll when ambient mode is active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('ambient-mode-active')
      
      // Try to enter fullscreen if supported (requires user gesture, so may not work immediately)
      const tryFullscreen = async () => {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          try {
            await document.documentElement.requestFullscreen()
          } catch (error) {
            // User denied fullscreen or not supported - that's okay
          }
        }
      }
      
      // Small delay to ensure user interaction context
      setTimeout(tryFullscreen, 100)
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('ambient-mode-active')
      
      // Exit fullscreen if active
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('ambient-mode-active')
    }
  }, [isActive])

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isActive) return

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onExit()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isActive, onExit])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-40 bg-slate-950">
      <AmbientCarousel items={items} slideInterval={8000} fadeDuration={2000} />
      
      {/* Exit button overlay */}
      <button
        onClick={onExit}
        className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
        aria-label="Exit Focus Mode"
        title="Press ESC to exit"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Audio indicator */}
      {isPlaying && (
        <div className="absolute top-6 left-6 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
          <svg
            className="w-4 h-4 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
          <span>Ambient Audio</span>
        </div>
      )}
      {audioError && (
        <div className="absolute top-6 left-6 z-50 flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-xs text-red-300 backdrop-blur-sm">
          <span>Audio unavailable</span>
        </div>
      )}
    </div>
  )
}

export default AmbientMode

