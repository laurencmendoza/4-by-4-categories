import { useState } from 'react'
import './App.css'
import categories from './categories.json'
import {shuffle} from 'lodash'

function App() {
  // flatten categories json data into one array
  const flatArr = categories.flat()

  // stores a random order of the answer choices
  const [randomOrder, setRandomOrder] = useState([])

  // stores boolean to start game
  const [started, setStarted] = useState(false)

  const [selectedClass, setSelectedClass] = useState(false)

  // stores user's answer choices in an array
  const [answerChoices, setAnswerChoices] = useState([])

  // uses lodash shuffle algorithm to shuffle the flattened array of json data
  function createRandomOrder() {
    setRandomOrder(shuffle(flatArr))
  }

  // shuffles the flattened array of json data and shows the answer choices and hides start button
  function startGame() {
    setStarted(true)
    setRandomOrder(shuffle(flatArr))
  }

  // IF NOT ALREADY SELECTED
  // store answer in array
  // change bg color to dark
  
  // IF SELECTED
  // remove answer from array
  // change bg color back to original

  function select(element) {
    // setSelectedClass((prev) => !prev)
    if (answerChoices.length < 4) {
      setAnswerChoices([...answerChoices, element])
    }
    
  }


  return (
    <>
      {!started ? (
      <button onClick={startGame}>Start</button>
      ) : (
        <>
      <div className="grid grid-cols-4 gap-4">
        {randomOrder.map((el, idx)=>(<button onClick={() => select(el)} className={`${selectedClass}`} key={idx}>{el}</button>))}
      </div>
      <button onClick={createRandomOrder} className="mt-4">shuffle</button>
      </>
      )}
    </>
  )
}

export default App
