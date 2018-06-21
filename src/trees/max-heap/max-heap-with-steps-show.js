import React from "react";
import Tree from "react-d3-tree";

import Heap from "./max-heap-with-steps";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  Modal
} from "react-bootstrap";

const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const isOutOfBound = (array, index) => index >= array.length;
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const containerId = "max-heap";
const size = 10;
const max = 100;
const radius = 12;

const introContent = `In computer science, a heap is a specialized tree-based data structure that satisfies the heap property: if P is a parent node of C, then the key (the value) of P is either greater than or equal to (in a max heap) or less than or equal to (in a min heap) the key of C. The node at the "top" of the heap (with no parents) is called the root node. <br/><br/>

The heap is one maximally efficient implementation of an abstract data type called a priority queue, and in fact priority queues are often referred to as "heaps", regardless of how they may be implemented. A common implementation of a heap is the binary heap, in which the tree is a binary tree. The heap data structure, specifically the binary heap, was introduced by J. W. J. Williams in 1964, as a data structure for the heapsort sorting algorithm. Heaps are also crucial in several efficient graph algorithms such as Dijkstra's algorithm. In a heap, the highest (or lowest) priority element is always stored at the root. A heap is not a sorted structure and can be regarded as partially ordered. As visible from the heap-diagram, there is no particular relationship among nodes on any given level, even among the siblings. When a heap is a complete binary tree, it has a smallest possible height—a heap with N nodes and for each node a branches always has log N height. A heap is a useful data structure when you need to remove the object with the highest (or lowest) priority. <br/><br/>

- WIKIPEDIA
`;

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
  height: "25em",
  textAlign: "center",
  backgroundColor: ""
};

export default class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = Object.assign(
      { showModal: false, closeModal: true },
      createHeap(size, max)
    );
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
    this.getIntro = this.getIntro.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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

  test() {
    return <div>xxxxx</div>;
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
      <Button bsSize="xsmall" bsStyle="primary" key={i + 1}>
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
      <Button bsSize="xsmall" bsStyle="primary" key={i + 1}>
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
      <ButtonGroup style={{ marginTo: 5, marginBottom: 5 }}>
        <Button bsSize="small" bsStyle="success" onClick={this.play}>
          <Glyphicon glyph="play" /> play
        </Button>
        <Button bsSize="small" bsStyle="warning" onClick={this.pause}>
          <Glyphicon glyph="pause" /> pause
        </Button>
        <Button bsSize="small" bsStyle="danger" onClick={this.refresh}>
          <Glyphicon glyph="repeat" /> refresh
        </Button>
      </ButtonGroup>
    );
  }

  openModal() {
    this.setState({ showModal: true });
    this.pause();
  }

  closeModal() {
    this.setState({ showModal: false });
    this.play();
  }

  getIntro() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.play}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title">
            Heaps and Priority Queues
          </Modal.Title>
        </Modal.Header>
        <Modal.Body dangerouslySetInnerHTML={{ __html: introContent }} />
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <div id={containerId} style={containerStyles}>
        <h4>
          Heap and Priority Queue&nbsp;
          <small>
            <Button bsSize="xsmall" bsStyle="info" onClick={this.openModal}>
              <Glyphicon glyph="question-sign" />
            </Button>
          </small>
        </h4>
        <ButtonToolbar>{this.getInHeapMemo()}</ButtonToolbar>
        <ButtonToolbar style={{ marginTop: 5, marginBottom: 5 }}>
          {this.getRemovedMemo()}
        </ButtonToolbar>
        <Tree
          textLayout={{ x: -7, y: 0 }}
          zoom={1}
          pathFunc="straight"
          data={this.state.data}
          orientation="vertical"
          translate={this.state.translate}
          collapsible={false}
          separation={{ siblings: 0.5, nonSiblings: 0.5 }}
          transitionDuration={0}
          zoomable={false}
          depthFactor={50}
        />
        {this.toolbar()}
        {this.getIntro()}
      </div>
    );
  }
}
