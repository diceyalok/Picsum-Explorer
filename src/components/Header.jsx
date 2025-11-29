import React from 'react'

const Header = () => {
  return (
    <header className='space-y-5 text-center'>
      <p className='text-xs font-semibold uppercase tracking-[0.45em] text-amber-500'>
        Picsum Explorer
      </p>
      <h1 className='fluid-headline font-semibold text-slate-900'>
        Curated drops of free-to-use photography
      </h1>
      <p className='fluid-subhead mx-auto max-w-3xl text-lg text-slate-500'>
        An airy gallery of Lorem Picsum imagery. Open any frame for its full
        story and scroll down for a never-ending flow of inspiration.
      </p>
    </header>
  )
}

export default Header

