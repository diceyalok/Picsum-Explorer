import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=20`
    )
    setUserData(response.data)
  }

  useEffect(() => {
    getData()
  }, [index])

  const isLoading = userData.length === 0

  const gridContent = isLoading ? (
    <div className='col-span-full flex flex-col items-center gap-4 py-24 text-sm text-slate-500'>
      <span className='h-14 w-14 animate-spin rounded-full border-2 border-slate-200 border-t-amber-400'></span>
      <p className='text-base font-medium tracking-wide text-slate-400'>
        Fetching fresh shots…
      </p>
    </div>
  ) : (
    userData.map((elem, idx) => <Card key={`${elem.id}-${idx}`} elem={elem} />)
  )

  return (
    <div className='min-h-screen bg-[#fdfcf7] px-4 py-10 text-slate-900'>
      <div className='mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col gap-10'>
        <header className='space-y-5 text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.45em] text-amber-500'>
            Picsum Explorer
          </p>
          <h1 className='fluid-headline font-semibold text-slate-900'>
            Curated drops of free-to-use photography
          </h1>
          <p className='fluid-subhead mx-auto max-w-3xl text-lg text-slate-500'>
            An airy gallery of Lorem Picsum imagery. Open any frame for its full
            story and keep paging for a never-ending flow of inspiration.
          </p>
        </header>

        <main className='flex-1 pb-32'>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8'>
            {gridContent}
          </div>
        </main>

        <div className='sticky bottom-10 z-10 mx-auto flex w-full max-w-lg items-center justify-between rounded-full border border-amber-200/80 bg-white/80 px-5 py-4 text-sm shadow-xl shadow-amber-100/70 backdrop-blur'>
          <button
            className='rounded-full bg-amber-400/90 px-6 py-2.5 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40'
            disabled={index === 1 || isLoading}
            onClick={() => {
              if (index > 1) {
                setUserData([])
                setIndex(index - 1)
              }
            }}
          >
            Prev
          </button>
          <span className='text-xs font-semibold uppercase tracking-[0.55em] text-slate-500'>
            Page {index}
          </span>
          <button
            className='rounded-full bg-slate-900 px-6 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40'
            disabled={isLoading}
            onClick={() => {
              setUserData([])
              setIndex(index + 1)
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default App