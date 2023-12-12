import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/5.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.trim());

const getMap = (startIndex: number) => {
  let i = startIndex + 1,
    line = inputData[i]!;
  const map = {} as Record<number, number>;
  while (line != "" && i < inputData.length) {
    const [destination, source, range] = line.split(" ").map(Number);
    for (let i = 0; i < range!; i++) {
      map[source! + i] = destination! + i;
    }
    i++;
    line = inputData[i]!;
  }

  return map;
};

const getOrDefault = (map: Record<number, number>, k: number) => {
  return map[k] ?? k;
};

const solveA = () => {
  const seeds = inputData[0]!
    .split("seeds: ")[1]!
    .trim()
    .split(" ")
    .map(Number);

  const mapTitles = [
    "seed-to-soil map:",
    "soil-to-fertilizer map:",
    "fertilizer-to-water map:",
    "water-to-light map:",
    "light-to-temperature map:",
    "temperature-to-humidity map:",
    "humidity-to-location map:",
  ];

  const maps = mapTitles.map((title) => {
    const index = inputData.indexOf(title);
    return getMap(index);
  });

  const locations = seeds.map((seed) =>
    new Array(mapTitles.length).fill(0).reduce<number>((p, _, i) => {
      const map = maps[i]!;
      return getOrDefault(map, p);
    }, seed)
  );

  return Math.min(...locations);
};

export const solve = async () => {
  return solveA();
};
