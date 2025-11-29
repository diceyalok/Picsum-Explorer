import React, { useState, useRef } from 'react'
import Header from './components/Header'
import MasonryGrid from './components/MasonryGrid'
import LoadingSpinner from './components/LoadingSpinner'
import EndOfGallery from './components/EndOfGallery'
import AmbientModeToggle from './components/AmbientModeToggle'
import AmbientMode from './components/AmbientMode'
import usePicsumData from './hooks/usePicsumData'
import useInfiniteScroll from './hooks/useInfiniteScroll'

const App = () => {
  const [isAmbientMode, setIsAmbientMode] = useState(false)
  const audioInitRef = useRef(null)
  const { userData, isLoading, isLoadingMore, hasMore, loadNextPage } = usePicsumData()
  const lastCardRef = useInfiniteScroll({
    isLoading,
    isLoadingMore,
    hasMore,
    loadNextPage
  })

  const handleAudioInit = async () => {
    // Initialize audio context on user gesture (button click)
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (AudioContextClass) {
        const context = new AudioContextClass()
        if (context.state === 'suspended') {
          await context.resume()
        }
        // Store for use by the audio hook
        audioInitRef.current = context
      }
    } catch (error) {
      console.log('Audio initialization:', error)
    }
  }

  const handleToggleAmbientMode = () => {
    setIsAmbientMode((prev) => !prev)
  }

  const handleExitAmbientMode = () => {
    setIsAmbientMode(false)
  }

  return (
    <>
      <div className={`min-h-screen bg-[#fdfcf7] px-4 py-10 text-slate-900 transition-opacity duration-500 ${
        isAmbientMode ? 'opacity-30 pointer-events-none' : 'opacity-100'
      }`}>
        <div className='mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col gap-10'>
          <Header />

          <main className='flex-1 pb-32'>
            {isLoading ? (
              <LoadingSpinner message='Fetching fresh shots…' size='large' />
            ) : (
              <>
                <MasonryGrid items={userData} lastCardRef={lastCardRef} />
                {isLoadingMore && (
                  <LoadingSpinner message='Loading more shots…' size='small' />
                )}
                {!hasMore && userData.length > 0 && <EndOfGallery />}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Ambient Mode Toggle */}
      {!isLoading && userData.length > 0 && (
        <AmbientModeToggle
          isActive={isAmbientMode}
          onToggle={handleToggleAmbientMode}
          onAudioInit={handleAudioInit}
        />
      )}

      {/* Ambient Mode Overlay */}
      <AmbientMode
        isActive={isAmbientMode}
        items={userData}
        onExit={handleExitAmbientMode}
        audioContext={audioInitRef.current}
      />
    </>
  )
}

export default App