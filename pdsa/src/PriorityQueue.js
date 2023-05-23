class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element, priority) {
      const item = { element, priority };
  
      if (this.isEmpty()) {
        this.queue.push(item);
      } else {
        let added = false;
  
        for (let i = 0; i < this.queue.length; i++) {
          if (item.priority < this.queue[i].priority) {
            this.queue.splice(i, 0, item);
            added = true;
            break;
          }
        }
  
        if (!added) {
          this.queue.push(item);
        }
      }
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
  
      return this.queue.shift();
    }
  
    front() {
      if (this.isEmpty()) {
        return null;
      }
  
      return this.queue[0].element;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    size() {
      return this.queue.length;
    }
  
    print() {
      for (let i = 0; i < this.queue.length; i++) {
        console.log(`${this.queue[i].element} - ${this.queue[i].priority}`);
      }
    }
  }
  
  export default PriorityQueue;