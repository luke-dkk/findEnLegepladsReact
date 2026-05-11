import { useState } from 'react'
import './App.css'
import playGroundApiFacade from './Api/ApiFacade'
import PlaygroundList from './components/PlaygroundList'
 
import { useEffect } from 'react'
function App() {
 // const [count, setCount] = useState(0)
  const [playgrounds, setPlaygrounds] = useState([]);


useEffect(() => {
  (async () => {
  
  
    const playgroundFromServer = await playGroundApiFacade.getAllPlaygrounds();
    setPlaygrounds(playgroundFromServer);
  })();

},[]);




  return (
    <>
    <PlaygroundList playgrounds={playgrounds}/>
    </>
  )
}

export default App
