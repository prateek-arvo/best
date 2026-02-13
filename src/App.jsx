import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BeastGamesInteractive from './BeastGames';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BeastGamesInteractive />
    </>
  )
}

export default App
