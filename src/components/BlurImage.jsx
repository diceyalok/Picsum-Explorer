import React from 'react'
import useBlurImage from '../hooks/useBlurImage'

const BlurImage = ({ src, id, alt, width, height, className = '' }) => {
  const { imageLoaded, placeholderLoaded, placeholderUrl } = useBlurImage(
    src,
    id,
    width,
    height
  )

  return (
    <div className={`relative ${className} w-full overflow-hidden`}>
      {/* Skeleton loader - shown while placeholder loads */}
      {!placeholderLoaded && (
        <div 
          className='w-full bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 animate-pulse' 
          style={{ 
            minHeight: '300px',
            aspectRatio: width && height ? `${width} / ${height}` : undefined
          }}
        >
          <div className='w-full h-full bg-amber-200/20' />
        </div>
      )}

      {/* Blurred placeholder layer */}
      {placeholderLoaded && (
        <img
          src={placeholderUrl}
          alt=""
          aria-hidden="true"
          width={width}
          height={height}
          className="w-full h-auto object-cover absolute inset-0"
          style={{
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            transition: 'opacity 0.7s ease-in-out',
            opacity: imageLoaded ? 0 : 1,
            zIndex: 1
          }}
        />
      )}

      {/* Full quality image layer */}
      {placeholderLoaded && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover relative"
          style={{
            transition: 'opacity 0.7s ease-in-out',
            opacity: imageLoaded ? 1 : 0,
            zIndex: 2
          }}
          loading="lazy"
        />
      )}
    </div>
  )
}

export default BlurImage

