import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import playGroundApiFacade from './Api/ApiFacade'
import PlaygroundList from './components/PlaygroundList'
import Header from './components/Header/Header.jsx';
import { useEffect } from 'react'
function App() {
 // const [count, setCount] = useState(0)
  const [playgrounds, setPlaygrounds] = useState([]);
  const [user, setUser] = useState({email:''});

// useEffect(() => {
 // (async () => {
   // const playgroundFromServer = await playGroundApiFacade.getAllPlaygrounds();
   // setPlaygrounds(playgroundFromServer);
  //})();
// },[]);




  return (
    <>
     <Header user={user}/>
    <Outlet />
    <PlaygroundList playgrounds={playgrounds}/>
    
    </>
  )
}

export default App
