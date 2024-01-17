import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import categories from './categories.json'

function App() {
  function getRandomAndRemove(num) {

  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, idx)=>(
          <>
            <button>{category[0]}</button>
            <button>{category[1]}</button>
            <button>{category[2]}</button>
            <button>{category[3]}</button>
          </>
        ))}
      </div>
    </>
  )
}

export default App
