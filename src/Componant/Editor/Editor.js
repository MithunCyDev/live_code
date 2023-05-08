import React, { useEffect, useState } from 'react'
import  InnerSpiner from '../../Spiner/InnerSpiner'

export const Editor = () => {

  // Loader Animation
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading? (
         <InnerSpiner/>
      ) :
      (
      <div className='text-white'>Editor Page</div>
      )}
    </>
  )
}
