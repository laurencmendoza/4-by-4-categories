import { useState } from 'react'
import './App.css'
import categories from './categories.json'
import {shuffle} from 'lodash'

function App() {
  const flatArr = categories.flat()
  const [randomOrder, setRandomOrder] = useState([])
  const [started, setStarted] = useState(false)

  function createRandomOrder() {
    setRandomOrder(shuffle(flatArr))
  }

  function startGame() {
    setStarted(true)
    setRandomOrder(shuffle(flatArr))
  }

  return (
    <>
      {!started ? (
      <button onClick={startGame}>Start</button>
      ) : (
        <>
      <button onClick={createRandomOrder}>shuffle</button>
      <div className="grid grid-cols-4 gap-4">
        {randomOrder.map((el, idx)=>(<button key={idx}>{el}</button>))}
      </div>
      </>
      )}
      
      
    </>
  )
}

export default App
