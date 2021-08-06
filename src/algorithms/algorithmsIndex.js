import dijkstra from "./dijkstra";
import bfs from "./bfs";
const allAlgorithms = {
  dijkstra: (grid, startNode, endNode) => dijkstra(grid, startNode, endNode),
  bfs: (grid, startNode, endNode) => bfs(grid, startNode, endNode),
};

export default allAlgorithms;
