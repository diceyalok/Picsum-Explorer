import React from 'react'

const LoadingSpinner = ({ message = 'Fetching fresh shots…', size = 'large' }) => {
  const spinnerSize = size === 'large' ? 'h-14 w-14' : 'h-10 w-10'
  const padding = size === 'large' ? 'py-24' : 'py-12'

  return (
    <div className={`w-full flex flex-col items-center gap-4 ${padding} text-sm text-slate-500`}>
      <span className={`${spinnerSize} animate-spin rounded-full border-2 border-slate-200 border-t-amber-400`}></span>
      <p className='text-base font-medium tracking-wide text-slate-400'>
        {message}
      </p>
    </div>
  )
}

export default LoadingSpinner

