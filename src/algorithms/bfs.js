function bfs(grid, startNode, endNode) {
  //edge case
  if (!startNode || !endNode || startNode === endNode) return false;

  //queue for bfs
  const queue = [];
  //visited nodes to visualise later
  const visitedNodesInOrder = [];
  //first node
  queue.push(startNode);
  startNode.isVisited = true;
  //iterate till queue is empty, bfs logic
  while (!!queue.length) {
    const frontNode = queue.shift();
    visitedNodesInOrder.push(frontNode);
    if (frontNode === endNode) return visitedNodesInOrder;
    addNeighboursToQueue(grid, queue, frontNode);
  }
  return visitedNodesInOrder;
}

//check conditions and add neighbours to queue
function addNeighboursToQueue(grid, queue, frontNode) {
  const { row, col } = frontNode;
  if (validateNode(grid, row - 1, col)) {
    queue.push(grid[row - 1][col]);
    grid[row - 1][col].isVisited = true;
    grid[row - 1][col].previousNode = frontNode;
  }
  if (validateNode(grid, row + 1, col)) {
    queue.push(grid[row + 1][col]);
    grid[row + 1][col].isVisited = true;
    grid[row + 1][col].previousNode = frontNode;
  }
  if (validateNode(grid, row, col - 1)) {
    queue.push(grid[row][col - 1]);
    grid[row][col - 1].isVisited = true;
    grid[row][col - 1].previousNode = frontNode;
  }
  if (validateNode(grid, row, col + 1)) {
    queue.push(grid[row][col + 1]);
    grid[row][col + 1].isVisited = true;
    grid[row][col + 1].previousNode = frontNode;
  }
}

//validate node for differnt conditions
function validateNode(grid, row, col) {
  if (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    grid[row][col].isVisited === false &&
    grid[row][col].isWall === false
  )
    return true;
  else return false;
}
//=================================
export default bfs;
