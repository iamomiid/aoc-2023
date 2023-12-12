import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/6.txt"))
  .toString()
  .split("\n");

const solveA = () => {
  const time = inputData[0]!
    .split("Time:")![1]!
    .trim()
    .split(" ")
    .map((v) => v.trim())
    .filter((x) => x)
    .map(Number);
  const distance = inputData[1]!
    .split("Distance:")![1]!
    .trim()
    .split(" ")
    .map((v) => v.trim())
    .filter((x) => x)
    .map(Number);

  return time
    .map(
      (t, j) =>
        new Array(t + 1)
          .fill(0)
          .map((_, i) => i * (t - i))
          .filter((x) => x > distance[j]!).length
    )
    .reduce((a, b) => a * b, 1);
};

const solveB = () => {
  const time = Number(
    inputData[0]!
      .split("Time:")![1]!
      .trim()
      .split("")
      .map((v) => v.trim())
      .filter((x) => x)
      .map(Number)
      .reduce((p, c) => `${p}${c}`, "")
  );
  const distance = Number(
    inputData[1]!
      .split("Distance:")![1]!
      .trim()
      .split("")
      .map((v) => v.trim())
      .filter((x) => x)
      .map(Number)
      .reduce((p, c) => `${p}${c}`, "")
  );

  return new Array(time)
    .fill(0)
    .map((_, i) => i * (time - i))
    .filter((x) => x > distance!).length;
};

export const solve = async () => {
  return solveB();
};
