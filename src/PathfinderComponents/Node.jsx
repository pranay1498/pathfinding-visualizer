import React from "react";

class Node extends React.Component {
  render() {
    const {
      row,
      col,
      isStart,
      isEnd,
      isVisited,
      isWall,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      isPath,
    } = this.props;
    const classname =
      "node" +
      (isStart
        ? " node-start"
        : isEnd
        ? " node-finish"
        : isWall
        ? " node-Wall"
        : isPath
        ? " isPath"
        : isVisited
        ? " isVisited"
        : "");
    const id = "node" + row + "-" + col;
    return (
      <div
        id={id}
        className={classname}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
      ></div>
    );
  }
}

export default Node;
