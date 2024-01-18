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

  const [submittable, setSubmittable] = useState(false)

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

  // IF FOUR IS SELECTED
  // display submit button as normal
  // set boolean as true for submittable to allow submit function to run

  function select(element) {

    if (answerChoices.includes(element)) {
      setAnswerChoices(answerChoices.filter((a)=> (a !== element)))
    }

    if (answerChoices.length < 4 && !answerChoices.includes(element)) {
      setAnswerChoices([...answerChoices, element])
    }
    
    if (answerChoices.length === 4) {
      setSubmittable(true)
    }

    console.log(answerChoices)
  }

  // check if answer choices match any of the sub arrays in categories json
  function submit() {
      if (submittable) {
        for (let i=0; i<categories.length; i++) {
          
        }
      }
  }

  // set answer choices
  function deselectAll() {
    setAnswerChoices([])
    console.log(answerChoices)
  }


  return (
    <>
      {!started ? (
      <button onClick={startGame}>Start</button>
      ) : (
        <>
      <div className="grid grid-cols-4 gap-4">
        {randomOrder.map((el, idx)=>(<button onClick={() => select(el)} className={answerChoices.includes(el) ? 'selected' : ''} key={idx}>{el}</button>))}
      </div>
      <button onClick={createRandomOrder} className="mt-4 rounded-full">Shuffle</button>
      <button onClick={deselectAll} className="mt-4 mx-4 rounded-full">Deselect All</button>
      <button onClick={submit} className="mt-4 rounded-full">Submit</button>
      </>
      )}
    </>
  )
}

export default App
