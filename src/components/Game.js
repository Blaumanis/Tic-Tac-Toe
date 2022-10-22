import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Square from './Square'
import Modal from './Modal'
import RestartModal from './RestartModal'

// winning combinations
const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const Game = ({ pick, setIsGame }) => {
  // ===STATES===
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']) //board
  const [player, setPlayer] = useState('O') // initial player is O because on first render the useEffect will changed it to X
  const [result, setResult] = useState({ winner: 'none', state: 'none' })
  const [toggleSymbol, setToggleSymbol] = useState('X') // for toggling symbol which shows which players turn it is
  const [modal, setModal] = useState(false) // if true then game is finneshed and modal appears
  const [restartModal, setRestartModal] = useState(false)
  // scores 
  const [yourScore, setYourScore] = useState(0)
  const [oponentScore, setOponentScore] = useState(0)
  const [tieScore, setTieScore] = useState(0)
  // class,text
  const [resultClass, setResultClass] = useState('')
  const [resultText, setResultText] = useState('')

  // useEffects
  useEffect(() => {
    chekTie() // checking everytime if change in a board
    // putting after checkWin, will determine the right player who won, otherwise if the setting up next player is set before
    // this function it will set next player, and then show that player as winner which is not true
    // will check if any of the patterns are winning patterns
    checkWin()

    // if player is X -> than set the next player with O symbol -> else the player will be X
    player === 'X' ? setPlayer('O') : setPlayer('X')
  }, [board]) // runs useEffect everytime the board updates

  useEffect(() => {
    if (result.state !== 'none') {
      setModal(true)
      if (result.winner === pick && result.winner === 'X') {
        setResultText('YOU WON')
        setResultClass('x-tile')
        setYourScore((current) => {
          return current + 1
        })
      }
      if (result.winner === pick && result.winner === 'O') {
        setResultText('YOU WON')
        setResultClass('o-tile')
        setYourScore((current) => {
          return current + 1
        })
      }
      if (result.winner !== pick && result.winner === 'X') {
        setResultText('YOU LOOSE')
        setResultClass('x-tile')
        setOponentScore((current) => {
          return current + 1
        })
      }
      if (result.winner !== pick && result.winner === 'O') {
        setResultText('YOU LOOSE')
        setResultClass('o-tile')
        setOponentScore((current) => {
          return current + 1
        })
      }
      if(result.winner === "No One") {
        setResultText('')
        setResultClass("tie")
        setTieScore((current) => {
          return current + 1
        })
      }
    }
  }, [result])


  // functions
  const chooseTile = (square, e) => {
    // function for clicking tile/square
    setBoard(
      board.map((value, idx) => {
        e.target.classList.add('non-clickable') // after clicked set pointer-events:none
        if (idx === square && value === '') {
          toggleSymbol === 'X' ? setToggleSymbol('O') : setToggleSymbol('X')

          // checking if player is X -> then adding to the tile x-tile class -> if not adding o-tile class
          if (player === 'X') {
            e.target.classList.add('x-tile')
            e.target.classList.remove('o-tile')
          } else {
            e.target.classList.add('o-tile')
            e.target.classList.remove('x-tile')
          }
          return player // add the current player symbol
        }
        return value // if these conditions are not true just return the value
      })
    )
  }

  // function for checking winning state
  const checkWin = () => {
    patterns.forEach((currentPattern) => {
      // looping throug patters array
      const firstPlayer = board[currentPattern[0]] // checking who is the first player
      if (firstPlayer === '') return
      let foundWinningPatern = true
      currentPattern.forEach((idx) => {
        //then looping throug each patern, to chekc if those indexes contains the same value of 'X' or "O"
        if (board[idx] !== firstPlayer) {
          foundWinningPatern = false
        }
      })
      if (foundWinningPatern) {
        setResult({ winner: player, state: 'Won' })
      }
    })
  }

  const chekTie = () => {
    let filled = true // if all squares are filled then its draw / true
    board.forEach((square) => {
      if (square === '') {
        filled = false
      }
    })
    if (filled) {
      setResult({ winner: 'No One', state: 'Tie' })
    }
  }

  return (
    <motion.div
      animate={{ x: '0%', scale: 1 }}
      initial={{ scale: 0, x: '100%' }}
      transition={{ ease: 'easeOut', duration: 1 }}
      className='game-container'
    >
      <div className='top-row'>
        <div className='svg-box'>
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
        </div>
        <div className='turn-box'>
          <svg
            width='20px'
            height='20px'
            viewBox='0 0 64 64'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d={
                toggleSymbol === 'X'
                  ? 'M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
                  : 'M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'
              }
              fillRule='evenodd'
            ></path>
          </svg>
          <h5>TURN</h5>
        </div>
        <div onClick={() => setRestartModal(true)} className='refresh-box'>
          <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z'
              fill='#1F3641'
            ></path>
          </svg>
        </div>
      </div>
      <div className='board-container'>
        {/* passing props to the Square component, basicly the value which is boards array index value
        & passing the function which will be triggered when Square is clicked with parameter of each Squares index */}
        {board.map((el, idx) => (
          <Square
          player={player}
            modal={modal}
            value={board[idx]}
            chooseTile={(e) => chooseTile(idx, e)}
          />
        ))}
      </div>
      <div className='bottom-row'>
        <div className='cpu-box'>
          <h4>X {pick === 'X' ? '(YOU)' : '(P2)'}</h4>
          <h5>{pick === 'X' ? yourScore : oponentScore}</h5>
        </div>
        <div className='ties-box'>
          <h4>TIES</h4>
          <h5>{tieScore}</h5>
        </div>
        <div className='you-box'>
          <h4>O {pick === 'O' ? '(YOU)' : '(P2)'}</h4>
          <h5>{pick === 'O' ? yourScore : oponentScore}</h5>
        </div>
      </div>
      {modal ? (
        <Modal
          setToggleSymbol={setToggleSymbol}
          setIsGame={setIsGame}
          setModal={setModal}
          setBoard={setBoard}
          result={result}
          setPlayer={setPlayer}
          pick={pick}
          resultText={resultText}
          resultClass={resultClass}
        />
      ) : (
        <></>
      )}
      {restartModal ? (
        <RestartModal setIsGame={setIsGame} setRestartModal={setRestartModal}/>
      ): <></>}
    </motion.div>
  )
}

export default Game
