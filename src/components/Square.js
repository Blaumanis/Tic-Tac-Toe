import React, {useRef, useEffect} from 'react'

const Square = ({value, chooseTile, modal, player}) => {

  const squareRef = useRef(null)
  useEffect(()=> {
    squareRef.current.classList.remove('non-clickable') // removes pointer-events:none when modal changes
  },[modal])

  return (
    <button data-symbol={player} ref={squareRef} onClick={chooseTile} className='tile'>{value}</button>
  )
}

export default Square