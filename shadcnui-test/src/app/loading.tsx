import React from 'react'
import SkeletonCard from '../components/skeletonCard'

const loading = () => {
  return (
    <div className='grid grid-cols-3 gap-8'>
          {"abcdefghi".split('').map(i => (
          <SkeletonCard key={i} />
        ))}
    </div>
  )
}

export default loading