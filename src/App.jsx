import './App.css'
import { Outlet } from 'react-router'
import PlaygroundList from './components/PlaygroundList'
function App() {
  
  return (
    <>
    <Outlet />
    <PlaygroundList/>
    
    </>
  )
}
export default App
