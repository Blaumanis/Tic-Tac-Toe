import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Game from './Game'

const Main = () => {
  // referencing DOM elements
  const xRef = useRef(null)
  const oRef = useRef(null)

  // states
  const [pick, setPick] = useState('X') // state for knowing which pick is picked
  const [isGame, setIsGame] = useState(false) // state for starting Game

  // functions
  const handlePick = (e) => { // function for adding & removing styles for clicked elements setting up the pick
    if (e.target.ariaLabel === 'X') {
      xRef.current.classList.add('picked-pick')
      oRef.current.classList.remove('picked-pick')
      setPick('X')
    } else if (e.target.ariaLabel === 'O') {
      xRef.current.classList.remove('picked-pick')
      oRef.current.classList.add('picked-pick')
      setPick('O')
    }
  }

  return (
    <>
      {isGame ? (
        <Game pick={pick} setIsGame={setIsGame}/>
      ) : (
        <motion.main
          animate={{ x: '0%', scale: 1 }}
          initial={{ scale: 0, x: '-100%' }}
          transition={{ ease: 'easeOut', duration: 1 }}
          className='main-container'
        >
          <svg width='72' height='32' xmlns='http://www.w3.org/2000/svg'>
            <g fill='none' fillRule='evenodd'>
              <path
                d='M8.562 1.634 16 9.073l7.438-7.439a3 3 0 0 1 4.243 0l2.685 2.685a3 3 0 0 1 0 4.243L22.927 16l7.439 7.438a3 3 0 0 1 0 4.243l-2.685 2.685a3 3 0 0 1-4.243 0L16 22.927l-7.438 7.439a3 3 0 0 1-4.243 0L1.634 27.68a3 3 0 0 1 0-4.243L9.073 16 1.634 8.562a3 3 0 0 1 0-4.243L4.32 1.634a3 3 0 0 1 4.243 0Z'
                fill='#31C3BD'
              ></path>
              <path
                d='M56.1 0c8.765 0 15.87 7.106 15.87 15.87 0 8.766-7.105 15.871-15.87 15.871-8.765 0-15.87-7.105-15.87-15.87C40.23 7.106 47.334 0 56.1 0Zm0 9.405a6.466 6.466 0 1 0 0 12.931 6.466 6.466 0 0 0 0-12.931Z'
                fill='#F2B137'
                fillRule='nonzero'
              ></path>
            </g>
          </svg>
          <div className='pick-container'>
            <h3>pick player 1's mark</h3>
            <div className='pick-toggler'>
              <div
                className='picked-pick'
                aria-label='X'
                onClick={(e) => handlePick(e)}
                ref={xRef}
              >
                <svg
                  width='30px'
                  height='30px'
                  viewBox='0 0 64 64'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
                    fillRule='evenodd'
                  ></path>
                </svg>
              </div>
              <div aria-label='O' onClick={(e) => handlePick(e)} ref={oRef}>
                <svg
                  width='30px'
                  height='30px'
                  viewBox='0 0 64 64'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'></path>
                </svg>
              </div>
            </div>
            <h5>remember: x goes first</h5>
          </div>
          <div className='button-container'>
            {/* <button onClick={() => setIsGame(true)}>
              new game (vs cpu)
            </button> */}
            <button onClick={() => setIsGame(true)}>
              {/* new game (vs player) */}
              new game
            </button>
          </div>
        </motion.main>
      )}
    </>
  )
}

export default Main
