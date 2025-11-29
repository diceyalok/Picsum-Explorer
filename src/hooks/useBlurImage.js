import { useState, useEffect } from 'react'

const useBlurImage = (downloadUrl, id, width, height) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false)

  // Generate a small thumbnail placeholder (using Picsum API)
  // Calculate aspect ratio to maintain proportions
  const aspectRatio = width && height ? width / height : 1
  const placeholderWidth = 40
  const placeholderHeight = Math.round(placeholderWidth / aspectRatio)
  const placeholderUrl = `https://picsum.photos/id/${id}/${placeholderWidth}/${placeholderHeight}`

  useEffect(() => {
    // Reset states when image changes
    setImageLoaded(false)
    setPlaceholderLoaded(false)

    // Load placeholder first (small thumbnail)
    const placeholderImg = new Image()
    placeholderImg.onload = () => {
      setPlaceholderLoaded(true)
    }
    placeholderImg.onerror = () => {
      // Fallback: still show placeholder even if it fails
      setPlaceholderLoaded(true)
    }
    placeholderImg.src = placeholderUrl

    // Then load full image
    const fullImg = new Image()
    fullImg.onload = () => {
      setImageLoaded(true)
    }
    fullImg.onerror = () => {
      // If full image fails, keep showing placeholder
      setImageLoaded(false)
    }
    fullImg.src = downloadUrl

    return () => {
      placeholderImg.onload = null
      placeholderImg.onerror = null
      fullImg.onload = null
      fullImg.onerror = null
    }
  }, [downloadUrl, placeholderUrl, id])

  return {
    imageLoaded,
    placeholderLoaded,
    placeholderUrl,
    aspectRatio
  }
}

export default useBlurImage

