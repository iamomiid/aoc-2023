import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/4.txt"))
  .toString()
  .split("\n");

const getLineOverlap = (line: string): number => {
  const [winningCard, card] = line.split("|");
  const winning = winningCard!.split(":")[1];
  const winningCombination = winning!
    .trim()
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map(Number);
  const cardCombination = card!
    .trim()
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map(Number);

  const overlap = cardCombination.filter((v) =>
    winningCombination.includes(v)
  ).length;

  return overlap;
};

const getLineScore = (line: string): number => {
  const overlap = getLineOverlap(line);
  return overlap === 0 ? 0 : Math.pow(2, overlap - 1);
};

const solveA = () => {
  return inputData.map(getLineScore).reduce((a, b) => a + b, 0);
};

const solveB = () => {
  const answer = [];
  const cards = inputData.map(() => 1);

  let index: number = 0,
    count: number | undefined = cards.shift();

  while (count != undefined) {
    const line = inputData[index]!;
    const overlap = getLineOverlap(line);
    for (let i = 0; i < overlap; i++) {
      cards[i] += 1 * count;
    }
    answer.push(count!);
    count = cards.shift();
    index++;
  }

  return answer.reduce((a, b) => a + b, 0);
};

export const solve = async () => {
  return solveB();
};
