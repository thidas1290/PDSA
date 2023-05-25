import { Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import PathFinder from './components/PathFinder';
import MST from './components/MinimumSpanningTree';
import TicTacToe from './components/TicTacToe';


function App() {

  return (
    <>  
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/option' element={<PathFinder/>}/>
          <Route path='/option/tic-tac-toe' element={<TicTacToe/>}/>
          <Route path='/option/mst' element={<MST/>}/>
        </Routes>
    </>
  )
}

export default App
