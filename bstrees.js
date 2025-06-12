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

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // Value already exists
        return;
      }
    }
  }

  delete(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.delete(value, root.left);
      return root;
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
      return root;
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let succ = root.right;
      while (succ.left !== null) {
        succ = succ.left;
      }
      root.data = succ.data;
      root.right = this.delete(succ.data, root.right);
      return root;
    }
  }

  find(value, root = this.root) {
    if (root === null) return null;

    if (value === root.data) return root;

    if (value < root.data) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  levelOrderRecursion(callback) {
    if (typeof callback !== "function") {
      throw new Error("A function is required");
    }

    if (!this.root) return [];

    // Helper function to get tree height
    const getHeight = (node) => {
      if (node === null) return 0;
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    // Helper function to process nodes at a specific level
    const processCurrentLevel = (node, level, currentLevel = 0) => {
      if (node === null) return;

      if (level === currentLevel) {
        callback(node.data, level);
      } else {
        processCurrentLevel(node.left, level, currentLevel + 1);
        processCurrentLevel(node.right, level, currentLevel + 1);
      }
    };

    // Process each level
    const height = getHeight(this.root);
    for (let level = 0; level < height; level++) {
      processCurrentLevel(this.root, level);
    }
  }

  levelOrderIteration(callback) {
    if (typeof callback !== "function") {
      throw new Error("A function is required");
    }

    const queue = [[this.root, 0]]; // Store [node, level] pairs
    const result = [];

    if (this.root === null) return result;

    while (queue.length > 0) {
      const [node, level] = queue.shift();
      callback(node.data, level); // Pass both value and level to callback

      if (node.left) queue.push([node.left, level + 1]);
      if (node.right) queue.push([node.right, level + 1]);
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A function is required");
    }

    // Helper function to do the recursive traversal
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A function is required");
    }

    // Helper function to do the recursive traversal
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A function is required");
    }

    // Helper function to do the recursive traversal
    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;

    const getHeight = (n) => {
      if (n === null) return -1;
      return 1 + Math.max(getHeight(n.left), getHeight(n.right));
    };

    return getHeight(node);
  }

  depth(value, node = this.root, level = 0) {
    if (node === null) return null;

    if (node.data === value) return level;

    if (value < node.data) {
      return this.depth(value, node.left, level + 1);
    } else {
      return this.depth(value, node.right, level + 1);
    }
  }

  isBalance(node = this.root) {
    // Helper function to get height and check balance
    const getNodeHeight = (node) => {
      if (node === null) return 0;

      const leftHeight = getNodeHeight(node.left);
      const rightHeight = getNodeHeight(node.right);

      // Return -1 to indicate unbalanced subtree
      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    // Convert height result to boolean
    return getNodeHeight(node) !== -1;
  }
  
  rebalance(node = this.root) {
    const newArray = [];
    this.inOrder((x) => newArray.push(x));
    const newArraySorted = this.sortingArray(newArray);
    this.root = this.buildTree(newArraySorted, 0, newArraySorted.length - 1);
    console.log(newArraySorted);
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
