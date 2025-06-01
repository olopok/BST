class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    const sortedArray = this.sortingArray(array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  sortingArray(array) {
    //sorting and removing duplicates values
    return Array.from(
      new Set(
        array.sort(function (a, b) {
          return a - b;
        })
      )
    );
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    const root = new Node(array[mid]);

    // Create left subtree
    root.left = this.buildTree(array, start, mid - 1);

    // Create right subtree
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }
    
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
