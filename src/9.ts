import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/9.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.trim());

const getNext = (line: string) => {
  let numbers = line
    .split(" ")
    .map((v) => v.trim())
    .map(Number);

  const history: number[][] = [];

  while (!numbers.every((v) => v === 0)) {
    history.push(numbers);
    numbers = new Array(numbers.length - 1)
      .fill(0)
      .map((_, i) => numbers[i + 1]! - numbers[i]!);
  }
  history.push(numbers);

  //   return history.reduceRight((p, c) => {
  //     return c.at(-1)! + p;
  //   }, 0);

  return history.reduceRight((p, c) => {
    return c.at(0)! - p;
  }, 0);
};

export const solve = async () => {
  return inputData.map(getNext).reduce((a, b) => a + b, 0);
};
