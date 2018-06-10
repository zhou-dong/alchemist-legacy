import React from "react";
import Tree from "react-d3-tree";

import Heap from "utils/max-heap";

const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const isOutOfBound = (array, index) => index >= array.length;
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const translate = { x: 600, y: 50 };
const size = 15;
const max = 100;

class Node {
  constructor(name, color, children) {
    this.name = name + "";
    this.attributes = {};
    this.nodeSvgShape = {
      shape: "circle",
      shapeProps: { r: 10, fill: color }
    };
    this.children = children || [];
  }
}

const createTreeData = heap => {
  const array = heap.array;
  for (let i = 0; i < array.length; i += 1) {
    const leftChildIndex = getLeftChildIndex(i);
    const rightChildIndex = getRightChildIndex(i);
    const node = array[i].value;
    node.children = [];
    if (!isOutOfBound(array, leftChildIndex)) {
      node.children.push(array[leftChildIndex].value);
    }
    if (!isOutOfBound(array, rightChildIndex)) {
      node.children.push(array[rightChildIndex].value);
    }
  }
  return array.length === 0 ? [emptyNode] : [array[0].value];
};

const emptyNode = new Node("", "white", []);

const containerStyles = {
  width: "100%",
  height: "100vh",
  textAlign: "center"
};

export default class MyComponent extends React.Component {
  constructor() {
    super();
    const heap = new Heap();
    const data = createTreeData(heap);
    this.state = { data, heap };
    this.pop = this.pop.bind(this);
    this.add = this.add.bind(this);
  }

  componentDidMount() {
    const addId = setInterval(this.add, 3000);
    this.setState({ addId });
  }

  componentWillUnmount() {
    clearInterval(this.state.addId);
    clearInterval(this.state.popId);
  }

  add() {
    const heap = this.state.heap;
    if (heap.size < size) {
      const priority = getRandomInt(max);
      heap.insert(new Node(priority, "yellow", []), priority);
      const data = createTreeData(heap);
      this.setState({ heap, data });
    } else {
      clearInterval(this.state.addId);
      const popId = setInterval(this.pop, 3000);
      this.setState({ popId });
    }
  }

  pop() {
    const heap = this.state.heap;
    heap.remove();
    const data = createTreeData(heap);
    if (heap.size === 0) {
      clearInterval(this.state.countdown);
    }
    this.setState({ heap, data });
  }

  render() {
    return (
      <div id="max-heap" style={containerStyles}>
        <Tree
          pathFunc="diagonal"
          data={this.state.data}
          orientation="vertical"
          translate={translate}
          collapsible={false}
        />
      </div>
    );
  }
}
