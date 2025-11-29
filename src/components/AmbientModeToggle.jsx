import React from 'react'

const AmbientModeToggle = ({ isActive, onToggle, onAudioInit }) => {
  const handleClick = async () => {
    // Initialize audio context on user click (required by browser autoplay policies)
    // This must happen in the same event handler as the user gesture
    if (!isActive && onAudioInit) {
      await onAudioInit()
    }
    onToggle()
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 shadow-lg backdrop-blur-sm ${
        isActive
          ? 'bg-amber-500/90 text-white hover:bg-amber-600/90'
          : 'bg-white/80 text-slate-700 hover:bg-white/90 border border-slate-200'
      }`}
      aria-label={isActive ? 'Exit Ambient Mode' : 'Enter Ambient Mode'}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isActive ? (
          <path d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 8v4m0 4h.01" />
        )}
      </svg>
      <span className="hidden sm:inline">
        {isActive ? 'Exit Focus Mode' : 'Focus Mode'}
      </span>
    </button>
  )
}

export default AmbientModeToggle

