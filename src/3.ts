import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/3.txt"))
  .toString()
  .split("\n");

// Define the symbols to be checked
const symbols = ["*", "+", "=", "%", "-", "#", "@", "/", "&", "$"];

// Function to check if any symbol is present in the adjacent characters
const hasSymbol = (adjacentChars: string[]): boolean =>
  adjacentChars.some((char) => symbols.includes(char));

// Function to get adjacent characters (including diagonals)
export const getAdjacentChars = (
  lines: string[],
  rowIndex: number,
  columnIndex: number
): string[] => {
  const adjacentChars = [];
  const currentLine = lines[rowIndex];

  // Check if there is a line above the current line
  if (lines[rowIndex - 1]) {
    adjacentChars.push(lines[rowIndex - 1]?.[columnIndex - 1] ?? "");
    adjacentChars.push(lines[rowIndex - 1]?.[columnIndex] ?? "");
    adjacentChars.push(lines[rowIndex - 1]?.[columnIndex + 1] ?? "");
  } else {
    adjacentChars.push("", "", "");
  }

  // Get characters from the current line
  adjacentChars.push(currentLine?.[columnIndex - 1] ?? "");
  adjacentChars.push(currentLine?.[columnIndex + 1] ?? "");

  // Check if there is a line below the current line
  if (lines[rowIndex + 1]) {
    adjacentChars.push(lines[rowIndex + 1]?.[columnIndex - 1] ?? "");
    adjacentChars.push(lines[rowIndex + 1]?.[columnIndex] ?? "");
    adjacentChars.push(lines[rowIndex + 1]?.[columnIndex + 1] ?? "");
  } else {
    adjacentChars.push("", "", "");
  }

  return adjacentChars;
};

// Function to solve problem A
const solveA = () => {
  const collectedNumbers = [];

  let currentNumber = "",
    isSerialNumber = false; // Number can go to another line!
  for (const [rowIndex, line] of inputData.entries()) {
    for (const [columnIndex, char] of line.split("").entries()) {
      const isNumber = !Number.isNaN(Number(char));

      if (isNumber) {
        currentNumber += char;
        const adjacentChars = getAdjacentChars(
          inputData,
          rowIndex,
          columnIndex
        );

        if (hasSymbol(adjacentChars)) {
          isSerialNumber = true;
        }
      } else {
        if (isSerialNumber) {
          collectedNumbers.push(Number(currentNumber));
        }

        currentNumber = "";
        isSerialNumber = false;
      }
    }
  }

  return collectedNumbers.reduce((a, b) => a + b, 0);
};

// Function to get gear id
const getGearId = (
  index: number,
  rowIndex: number,
  columnIndex: number
): string => {
  if (index < 3) {
    return `${rowIndex - 1}-${columnIndex - 1 + index}`;
  } else if (index === 3) {
    return `${rowIndex}-${columnIndex - 1}`;
  } else if (index === 4) {
    return `${rowIndex}-${columnIndex + 1}`;
  } else {
    return `${rowIndex + 1}-${columnIndex - 6 + index}`;
  }
};

// Function to solve problem B
const solveB = () => {
  const collectedNumbers: { num: number; gear: string }[] = [];

  let currentNumber = "",
    isSerialNumber = false,
    gearId = "";
  for (const [rowIndex, line] of inputData.entries()) {
    for (const [columnIndex, char] of line.split("").entries()) {
      const isNumber = !Number.isNaN(Number(char));

      if (isNumber) {
        currentNumber += char;
        const adjacentChars = getAdjacentChars(
          inputData,
          rowIndex,
          columnIndex
        );

        if (adjacentChars.includes("*")) {
          const index = adjacentChars.indexOf("*");
          gearId = getGearId(index, rowIndex, columnIndex);
          isSerialNumber = true;
        }
      } else {
        if (isSerialNumber) {
          collectedNumbers.push({ num: Number(currentNumber), gear: gearId });
        }

        currentNumber = "";
        isSerialNumber = false;
        gearId = "";
      }
    }
  }

  // Group numbers by gear id
  const groupedNumbers = Object.values(
    collectedNumbers.reduce((map, { num, gear }) => {
      if (!map[gear]) {
        map[gear] = [];
      }

      map[gear]!.push(num);

      return map;
    }, {} as Record<string, number[]>)
  )
    .filter((numbers) => numbers.length === 2)
    .reduce(
      (total, numbers) =>
        total + numbers.reduce((product, number) => product * number, 1),
      0
    );

  return groupedNumbers;
};

// Function to solve the problem
export const solve = async () => {
  return solveB();
};
