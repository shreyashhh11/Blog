import React from 'react'

function Logo() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-app-accent/70 bg-app-surface px-3 py-2 shadow-glow">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-app-accent2">
        <span className="h-2 w-2 rounded-full bg-app-text" />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-app-text">openblog</span>
    </div>
  )
}

export default Logo