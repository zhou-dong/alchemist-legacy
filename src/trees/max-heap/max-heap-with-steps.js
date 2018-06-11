// Maximum Heap
// We can use array/list to representat complete binary tree
const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const getParentIndex = index => Math.floor((index - 1) / 2);

const isOutOfBound = (array, index) => index >= array.length;

class TreeNode {
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

const copyNode = node => {
  return new TreeNode(node.name, node.nodeSvgShape.shapeProps.fill);
};

const addStep = (array, steps) => {
  const copy = array
    .slice(0)
    .map(node => new Node(copyNode(node.value), node.priority));
  steps.push(copy);
};

const nodeSvgShape = color => ({
  shape: "circle",
  shapeProps: { r: 10, fill: color }
});

const updateNodeColor = (node, color) =>
  (node.value.nodeSvgShape = nodeSvgShape(color));

const clean = array => array.map(node => updateNodeColor(node, "yellow"));

const swap = (array, steps, index1, index2) => {
  clean(array);

  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  array[index1].value.nodeSvgShape = nodeSvgShape("lightgreen");
  array[index2].value.nodeSvgShape = nodeSvgShape("lightgreen");

  addStep(array, steps);
};

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

export default class MaxHeap {
  constructor() {
    this.array = [];
    this.steps = [];
  }

  insert(value, priority) {
    clean(this.array);
    this.array.push(new Node(value, priority));
    addStep(this.array, this.steps);
    this.heapifyBottomUp(this.array.length - 1);
  }

  remove() {
    if (this.array.length === 0) {
      return;
    }
    if (this.array.length === 1) {
      return this.array.pop();
    }
    const max = this.array[0];
    clean(this.array);
    updateNodeColor(max, "lightgreen");
    updateNodeColor(this.array[this.array.length - 1], "lightgreen");
    addStep(this.array, this.steps);
    this.array[0] = this.array.pop();
    addStep(this.array, this.steps);
    this.heapifyTopDown(0);
    return max;
  }

  get size() {
    return this.array.length;
  }

  heapifyBottomUp(index) {
    if (index <= 0) {
      return;
    }
    const parentIndex = getParentIndex(index);
    if (this.array[index].priority <= this.array[parentIndex].priority) {
      return;
    }
    swap(this.array, this.steps, index, parentIndex);
    this.heapifyBottomUp(parentIndex);
  }

  heapifyTopDown(index) {
    if (isOutOfBound(this.array, index)) {
      return;
    }
    const biggerChildIndex = this.getBiggerChildIndex(index);
    if (biggerChildIndex === -1) {
      return;
    }
    if (this.array[index].priority < this.array[biggerChildIndex].priority) {
      swap(this.array, this.steps, index, biggerChildIndex);
    }
    this.heapifyTopDown(biggerChildIndex);
  }

  getBiggerChildIndex(index) {
    const leftChildIndex = getLeftChildIndex(index);
    const rightChildIndex = getRightChildIndex(index);
    if (
      isOutOfBound(this.array, leftChildIndex) &&
      isOutOfBound(this.array, rightChildIndex)
    ) {
      return -1;
    }
    if (isOutOfBound(this.array, rightChildIndex)) {
      return leftChildIndex;
    }
    return this.array[leftChildIndex].priority >
      this.array[rightChildIndex].priority
      ? leftChildIndex
      : rightChildIndex;
  }
}
