import React from 'react'

const Card = ({ elem }) => {
  const { author, download_url, url, width, height, id } = elem

  return (
    <article className='group rounded-[28px] border border-slate-100 bg-white/90 p-5 shadow-[0_20px_45px_rgba(15,15,15,0.08)] transition hover:-translate-y-1 hover:border-amber-200 hover:bg-white'>
      <a href={url} target='_blank' rel='noreferrer' className='flex flex-col gap-5'>
        <div className='relative h-52 w-full overflow-hidden rounded-2xl bg-amber-50'>
          <img
            className='h-full w-full object-cover transition duration-700 group-hover:scale-105'
            src={download_url}
            alt={`Shot by ${author}`}
            loading='lazy'
          />
          <div className='absolute inset-0 bg-linear-to-t from-slate-900/30 via-transparent to-white opacity-0 transition group-hover:opacity-80'></div>
          <span className='absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium tracking-wide text-slate-900 shadow'>
            {width}×{height}
          </span>
        </div>

        <div className='flex items-center justify-between text-sm text-slate-500'>
          <div>
            <p className='text-xl font-semibold text-slate-900'>{author}</p>
            <p className='text-[11px] uppercase tracking-[0.4em] text-slate-400'>
              #{id}
            </p>
          </div>
          <span className='rounded-full border border-slate-200 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600 transition group-hover:border-amber-300 group-hover:text-amber-500'>
            Open
          </span>
        </div>
      </a>
    </article>
  )
}

export default Card