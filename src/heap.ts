export type CompareFunction<T> = (a: T, b: T) => number

export class Heap<T> {
  private data: T[] = []
  constructor(private compareFunction: CompareFunction<T>) { }

  private left(nodeIndex: number): number {
    // 2n + 1 to find left child
    return (2 * nodeIndex) + 1
  }

  private right(nodeIndex: number): number {
    // 2n + 2 to find right child
    return (2 * nodeIndex) + 2
  }

  private parent(nodeIndex: number): number {
    // reverse logic
    return nodeIndex % 2 === 0 ? (nodeIndex - 2) / 2 : (nodeIndex - 1) / 2
  }

  // O(logn)
  add(element: T) {
    this.data.push(element)
    this.siftUp(this.data.length - 1)
  }

  private siftUp(index: number): void {
    let parent = this.parent(index)
    // while we haven't reached the peek and current node is smaller than parent node, swap
    while (index > 0 && this.compareFunction(this.data[parent], this.data[index]) > 0) {
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]] 
      index = parent
      parent = this.parent(index)
    }
  }

  extractRoot(): T | null {
    if (this.data.length > 0) {
      const root = this.data[0]
      const last = this.data.pop()
      if (this.data.length > 0) {
        this.data[0] = last
        this.siftDown(0)
      }
      return root
    }
    return null
  }

  private siftDown(nodeIndex: number): void {
    // utility fn, returns index of smaller value among child pair
    const minIndex = (left: number, right: number) => {
      // if right child is out of range
      if (right >= this.data.length) {
        // and left child is out of range
        if (left >= this.data.length) {
          return -1
        } else {
          // right is out of range, left is what is left (pun unintended)
          return left
        }
      } else {
        // right is not out of range => left is not either 
        if (this.compareFunction(this.data[left], this.data[right]) <= 0) {
          return left
        } else {
          return right
        }
      }
    }

    // compare left and right children of input index
    let min = minIndex(this.left(nodeIndex), this.right(nodeIndex))
    
    // while there are children nodes and input index is smaller than child
    while (min >= 0 && this.compareFunction(this.data[nodeIndex], this.data[min]) >= 0) {
      [this.data[min], this.data[nodeIndex]] = [this.data[nodeIndex], this.data[min]]
      nodeIndex = min
      min = minIndex(this.left(nodeIndex), this.right(nodeIndex))
    }
  }

  size() {
    return this.data.length
  }

  peek(): T | undefined {
    if (this.data.length > 0) {
      return this.data[0]
    } else {
      return undefined
    }
  }
}
