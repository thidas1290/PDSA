import PriorityQueue from "./PriorityQueue";

class Graph {
    constructor(size, min_weight, max_weight){
        this.size = size;
        this.min_weight = min_weight;
        this.max_weight = max_weight;

        this.start = Math.floor(Math.random() * (this.size)).toString();

        this.mat = [];
        this.ref_mat = [];

        for (let i = 0; i < this.size; i++) {
          const row = []
          for (let j = 0; j < this.size; j++) {
            row.push(0);
          }
          this.mat.push(row);
          this.ref_mat.push([...row]);
        }
      
        for (let row = 0; row < this.mat.length; row++) {
          for (let col = 0; col < this.mat.length; col++) {
            if (col < row) {
                const rn = Math.floor(Math.random() * (this.max_weight - this.min_weight + 1)) + this.min_weight;
                this.mat[row][col] = rn;
                this.ref_mat[row][col] = rn;
            }
          }
        }
      
      
        for (let row = 0; row < this.mat.length; row++) {
          for (let col = 0; col < this.mat.length; col++) {
            if (row != col) {
              this.mat[row][col] = this.mat[col][row];
            }
          }
        }
    }

    getMat(){
        return this.ref_mat;
    }

    getStart()
    {
        return parseInt(this.start);
    }

    dsp(){
        const vis = []
        const dist = [];
        const prev = [];
        for (let i = 0; i < this.mat.length; i++){
          vis[i] = false;
          dist[i] = 99999;
          prev[i] = null;
        }
        dist[this.start] = 0;
        const queue = new PriorityQueue();
        queue.enqueue(this.start.toString(), 0);
      
        while(!queue.isEmpty())
        {
          const current_node = parseInt(queue.dequeue().element);
          vis[current_node] = true;
          for(let node = 0; node < this.mat.length; node++){
            const weight = this.mat[current_node][node];
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
        const paths = this.path_deriver(prev);
        return [dist, paths];
    }

    mst(){
      const vis = []
      const dist = [];
      const prev = [];
      for (let i = 0; i < this.mat.length; i++){
        vis[i] = false;
        dist[i] = 99999;
        prev[i] = null;
      }
      dist[this.start] = 0;
      const queue = new PriorityQueue();
      queue.enqueue(this.start.toString(), 0);
    
      while(!queue.isEmpty())
      {
        const current_node = parseInt(queue.dequeue().element);
        vis[current_node] = true;
        for(let node = 0; node < this.mat.length; node++){
          const weight = this.mat[current_node][node];
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
      const paths = this.path_deriver(prev);
      return [dist[3], paths[3]];      

    }

    path_deriver(prev){
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


}

export default Graph;