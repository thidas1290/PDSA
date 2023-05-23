class Graph {
    constructor(size, min_weight, max_weight){
        this.size = size;
        this.min_weight = min_weight;
        this.max_weight = max_weight;
        this.vis = [];
        this.dist = [];
        this.prev = [];

        this.mat = [];
        for (let i = 0; i < this.size; i++) {
          const row = []
          for (let j = 0; j < this.size; j++) {
            row.push(0);
          }
          this.mat.push(row);
        }
      
        for (let row = 0; row < this.mat.length; row++) {
          for (let col = 0; col < this.mat.length; col++) {
            if (col < row) {
              this.mat[row][col] = Math.floor(Math.random() * (this.max_weight - this.min_weight + 1)) + this.min_weight;
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
        console.log(this.mat)
    }

    dsp(start){
        
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

    msp(){

    }


}

export default Graph;