import { useEffect, useRef, useState, useCallback } from 'react'

// Generate brown/pink noise for softer, more ambient sound
const generateAmbientNoise = (audioContext) => {
  const bufferSize = audioContext.sampleRate * 2
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const output = noiseBuffer.getChannelData(0)

  // Generate brown noise (integrated white noise) - much softer than white noise
  let lastOut = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    // Brown noise: integrate (low-pass filter effect)
    lastOut = (lastOut + white * 0.02) * 0.98
    output[i] = lastOut * 3.5 // Scale to reasonable level
  }

  const noiseSource = audioContext.createBufferSource()
  noiseSource.buffer = noiseBuffer
  noiseSource.loop = true

  // Main gain node with smooth fade-in
  const gainNode = audioContext.createGain()
  gainNode.gain.value = 0 // Start at 0 for smooth fade-in
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 1.5) // Very low, ambient volume

  // First filter: Low-pass to remove harsh high frequencies
  const lowPassFilter = audioContext.createBiquadFilter()
  lowPassFilter.type = 'lowpass'
  lowPassFilter.frequency.value = 800 // Lower cutoff for softer sound
  lowPassFilter.Q.value = 1

  // Second filter: High-shelf to further soften high frequencies
  const highShelfFilter = audioContext.createBiquadFilter()
  highShelfFilter.type = 'highshelf'
  highShelfFilter.frequency.value = 600
  highShelfFilter.gain.value = -12 // Reduce high frequencies

  // Connect the audio chain
  noiseSource.connect(lowPassFilter)
  lowPassFilter.connect(highShelfFilter)
  highShelfFilter.connect(gainNode)

  return { source: noiseSource, gain: gainNode }
}

const useAmbientAudio = (enabled, type = 'white-noise', preInitializedContext = null) => {
  const audioContextRef = useRef(null)
  const sourceRef = useRef(null)
  const gainRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState(null)

  // Use pre-initialized context if provided, otherwise create new one
  const initAudioContext = useCallback(async () => {
    // Use pre-initialized context if available
    if (preInitializedContext) {
      audioContextRef.current = preInitializedContext
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      return audioContextRef.current
    }

    if (audioContextRef.current) {
      // If context exists but is closed, create a new one
      if (audioContextRef.current.state === 'closed') {
        audioContextRef.current = null
      } else {
        // Resume if suspended
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        return audioContextRef.current
      }
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) {
        throw new Error('Web Audio API not supported')
      }

      audioContextRef.current = new AudioContextClass()
      
      // Resume if suspended (required by browser autoplay policies)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      return audioContextRef.current
    } catch (error) {
      console.error('Failed to initialize audio context:', error)
      setAudioError(error.message)
      return null
    }
  }, [preInitializedContext])

  // Start audio playback
  const startAudio = useCallback(async () => {
    try {
      const audioContext = await initAudioContext()
      if (!audioContext) {
        setAudioError('Could not initialize audio')
        return false
      }

      // Ensure context is running
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      // Stop existing source if any
      if (sourceRef.current) {
        try {
          sourceRef.current.stop()
        } catch (e) {
          // Source might already be stopped
        }
        sourceRef.current = null
      }

      if (gainRef.current) {
        gainRef.current.disconnect()
        gainRef.current = null
      }

      // Generate and start ambient noise
      const { source, gain } = generateAmbientNoise(audioContext)
      sourceRef.current = source
      gainRef.current = gain

      gain.connect(audioContext.destination)
      source.start(0)
      
      setIsPlaying(true)
      setAudioError(null)
      return true
    } catch (error) {
      console.error('Failed to start audio:', error)
      setAudioError(error.message)
      setIsPlaying(false)
      return false
    }
  }, [initAudioContext])

  // Stop audio playback with smooth fade-out
  const stopAudio = useCallback(() => {
    setIsPlaying(false) // Update state immediately
    
    if (gainRef.current && audioContextRef.current) {
      try {
        const currentTime = audioContextRef.current.currentTime
        // Smooth fade-out over 0.5 seconds
        gainRef.current.gain.cancelScheduledValues(currentTime)
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, currentTime)
        gainRef.current.gain.linearRampToValueAtTime(0, currentTime + 0.5)
        
        // Stop source after fade-out completes
        setTimeout(() => {
          if (sourceRef.current) {
            try {
              sourceRef.current.stop()
            } catch (error) {
              // Source might already be stopped
            }
            sourceRef.current = null
          }
          if (gainRef.current) {
            gainRef.current.disconnect()
            gainRef.current = null
          }
        }, 600)
        return
      } catch (error) {
        // If fade-out fails, stop immediately
      }
    }
    
    // Immediate stop fallback
    if (sourceRef.current) {
      try {
        sourceRef.current.stop()
      } catch (error) {
        // Source might already be stopped
      }
      sourceRef.current = null
    }
    
    if (gainRef.current) {
      gainRef.current.disconnect()
      gainRef.current = null
    }
  }, [])

  // Effect to handle enabled state changes
  useEffect(() => {
    if (enabled) {
      // Start audio when enabled
      startAudio()
    } else {
      // Stop audio when disabled
      stopAudio()
    }

    return () => {
      if (!enabled) {
        stopAudio()
      }
    }
  }, [enabled, startAudio, stopAudio])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio()
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
        audioContextRef.current = null
      }
    }
  }, [stopAudio])

  const setVolume = useCallback((volume) => {
    if (gainRef.current) {
      gainRef.current.gain.value = Math.max(0, Math.min(1, volume))
    }
  }, [])

  return { isPlaying, setVolume, audioError }
}

export default useAmbientAudio
