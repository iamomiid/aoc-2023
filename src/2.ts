import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
    .readFileSync(path.resolve(__dirname, "./files/2.txt"))
    .toString()
    .split("\n");

// The answer array
const targetValues = [12, 13, 14];

// Mapping of color names to indices
const colorToIndexMap = { red: 0, green: 1, blue: 2 } as Record<string, number>;

// Function to check if a round is solvable
const isRoundSolvable = (roundValues: number[]) =>
    targetValues.every((targetValue, index) => targetValue >= roundValues[index]!);

// Function to check if a game is solvable
const isGameSolvable = (gameValues: number[][]) => gameValues.every(isRoundSolvable);

// Function to parse game info from a line of input
const parseGameInfo = (inputLine: string) => {
    const [gameLabel, colorCombinationsString] = inputLine.split(":");
    const colorCombinations = colorCombinationsString!.split(";");

    return [
        Number(gameLabel!.trim().split(" ")[1]),
        colorCombinations.map((colorCombination) =>
            colorCombination
                .split(",")
                .map((colorValue) => colorValue.trim())
                .reduce(
                    (colorValues, colorValue) => {
                        const [value, color] = colorValue.split(" ");
                        colorValues[colorToIndexMap[color!]!] += Number(value);
                        return colorValues;
                    },
                    [0, 0, 0] as number[]
                )
        ),
    ] as const;
};

// Function to solve part A of the problem
const solvePartA = () => {
    const games = inputData.map(parseGameInfo);
    const totalSum = games
        .map(([gameID, colorCombinations]): [number, boolean] => [gameID, isGameSolvable(colorCombinations)])
        .filter(([_, gameIsSolvable]) => gameIsSolvable).map(([gameID]) => gameID).reduce((a, b) => a + b, 0);
    return totalSum
}

// Function to solve part B of the problem
const solvePartB = () => {
    const games = inputData.map(parseGameInfo);
    return games.map(([_, colorCombinations]) => {
        const maxValues = [0, 0, 0];
        colorCombinations.forEach((roundValues) => {
            roundValues.forEach((value, index) => {
                if (maxValues[index]! < value) {
                    maxValues[index] = value
                }
            })
        })
        return maxValues.reduce((a, b) => a * b, 1)
    }).reduce((a, b) => a + b, 0);
}

// Function to solve the problem
export const solve = async () => {
    return solvePartB()
};