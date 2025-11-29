import React from 'react'
import Masonry from 'react-masonry-css'
import Card from './Card'

const MasonryGrid = ({ items, lastCardRef }) => {
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {items.map((elem, idx) => {
        // Attach ref to the last card for infinite scroll
        if (idx === items.length - 1) {
          return (
            <div key={`${elem.id}-${idx}`} ref={lastCardRef}>
              <Card elem={elem} />
            </div>
          )
        }
        return <Card key={`${elem.id}-${idx}`} elem={elem} />
      })}
    </Masonry>
  )
}

export default MasonryGrid

