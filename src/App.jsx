import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import PlaygroundList from './components/PlaygroundList'
function App() {
  const [playgrounds] = useState([]);
  return (
    <>
    <Outlet />
    <PlaygroundList playgrounds={playgrounds}/>
    
    </>
  )
}
export default App
