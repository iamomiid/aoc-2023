import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/7.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.trim());

type Hand = [string, number];

const handMapper: Record<string, number> = {
  J: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  //   J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const typeFinder = (hand: string) => {
  const handCopy = "" + hand;
  const a = hand
    .replaceAll("J", "")
    .split("")
    .map((v) => handMapper[v]!);

  // Group array by value
  const grouped = a.reduce((acc: Record<number, number>, curr) => {
    if (!acc[curr]) {
      acc[curr] = 0;
    }
    acc[curr]++;
    return acc;
  }, {});

  const b = Object.values(grouped).sort((a, b) => b - a);

  if (handCopy.includes("J")) {
    const length = handCopy.split("J").length - 1;
    if (b.length) {
      b[0] += length;
    } else {
      b.push(length);
    }
  }

  switch (b.length) {
    case 1:
      return 7;
    case 2:
      return b[0] === 4 ? 6 : 5;
    case 3:
      return b[0] === 3 ? 4 : 3;
    case 4:
      return 2;
    case 5:
      return 1;
    default:
      throw new Error("Invalid hand");
  }
};

const compareHand = ([handA]: Hand, [handB]: Hand) => {
  const typeA = typeFinder(handA);
  const typeB = typeFinder(handB);

  if (typeA != typeB) return typeA - typeB;

  for (let i = 0; i < handA.length; i++) {
    const charA = handA[i]!;
    const charB = handB[i]!;

    if (charA != charB) return handMapper[charA]! - handMapper[charB]!;
  }

  throw new Error("Invalid hand");
};

const parse = () => {
  const hands = inputData
    .map((x) => x.split(" "))
    .map((v): Hand => [v[0]!, Number(v[1]!)]);

  const sortedHands = hands.sort(compareHand);

  return sortedHands.reduce((p, [_, score], i) => p + score * (i + 1), 0);
};

export const solve = async () => {
  return parse();
};
