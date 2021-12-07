import { sum, multiply, divide, minus } from './Math/mathFunctions';

const a = 2;
const b = 3;

console.log(`This is a SUM(${a}, ${b}) test`, sum(a, b));
console.log(`This is a MULTIPLY(${a}, ${b}) test`, multiply(a, b));
console.log(`This is a MINUS(${a}, ${b}) test`, minus(a, b));
console.log(`This is a DIVIDE(${a}, ${b}) test`, divide(a, b));