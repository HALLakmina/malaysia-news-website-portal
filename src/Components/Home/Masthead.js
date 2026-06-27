import React from 'react'

const Masthead = () => {
  const longDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-white border-b border-meridian-border flex flex-col items-center gap-2 py-7 sm:py-9 px-4">
      <div className="text-[12.5px] text-meridian-faint font-medium">{longDate}</div>
      <h1 className="font-display font-black tracking-tight text-meridian-ink text-[34px] sm:text-[50px] md:text-[64px] leading-none m-0">
        Malay Sri
      </h1>
      <div className="flex items-center gap-2.5">
        <span className="w-7 h-px bg-meridian-border" />
        <span className="text-[11.5px] tracking-[.18em] uppercase text-meridian-muted font-semibold">
          Independent reporting, every hour
        </span>
        <span className="w-7 h-px bg-meridian-border" />
      </div>
    </div>
  )
}

export default Masthead
