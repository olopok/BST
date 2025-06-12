import { Tree } from "./bstrees.js";

const array = [23, 5, 5, 80, 67, 80];
const tree = new Tree(array);
tree.insert(68);
tree.insert(54);
tree.insert(2);
tree.insert(99);
tree.insert(101);
tree.insert(105);
tree.insert(110);
tree.insert(120);
tree.delete(67);
console.log(tree.find(80));
tree.prettyPrint();

// Create separate arrays for each traversal method
const levelsRecursive = [];
const levelsIterative = [];
const inOrder = [];
const postOrder = [];
const preOrder = [];

// Callback for recursive traversal
const processNodeRecursive = (value, level) => {
  if (!levelsRecursive[level]) {
    levelsRecursive[level] = [];
  }
  levelsRecursive[level].push(value);
  return value;
};

// Callback for iterative traversal
const processNodeIterative = (value, level) => {
  if (!levelsIterative[level]) {
    levelsIterative[level] = [];
  }
  levelsIterative[level].push(value);
  return value;
};

// Call methods with separate callbacks
tree.levelOrderRecursion(processNodeRecursive);
tree.levelOrderIteration(processNodeIterative);

// Log results separately
console.log("Levels with recursion:\n", levelsRecursive);
console.log("Levels with iteration:\n", levelsIterative);

tree.inOrder((x) => inOrder.push(x));
console.log("In Order:", inOrder);

tree.postOrder((x) => postOrder.push(x));
console.log("Post Order:", postOrder);

tree.preOrder((x) => preOrder.push(x));
console.log("Pre Order:", preOrder);

const height = tree.height(99);
console.log('Height:', height);

const depth = tree.depth(98);
console.log('Depth:', depth);

console.log('Is balanced?:', tree.isBalance())

tree.rebalance()
tree.prettyPrint();
console.log('Is balanced the new BST?:', tree.isBalance())

