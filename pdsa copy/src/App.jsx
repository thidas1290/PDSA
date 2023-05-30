import { Route, Routes } from 'react-router-dom';
import Menu from './router/Menu';
import PathFinder from './components/PathFinder';
import MST from './components/MinimumSpanningTree';
import TicTacToe from './components/TicTacToe';
import EightQueens from './components/EightQueens';
import Huffman from './components/Huffman';

function App() {

  return (
    <>  
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/option/eight-queens' element={<EightQueens/>}/>
          <Route path='/option/huffman_enc' element={<Huffman/>}/>
          <Route path='/option/tic-tac-toe' element={<TicTacToe/>}/>
          <Route path='/option/spf' element={<PathFinder/>}/>
          <Route path='/option/mst' element={<MST/>}/>
        </Routes>
    </>
  )
}

export default App
