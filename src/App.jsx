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

  // stores boolean to toggle display of submit button and allow answers to be checked
  const [submittable, setSubmittable] = useState(false)

  // stores boolean to set answers as correct or incorrect
  const [correct, setCorrect] = useState(false)

  // uses lodash shuffle algorithm to shuffle the flattened array of json data
  function createRandomOrder() {
    setRandomOrder(shuffle(flatArr))
  }

  // shuffles the flattened array of json data and shows the answer choices and hides start button
  function startGame() {
    setStarted(true)
    setRandomOrder(shuffle(flatArr))
  }

  // add answer choice to answer choice array 
  function select(element) {
    // filters the answer choices array to remove element if already selected
    if (answerChoices.includes(element)) {
      setAnswerChoices(answerChoices.filter((a)=> (a !== element)))
    }

    // if there are less than 4 answer choices, add the answer choice to the array
    if (answerChoices.length < 3 && !answerChoices.includes(element)) {
      setAnswerChoices([...answerChoices, element])
    } else if (answerChoices.length < 4 && !answerChoices.includes(element)) {
      setAnswerChoices([...answerChoices, element])
      setSubmittable(true)
    } else {
      setSubmittable(false)
    }

  }

  // check if answer choices match any of the sub arrays in categories json
  function submit() {
    let answerString = answerChoices.sort().join('')
    if (submittable) {
      for (let i=0; i<categories.length; i++) {
        let categoryString = categories[i].sort().join('')
        if (answerString === categoryString) {
          setCorrect(true)
          console.log('yay!')
        }
      }
    }
  }

  // set answer choices
  function deselectAll() {
    setAnswerChoices([])
    setSubmittable(false)
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
      <button onClick={createRandomOrder} className="mt-4 rounded-full bg-white border-1px border-[gray]">Shuffle</button>
      <button onClick={deselectAll} className="mt-4 mx-4 rounded-full bg-white border-1px border-[gray]">Deselect All</button>
      <button onClick={submit} className={`${submittable ? 'bg-white border-1px border-[gray]': 'text-[gray]'} mt-4 rounded-full`}>Submit</button>
      </>
      )}
    </>
  )
}

export default App
