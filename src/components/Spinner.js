import React from 'react'
import loading from './loading.gif'

export default function spinner() {
  return (
    <div className='text-center'>
      <img src={loading} alt="loading" style={{height: 50,
        width: 50}} />
    </div>
  )
}
