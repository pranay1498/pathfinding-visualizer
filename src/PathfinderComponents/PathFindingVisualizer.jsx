import React from "react";
import Node from "./Node";
import dijkstra from "../algorithms/dijkstra";

const START_NODE_ROW = 9;
const START_NODE_COL = 20;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 40;
//froming main grid
class PathFindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
      isWorking: false,
    };
  }

  componentDidMount() {
    //making the grid
    const grid = getInitialGrid();

    //set state for grid
    this.setState({
      grid: grid,
    });
  }

  async visualiseDijsktra() {
    if (this.state.isWorking === true) return;
    this.setState({
      isWorking: true,
    });

    //deep copy state
    const grid = this.state.grid.map((row) => {
      return row.map((item) => {
        return { ...item };
      });
    });
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    this.animateDijkstra(visitedNodesInOrder, startNode, finishNode);
  }

  animateShortestPath(visitedNodesInOrder, startNode, finishNode) {
    let path = [];
    let currNode = visitedNodesInOrder[visitedNodesInOrder.length - 1];
    while (currNode !== startNode) {
      path.push(currNode);
      currNode = currNode.previousNode;
    }
    path = path.reverse();
    for (let ind = 0; ind < path.length; ind++) {
      if (ind === path.length - 1) {
        setTimeout(() => {
          this.setState({
            isWorking: false,
          });
        }, 25 * ind);
        return;
      }
      setTimeout(() => {
        //changing state directly because rendering full board takes time and application lags
        const newgrid = this.state.grid;
        const node = newgrid[path[ind].row][path[ind].col];
        node.isPath = true;
        document.getElementById("node" + node.row + "-" + node.col).className =
          "node isPath";
      }, 25 * ind);
    }
  }
  animateDijkstra(visitedNodesInOrder, startNode, finishNode) {
    for (let ind = 1; ind < visitedNodesInOrder.length; ind++) {
      if (ind === visitedNodesInOrder.length - 1) {
        setTimeout(
          () =>
            this.animateShortestPath(
              visitedNodesInOrder,
              startNode,
              finishNode
            ),
          20 * ind
        );
        return;
      }
      //setstate with delay
      setTimeout(() => {
        const node = visitedNodesInOrder[ind];
        const newgrid = this.state.grid;
        //deep copy grid state
        //const newgrid = this.state.grid; .slice(0);
        // const nodeToChange = newgrid[node.row][node.col];
        // const newnode = {
        //   ...nodeToChange,
        //   isVisited: true,
        // };
        // newgrid[node.row][node.col] = newnode;
        // this.setState({
        //   grid: newgrid,
        // });

        //changing state directly because rendering full board takes time and application lags
        newgrid[node.row][node.col].isVisited = true;
        document.getElementById("node" + node.row + "-" + node.col).className =
          "node isVisited";
      }, 20 * ind);
    }
  }

  handleMouseDown(row, col) {
    const grid = getGridWithWallToggled(this.state.grid, row, col);
    this.setState({
      grid: grid,
      isMousePressed: true,
    });
  }
  handleMouseEnter(row, col) {
    if (this.state.isMousePressed === false) return;
    const grid = getGridWithWallToggled(this.state.grid, row, col);
    this.setState({
      grid: grid,
      isMousePressed: true,
    });
  }
  handleMouseUp() {
    this.setState({
      isMousePressed: false,
    });
  }
  clearBoard() {
    if (this.state.isWorking === true) return;
    const initialGrid = getInitialGrid();
    this.setState({
      grid: initialGrid,
    });
  }
  render() {
    const { grid } = this.state;
    return (
      <div>
        <button onClick={() => this.visualiseDijsktra()}>
          Visualise Dijkstra
        </button>
        <button onClick={() => this.clearBoard()}>Clear Board</button>
        <p>Click and slowly drag on grid to add walls!!</p>
        <div className="grid">
          {grid.map((row, rowidx) => {
            return (
              <div key={rowidx}>
                {row.map((node, nodeidx) => {
                  return (
                    <Node
                      key={"" + rowidx + nodeidx}
                      isStart={node.isStart}
                      isEnd={node.isEnd}
                      row={rowidx}
                      col={nodeidx}
                      isVisited={node.isVisited}
                      isWall={node.isWall}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      isPath={node.isPath}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function getInitialGrid() {
  const grid = [];
  for (let i = 0; i < 20; i++) {
    const row = [];
    for (let j = 0; j < 60; j++) {
      row.push(createNode(i, j));
    }
    grid.push(row);
  }
  return grid;
}

function createNode(row, col) {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    distance: Infinity,
    isWall: false,
    previousNode: null,
    isPath: false,
  };
}

function getGridWithWallToggled(grid, row, col) {
  const newgrid = grid;
  const node = newgrid[row][col];
  const newNode = {
    ...node,
    isWall: true,
  };
  newgrid[row][col] = newNode;
  return newgrid;
}
//==================================================
export default PathFindingVisualizer;
