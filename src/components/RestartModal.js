import React from 'react'
import { motion } from 'framer-motion'

const RestartModal = ({setIsGame, setRestartModal}) => {
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
        <h2 style={{fontSize: '2rem'}}>RESTART GAME</h2>
        <div className='modal-btn-group'>
          <button onClick={() => setRestartModal(false)}>NO, CANCEL</button>
          <button onClick={() => setIsGame(false)}>YES, RESTART</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RestartModal
