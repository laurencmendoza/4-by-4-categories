import { useState } from 'react'
import './App.css'
import categories from './categories.json'
import {shuffle} from 'lodash'
import { BsFillCircleFill } from "react-icons/bs";

function App() {
  // flatten category elements into one array
  const flatArr = categories.map((c)=> c.elements).flat()

  // stores a random order of the answer choices
  const [randomOrder, setRandomOrder] = useState(shuffle(flatArr))

  // stores boolean to start game
  const [started, setStarted] = useState(false)

  // stores user's answer choices in an array
  const [answerChoices, setAnswerChoices] = useState([])

  // stores boolean to toggle display of submit button and allow answers to be checked
  const [submittable, setSubmittable] = useState(false)

  // stores boolean to set answers as correct or incorrect
  const [correctAnswers, setCorrectAnswers] = useState([])

  // stores number of remaining mistakes
  const [remainingMistakes, setRemainingMistakes] = useState([1,2,3,4])

  const [hint, setHint] = useState('')

  // uses lodash shuffle algorithm to shuffle the flattened array of json data
  function createRandomOrder() {
    setRandomOrder(shuffle(randomOrder))
  }

  // shuffles the flattened array of json data and shows the answer choices and hides start button
  function startGame() {
    setStarted(true)
    setRandomOrder(shuffle(randomOrder))
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
    setHint('')
    checkOneAway()
    let answerString = answerChoices.sort().join('')
    if (submittable) {
      let noMatch = 0
      for (let i=0; i<categories.length; i++) {
        let categoryString = categories[i].elements.sort().join('')
        if (answerString === categoryString) {
          setCorrectAnswers([...correctAnswers, categories[i]])
          setRandomOrder(randomOrder.filter((c)=> (!categories[i].elements.includes(c))))
          setAnswerChoices([])
          setSubmittable(false)
        } else {
          noMatch++
        }
        if (noMatch === 4) {
          setRemainingMistakes(remainingMistakes.slice(0,-1))
          setAnswerChoices([])
          setSubmittable(false)
        }
      }
    }
  }

  function checkOneAway() {
    for (let i=0; i<categories.length; i++) {
      let match = 0
      for (let j=0; j<categories[i].elements.length; j++) {
        for (let k=0; k<answerChoices.length; k++) {
          if (categories[i].elements[j] === answerChoices[k]) {
            match++
            if (match === 3) {
              setHint('One away...')
            } else if (match === 4) {
              setHint('')
            }
          }
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
      <>
        <h1 className="mb-6 text-4xl">4 by 4 Categories</h1>
        <h2 className="mb-4">4 by 4 Categories is a game based on the NYT Connections game. </h2>
        <p>Find groups of four items that share a category. </p>
        <p>Once you have selected four items, click the 'Submit' button to check if your answer is correct. </p>
        <p>Find all 4 categories without making 4 mistakes!</p>
        <button onClick={startGame} className="mt-4">Start</button>
      </>
      ) : (
      <>
        {hint &&
        <div className="bg-[black] text-[white] w-max mx-auto px-4 py-2 rounded mb-4">{hint}</div>
        }
        {remainingMistakes.length === 0 && 
        <div className="bg-[black] text-[white] w-max mx-auto px-4 py-2 rounded mb-4">Try again next time!</div>
        }
        {correctAnswers.length === 4 && 
        <div className="bg-[black] text-[white] w-max mx-auto px-4 py-2 rounded mb-4">Nice work!</div>
        }
        <div className="grid grid-cols-4 gap-4">
          {correctAnswers && remainingMistakes.length > 0 && (
            correctAnswers.map((c,idx)=>(
                <div key={idx} className={`${c.color} col-span-4 rounded py-1`}>
                  {c.elements.join(', ')}
                  <p>{c.category}</p>
                </div>
            ))
          )}
          {!remainingMistakes.length ? (
            categories.map((c,idx)=>(
                <div key={idx} className={`${c.color} col-span-4 rounded py-1`}>
                  {c.elements.join(', ')}
                  <p>{c.category}</p>
                </div>
              )
          )) : (randomOrder.map((el, idx)=>(<button onClick={() => select(el)} className={answerChoices.includes(el) ? 'selected' : ''} key={idx}>{el}</button>)))}
        </div>
        <div className="mt-4">
          Mistakes remaining: 
          {remainingMistakes.map((x, idx)=> (
            <BsFillCircleFill className="inline text-[gray] mx-2" key={idx}/>
          ))}
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
