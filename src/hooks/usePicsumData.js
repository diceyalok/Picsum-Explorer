import { useState, useCallback, useRef, useEffect } from 'react'
import axios from 'axios'

const usePicsumData = () => {
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)

  const getData = useCallback(async (page, append = false) => {
    try {
      if (append) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      )

      if (response.data.length === 0) {
        setHasMore(false)
      } else {
        if (append) {
          setUserData((prev) => [...prev, ...response.data])
        } else {
          setUserData(response.data)
        }
        setHasMore(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [])

  const loadNextPage = useCallback(() => {
    if (!isLoadingMore && !isLoading && hasMore) {
      pageRef.current += 1
      getData(pageRef.current, true)
    }
  }, [isLoadingMore, isLoading, hasMore, getData])

  // Initial load
  useEffect(() => {
    getData(1, false)
    pageRef.current = 1
  }, [getData])

  return {
    userData,
    isLoading,
    isLoadingMore,
    hasMore,
    loadNextPage
  }
}

export default usePicsumData

