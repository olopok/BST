import { Tree } from "./bstrees.js";


const array=[23, 5, 5, 80, 67, 80];
const tree = new Tree(array)
tree.insert(68)
tree.insert(54)
tree.insert(2)
tree.insert(99)
tree.delete(67)
console.log(tree.find(80))
tree.prettyPrint()