import React from "react";
import Tree from "react-d3-tree";

import Heap from "./max-heap-with-steps";
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from "react-bootstrap";

const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const isOutOfBound = (array, index) => index >= array.length;
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const containerId = "max-heap";
const size = 10;
const max = 100;
const radius = 12;

class Node {
  constructor(name, color, children) {
    this.name = name + "";
    this.attributes = {};
    this.nodeSvgShape = {
      shape: "circle",
      shapeProps: { r: radius, fill: color, stroke: color }
    };
    this.children = children || [];
  }
}

const createHeap = (size, max) => {
  const heap = new Heap();
  Array(size)
    .fill(max)
    .map(random => getRandomInt(random))
    .forEach(e => heap.insert(new Node(e, "green", []), e));

  const removed = [];
  for (let i = 0; i < size; i += 1) {
    const max = heap.remove();
    removed.push(max.priority);
  }
  const datas = heap.steps.map(array => createTreeData(array));
  const data = createTreeData([]);
  const inHeapMemos = createInHeapMemos(heap.steps);
  const inHeapMemo = [];
  const removedMemos = createRemovedMemos(heap.steps, removed);
  const removedMemo = [];
  return {
    datas,
    data,
    inHeapMemos,
    inHeapMemo,
    removedMemos,
    removedMemo,
    removed
  };
};

const createRemovedMemos = (steps, removed) => {
  const result = steps.map(array => []);
  for (let i = result.length - 1; i >= 0; i--) {
    if (steps[i].length === size) {
      return result;
    }
    result[i] = removed.slice(0, size - steps[i].length);
  }
};

const createInHeapMemos = matrix =>
  matrix.map(array => array.map(item => item.priority));

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
  height: "33em",
  textAlign: "center",
  backgroundColor: ""
};

export default class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = Object.assign({}, createHeap(size, max));
    this.pop = this.pop.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this.removeInterval = this.removeInterval.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.refresh = this.refresh.bind(this);
    this.toolbar = this.toolbar.bind(this);
    this.getInHeapMemo = this.getInHeapMemo.bind(this);
    this.getRemovedMemo = this.getRemovedMemo.bind(this);
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
    this.setState({ popId: false });
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
      this.setState({
        data: createTreeData([]),
        datas: [],
        inHeapMemo: [],
        removedMemo: this.state.removed
      });
      return;
    }
    const datas = this.state.datas;
    const data = datas.shift();
    const inHeapMemos = this.state.inHeapMemos;
    const inHeapMemo = inHeapMemos.shift();
    const removedMemos = this.state.removedMemos;
    const removedMemo = removedMemos.shift();
    this.setState({
      data,
      datas,
      inHeapMemos,
      inHeapMemo,
      removedMemos,
      removedMemo
    });
  }

  play() {
    if (!this.state.popId) {
      this.startInterval();
    }
  }

  pause() {
    this.removeInterval();
  }

  refresh() {
    this.removeInterval();
    this.setState(Object.assign({}, createHeap(size, max)));
    this.play();
  }

  getInHeapMemo() {
    const btns = this.state.inHeapMemo.map((item, i) => (
      <Button bsSize="xsmall" bsStyle="info" key={i + 1}>
        {item}
      </Button>
    ));
    btns.unshift(
      <Button bsSize="xsmall" bsStyle="warning" key={0}>
        IN HEAP
      </Button>
    );
    return <ButtonGroup>{btns}</ButtonGroup>;
  }

  getRemovedMemo() {
    const btns = this.state.removedMemo.map((item, i) => (
      <Button bsSize="xsmall" bsStyle="info" key={i + 1}>
        {item}
      </Button>
    ));
    btns.unshift(
      <Button bsSize="xsmall" bsStyle="warning" key={0}>
        OUT HEAP
      </Button>
    );
    return <ButtonGroup>{btns}</ButtonGroup>;
  }

  toolbar() {
    return (
      <ButtonToolbar style={{ marginTo: 5, marginBottom: 5 }}>
        <ButtonGroup>
          <Button bsSize="small" bsStyle="success" onClick={this.play}>
            <Glyphicon glyph="play" /> play
          </Button>
          <Button bsSize="small" bsStyle="warning" onClick={this.pause}>
            <Glyphicon glyph="pause" /> pause
          </Button>
          <Button bsSize="small" bsStyle="danger" onClick={this.refresh}>
            <Glyphicon glyph="refresh" /> refresh
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  render() {
    return (
      <div id={containerId} style={containerStyles}>
        <h4>Heap and Priority Queue</h4>
        {this.toolbar()}
        <Tree
          textLayout={{ x: -7, y: 0 }}
          zoom={1}
          pathFunc="straight"
          data={this.state.data}
          orientation="vertical"
          translate={this.state.translate}
          collapsible={false}
          separation={{ siblings: 0.4, nonSiblings: 0.4 }}
          transitionDuration={0}
          zoomable={false}
        />
        <ButtonToolbar>{this.getInHeapMemo()}</ButtonToolbar>
        <ButtonToolbar style={{ marginTop: 5, marginBottom: 10 }}>
          {this.getRemovedMemo()}
        </ButtonToolbar>
      </div>
    );
  }
}
