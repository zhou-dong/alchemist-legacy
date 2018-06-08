// Maximum Heap
// We can use array/list to representat complete binary tree

const getLeftChildIndex = index => 2 * index + 1;
const getRightChildIndex = index => 2 * index + 2;
const getParentIndex = index => Math.floor((index - 1) / 2);

const isOutOfBound = (array, index) => index >= array.length;
const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

export default class MaxHeap {
  constructor() {
    this.array = [];
  }

  insert(value) {
    this.array.push(value);
    this.heapifyBottomUp(this.array.length - 1);
  }

  remove() {
    const max = this.array[0];
    this.array[0] = this.array.pop();
    this.heapifyTopDown(0);
    return max;
  }

  heapifyBottomUp(index) {
    if (index <= 0) {
      return;
    }
    const parentIndex = getParentIndex(index);
    if (this.array[index] <= this.array[parentIndex]) {
      return;
    }
    swap(this.array, index, parentIndex);
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
    if (this.array[index] < this.array[biggerChildIndex]) {
      swap(this.array, index, biggerChildIndex);
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
    return this.array[leftChildIndex] > this.array[rightChildIndex]
      ? leftChildIndex
      : rightChildIndex;
  }
}

// const test = () => {
//   const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

//   const assertSmaller = array => {
//     for (let i = 1; i < array.length; i += 1) {
//       if (array[i - 1] < array[i]) {
//         throw "this array is not going smaller";
//       }
//     }
//   };

//   const heap = new MaxHeap();
//   const size = 20;
//   const randomMax = 100;
//   const results = [];

//   for (let i = 0; i < size; i += 1) {
//     heap.insert(getRandomInt(randomMax));
//   }

//   for (let i = 0; i < size; i += 1) {
//     results.push(heap.remove());
//   }
//   console.log(results);
//   assertSmaller(results);
// };

// test();
