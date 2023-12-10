import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const input = fs
	.readFileSync(path.resolve(__dirname, "./files/1.txt"))
	.toString()
	.split("\n");

// Define valid string representations of numbers
const validNumberStrings = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

// Create a map of valid string representations to their numeric values
const numberStringToValueMap = validNumberStrings.reduce((map, val, i) => {
	map[val] = i % 10;
	return map;
}, {} as Record<string, number>);

// Function to find the first occurrence of a valid number string in a line
const findNumberStringInLine =
	(validNumberStrings: string[]) => (line: string) => {
		for (const numberString of validNumberStrings) {
			if (line.includes(numberString))
				return numberStringToValueMap[numberString];
		}
		return undefined;
	};

// Function to extract the first and last number from a line
const extractNumbersFromLine = (line: string) => {
	let currentIndex = 0,
		firstNumber = 0,
		lastNumber = 0;

	const findNumberString = findNumberStringInLine(validNumberStrings);

	// Find the first number
	for (; currentIndex < line.length; currentIndex++) {
		const number = findNumberString(line.slice(0, currentIndex + 1));

		if (number) {
			firstNumber = number;
			break;
		}
	}

	currentIndex = line.length - 1;

	// Find the last number
	for (; currentIndex >= 0; currentIndex--) {
		const number = findNumberString(line.slice(currentIndex, line.length));

		if (number) {
			lastNumber = number;
			break;
		}
	}

	return Number(`${firstNumber}${lastNumber}`);
};

const solve = async () => {
	console.log(input.map(extractNumbersFromLine).reduce((a, b) => a + b, 0));
};

solve();
