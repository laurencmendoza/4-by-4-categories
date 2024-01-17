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
      <div>
        {categories.map((category, idx)=>(
          <>
            <div>{category}</div>
          </>
        ))}
      </div>
    </>
  )
}

export default App
