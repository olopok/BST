import { Tree } from "./bstrees.js";

const array = [23, 5, 5, 80, 67, 80];
const tree = new Tree(array);
tree.insert(68);
tree.insert(54);
tree.insert(2);
tree.insert(99);
tree.delete(67);
console.log(tree.find(80));
tree.prettyPrint();

// Create separate arrays for each traversal method
const levelsRecursive = [];
const levelsIterative = [];

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
console.log("Levels with recursion:", levelsRecursive);
console.log("Levels with iteration:", levelsIterative);
