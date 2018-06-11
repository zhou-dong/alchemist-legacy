import React from "react";
import Tree from "react-d3-tree";

import Heap from "./max-heap-with-steps";

const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const isOutOfBound = (array, index) => index >= array.length;
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const translate = { x: 450, y: 15 };
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

const createHeap = (size, max) => {
  const heap = new Heap();
  Array(size)
    .fill(max)
    .map(random => getRandomInt(random))
    .forEach(e => heap.insert(new Node(e, "lightgreen", []), e));

  for (let i = 0; i < size; i += 1) {
    heap.remove();
  }
  return heap.steps.map(array => createTreeData(array));
};

const createTreeData = array => {
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
  height: "50em",
  textAlign: "center"
};

export default class MyComponent extends React.Component {
  constructor() {
    super();
    const datas = createHeap(size, max);
    const data = createTreeData([]);
    this.state = { datas, data };
    this.pop = this.pop.bind(this);
  }

  componentDidMount() {
    const popId = setInterval(this.pop, 3000);
    this.setState({ popId });
  }

  componentWillUnmount() {
    clearInterval(this.state.popId);
  }

  pop() {
    if (this.state.datas.length === 0) {
      clearInterval(this.state.popId);
      this.setState({ data: createTreeData([]), datas: [] });
      return;
    }
    const datas = this.state.datas;
    const data = datas.shift();
    this.setState({ data, datas });
  }

  render() {
    return (
      <div id="max-heap" style={containerStyles}>
        <Tree
          textLayout={{ x: -7, y: 0 }}
          zoom={1}
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
