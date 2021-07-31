//performs dijkstra
function dijkstra(grid, startNode, endNode) {
  //edge case
  if (!startNode || !endNode || startNode === endNode) return false;
  startNode.distance = 0;
  const visitedNodesInOrder = []; //to keep visited nodes on order to help animate
  const unvisitedNodes = getAllNodes(grid); //keep unvisited nodes

  //loop till all nodes visited, '!!' changes value to boolean, ex: !!0 -> evaluates to false
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const minDistanceNode = unvisitedNodes.shift();
    //if reaching the target is not possible
    if (minDistanceNode.distance === Infinity) return visitedNodesInOrder;
    //HANDLE WALLS
    //HANDLE IMPOSSIBLE CASE IF ENDNODE NOT REACHABLE
    minDistanceNode.isVisited = true;
    visitedNodesInOrder.push(minDistanceNode);
    if (minDistanceNode === endNode) return visitedNodesInOrder;
    updateAdjacentNodes(minDistanceNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const node = grid[row][col];
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(nodes) {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateAdjacentNodes(node, grid) {
  const adjacentNodes = getAdjacentUnvisitedNodes(node, grid);
  for (const adjacentNode of adjacentNodes) {
    adjacentNode.distance = node.distance + 1;
    adjacentNode.previousNode = node;
  }
}

function getAdjacentUnvisitedNodes(node, grid) {
  const { row, col } = node;
  const adjacentNodes = [];
  if (row > 0) adjacentNodes.push(grid[row - 1][col]);
  if (row < grid.length - 1) adjacentNodes.push(grid[row + 1][col]);
  if (col > 0) adjacentNodes.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) adjacentNodes.push(grid[row][col + 1]);
  //filter the nodes which are unvisited and not a wall
  return adjacentNodes.filter(
    (node) => node.isVisited === false && node.isWall === false
  );
}

//==================================
export default dijkstra;
