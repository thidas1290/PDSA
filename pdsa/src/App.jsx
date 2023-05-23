import { Route, Routes } from 'react-router-dom';
import Menu from './Menu';

import PathFinder from './PathFinder';
import Graph from './Graph';
import PriorityQueue from './PriorityQueue';



const generateMat = (cities) => {
  const min = 5;
  const max = 50;

  const mat = [];
  for (let i = 0; i < cities; i++) {
    const row = []
    for (let j = 0; j < cities; j++) {
      row.push(0);
    }
    mat.push(row);
  }

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat.length; col++) {
      if (col < row) {
        mat[row][col] = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
  }

  console.log(mat)

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat.length; col++) {
      if (row != col) {
        mat[row][col] = mat[col][row];
      }
    }
  }
  console.log(mat)
  return mat;

}


const dsp = ([mat, start]) => {
  const vis = [];
  const dist = [];
  const prev = [];
  
  for (let i = 0; i < mat.length; i++){
    vis[i] = false;
    dist[i] = 99999;
    prev[i] = null;
  }
  console.log(prev);
  dist[start] = 0;
  const queue = new PriorityQueue();
  queue.enqueue(start.toString(), 0);

  while(!queue.isEmpty())
  {
    const current_node = parseInt(queue.dequeue().element);
    vis[current_node] = true;
    for(let node = 0; node < mat.length; node++){
      const weight = mat[current_node][node];
      if(!vis[node]){
        const newDist = dist[current_node] + weight;
        if(newDist < dist[node]){
          prev[node] = current_node;
          dist[node] = newDist;
          queue.enqueue(node.toString(), weight);
        }
      }
    }
  }
  return [dist, prev];
  
}

const mst = ([mat, start]) => {
  const edge_count = mat.length - 1;
  const vis = [];
  const prev = [];
  
  for (let i = 0; i < mat.length; i++){
    vis[i] = false;
    prev[i] = null;
  }
  const queue = new PriorityQueue();
  queue.enqueue(start.toString(), 0);

  while(!queue.isEmpty())
  {
    const current_node = parseInt(queue.dequeue().element);
    vis[current_node] = true;
    for(let node = 0; node < mat.length; node++){
      const weight = mat[current_node][node];
      if(!vis[node]){
      }
    }
  }
  return [dist, prev];
  
}

const shortest_path = (prev)=>{
  const paths = [];
  for (let path = 0; path < prev.length; path++){
    const new_path = [];
    new_path.push(path);
    let seeker = path;
    while(prev[seeker] != null){
      new_path.push(parseInt(prev[seeker]));
      seeker = parseInt(prev[seeker]);
    }
    new_path.reverse();
    paths.push(new_path);
  }
  return paths;
}
const mat = generateMat(4) 
const [dist, prev] = dsp([mat, 2]);
console.log(shortest_path(prev));

const graph = new Graph(4, 5, 50);

for(var i = 0; i < 3; i ++){
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100);
}


function App() {

  return (
    <>  
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/option' element={<PathFinder/>}/>
        </Routes>
    </>
  )
}

export default App
