import React, { useState, useEffect, useCallback } from 'react'

const AmbientCarousel = ({ items, slideInterval = 8000, fadeDuration = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState(new Set())

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  // Preload next few images
  useEffect(() => {
    if (items.length === 0) return

    const preloadIndices = [
      (currentIndex + 1) % items.length,
      (currentIndex + 2) % items.length,
      (currentIndex + 3) % items.length
    ]

    preloadIndices.forEach((idx) => {
      const item = items[idx]
      if (item && !loadedImages.has(item.id)) {
        const img = new Image()
        img.src = item.download_url
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, item.id]))
        }
      }
    })
  }, [currentIndex, items, loadedImages])

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]))
  }

  useEffect(() => {
    if (items.length === 0) return

    const interval = setInterval(nextSlide, slideInterval)

    return () => clearInterval(interval)
  }, [items.length, slideInterval, nextSlide])

  if (items.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <p className="text-slate-400">No images available</p>
      </div>
    )
  }


  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {items.map((item, index) => {
        const isActive = index === currentIndex
        const isNext = index === (currentIndex + 1) % items.length

        return (
          <div
            key={`${item.id}-${index}`}
            className={`absolute inset-0 transition-opacity duration-[${fadeDuration}ms] ease-in-out ${
              isActive ? 'opacity-100 z-10' : isNext ? 'opacity-0 z-0' : 'opacity-0 z-0'
            }`}
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${fadeDuration}ms ease-in-out`
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-8">
              <div className="relative h-full w-full max-w-7xl flex items-center justify-center">
                <img
                  src={item.download_url}
                  alt={`${item.author} - Focus Mode`}
                  width={item.width}
                  height={item.height}
                  onLoad={() => handleImageLoad(item.id)}
                  className="max-h-full max-w-full object-contain"
                  style={{
                    opacity: loadedImages.has(item.id) ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
                {!loadedImages.has(item.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white/60"></div>
                  </div>
                )}
              </div>
            </div>
            {/* Subtle overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-slate-950/80 via-slate-950/40 to-transparent p-8 pointer-events-none">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xl font-semibold text-white/90 mb-2">{item.author}</p>
                <p className="text-sm text-white/60">
                  {item.width} × {item.height}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Progress indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {items.slice(0, Math.min(items.length, 10)).map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-amber-400'
                  : 'w-1 bg-white/30'
              }`}
            />
          ))}
          {items.length > 10 && (
            <span className="ml-2 text-xs text-white/50">+{items.length - 10}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AmbientCarousel

