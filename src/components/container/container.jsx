import React, { Children } from 'react'

function container() {
  return (
    <div className='w-full max-w-7xl mx-autopx-4 '>{Children}</div>
  )
}

export default container