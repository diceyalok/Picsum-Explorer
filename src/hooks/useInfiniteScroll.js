import { useRef, useCallback } from 'react'

const useInfiniteScroll = ({ isLoading, isLoadingMore, hasMore, loadNextPage }) => {
  const observerTarget = useRef(null)

  const lastCardElementRef = useCallback(
    (node) => {
      if (isLoadingMore || isLoading) return
      if (observerTarget.current) observerTarget.current.disconnect()

      observerTarget.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
            loadNextPage()
          }
        },
        { threshold: 0.1 }
      )

      if (node) observerTarget.current.observe(node)
    },
    [isLoadingMore, isLoading, hasMore, loadNextPage]
  )

  return lastCardElementRef
}

export default useInfiniteScroll

