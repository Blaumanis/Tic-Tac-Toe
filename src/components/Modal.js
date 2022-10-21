import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({
  setModal,
  setBoard,
  setToggleSymbol,
  setIsGame,
  result,
  setPlayer,
  resultText,
  resultClass,
  
}) => {
  // functions
  const nextRound = () => { // nextRound 
    setModal(false) // remove modal
    setBoard(['', '', '', '', '', '', '', '', '']) // set board to empty values
    setToggleSymbol('X') // set toggle symbol to default state
    setPlayer('O') // setting to the initial value -> useEffect will change back to the right X symbol
  }

  const quitGame = () => {
    setIsGame(false)
  }

  return (
    <motion.div
      animate={{ height: '100vh' }}
      initial={{ height: '0vh' }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className='modal-container'
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.5, delay: 0.5 }}
        className='modal'
      >
        <h4 className={resultClass}>{resultText}</h4>
        <div className='modal-title'>
          <svg
            width='36px'
            height='36px'
            viewBox='0 0 64 64'
            xmlns='http://www.w3.org/2000/svg'
            className={resultClass}
          >
            <path
              d={
                result.winner === "X"
                ? 'M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
                : 'M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'
              }
              fillRule='evenodd'
            ></path>
          </svg>
          <h2 className={resultClass}>{result.winner === "No One" ? "ROUND TIDE" : "TAKES THE ROUND"}</h2>
        </div>
        <div className='modal-btn-group'>
          <button onClick={() => quitGame()}>QUIT</button>
          <button onClick={() => nextRound()}>NEXT ROUND</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
