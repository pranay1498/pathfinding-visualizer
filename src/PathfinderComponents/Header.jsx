import React from "react";
import allAlgorithms from "../algorithms/algorithmsIndex";
class Header extends React.Component {
  render() {
    const { onClear, selectedAlgorithm } = this.props;
    return (
      <div>
        <button onClick={() => selectedAlgorithm(allAlgorithms.dijkstra)}>
          Visualise Dijkstra
        </button>
        <button onClick={() => selectedAlgorithm(allAlgorithms.bfs)}>
          Visualise BFS
        </button>
        <button onClick={() => onClear()}>Clear Board</button>
        <p>Click and slowly drag on grid to add walls!!</p>
      </div>
    );
  }
}

export default Header;
