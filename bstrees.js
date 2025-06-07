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

    const queue = [[this.root, 0]]; // Store [node, level]

    while (queue.length > 0) {
      const [currentNode, level] = queue.shift();
      callback(currentNode.data, level);

      if (currentNode.left) {
        queue.push([currentNode.left, level + 1]);
      }
      if (currentNode.right) {
        queue.push([currentNode.right, level + 1]);
      }
    }
  }
  
  levelOrderIteration(callback) {
    if (typeof callback !== "function") {
        throw new Error("A function is required");
    }

    const queue = [[this.root, 0]];  // Store [node, level] pairs
    const result = [];
    
    if (this.root === null) return result;
    
    while (queue.length > 0) {
        const [node, level] = queue.shift();
        callback(node.data, level);  // Pass both value and level to callback
        
        if (node.left) queue.push([node.left, level + 1]);
        if (node.right) queue.push([node.right, level + 1]);
    }
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
