import React from "react";
import Tree from "react-d3-tree";

import Heap from "./max-heap-with-steps";
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from "react-bootstrap";

const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const isOutOfBound = (array, index) => index >= array.length;
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const containerId = "max-heap";
const size = 15;
const max = 100;

const radius = 15;

class Node {
  constructor(name, color, children) {
    this.name = name + "";
    this.attributes = {};
    this.nodeSvgShape = {
      shape: "circle",
      shapeProps: { r: radius, fill: color }
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
  textAlign: "center",
  backgroundColor: ""
};

const separation = { siblings: 1, nonSiblings: 1 };

export default class MyComponent extends React.Component {
  constructor() {
    super();
    const datas = createHeap(size, max);
    const data = createTreeData([]);
    this.state = { datas, data };
    this.pop = this.pop.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this.removeInterval = this.removeInterval.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    this.startInterval();
    this.setTranslate();
  }

  startInterval() {
    const popId = setInterval(this.pop, 3000);
    this.setState({ popId });
  }

  removeInterval() {
    clearInterval(this.state.popId);
    this.setState({ popId: "" });
  }

  componentWillUnmount() {
    this.removeInterval();
  }

  setTranslate() {
    const width = document.getElementById(containerId).offsetWidth;
    const translate = { x: width / 2, y: 17 };
    this.setState({ translate });
  }

  pop() {
    if (this.state.datas.length === 0) {
      this.removeInterval();
      this.setState({ data: createTreeData([]), datas: [] });
      return;
    }
    const datas = this.state.datas;
    const data = datas.shift();
    this.setState({ data, datas });
  }

  play() {
    if (!this.state.popId) {
      this.startInterval();
    }
  }

  pause() {
    this.removeInterval();
  }

  render() {
    return (
      <div id={containerId} style={containerStyles}>
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsSize="large" onClick={this.play}>
              <Glyphicon glyph="play" /> play
            </Button>
            <Button bsSize="large" onClick={this.pause}>
              <Glyphicon glyph="pause" /> pause
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        <Tree
          textLayout={{ x: -7, y: 0 }}
          zoom={1}
          pathFunc="straight"
          data={this.state.data}
          orientation="vertical"
          translate={this.state.translate}
          collapsible={false}
          separation={separation}
        />
      </div>
    );
  }
}
