import random as rn
from queue import PriorityQueue

NUM_OF_CITIES = 3
RAND_LOWER_BOUND = 5
RAND_UPPER_BOUND = 50
MAX = 99999

mat = [[0 for j in range(NUM_OF_CITIES)] for i in range(NUM_OF_CITIES)]

for row in range(len(mat)):
    for col in range(row):
        if(col < row):
            mat[row][col] = rn.randrange(RAND_LOWER_BOUND, RAND_UPPER_BOUND + 1)


for row in range(len(mat)):
    for col in range(row):
        if(row != col):
            mat[col][row] = mat[row][col]

for row in mat:
    print(row, "\n")


def dsp(mat, start):
    vis = [False for i in range(len(mat))]
    dist = [MAX for i in range(len(mat))]
    prev = [None for i in range(len(mat))]

    dist[start] = 0
    queue = PriorityQueue()
    queue.put((start, 0))
    while(not queue.empty()):
        current = queue.get()[0]
        vis[current] = True
        index_counter = -1
        for weight in mat[current]:
            index_counter += 1
            if(not vis[index_counter]):
                newDist = dist[current] + weight
                if(newDist < dist[index_counter]):
                    prev[index_counter] = current
                    dist[index_counter] = newDist
                    queue.put((index_counter, weight))
    return [dist, prev]

def findShortestPath(prev):
    paths = []
    for index, node in enumerate(prev):
        path = []
        path.append(index)
        seeker = index
        while(prev[seeker] != None):
            path.append(prev[seeker])
            seeker = prev[seeker]
        path.reverse()
        paths.append(path)
    return paths


random_city = rn.randrange(0, NUM_OF_CITIES)
dist, prev = dsp(mat, random_city)
print(f"dist = {dist}")
print(f"prev = {prev}")
print(findShortestPath(prev))