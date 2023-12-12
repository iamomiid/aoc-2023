import fs from "fs";
import path from "path";

type Range = [number, number, number];

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
  const map: Range[] = [];

  while (line != "" && i < inputData.length) {
    const [destination, source, range] = line.split(" ").map(Number);
    map.push([source!, destination!, range!]);
    i++;
    line = inputData[i]!;
  }

  return map;
};

const getOrDefault = (map: Range[], k: number) => {
  for (const [from, to, range] of map) {
    if (k < from + range && k >= from) return to + k - from;
  }
  return k;
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

const getMapB = (startIndex: number) => {
  let i = startIndex + 1,
    line = inputData[i]!;
  const map: Range[] = [];

  while (line != "" && i < inputData.length) {
    const [destination, source, range] = line.split(" ").map(Number);
    map.push([source!, source! + range! - 1, destination! - source!]);
    i++;
    line = inputData[i]!;
  }

  return map;
};

const solveB = () => {
  const seeds = inputData[0]!
    .replace("seeds: ", "")
    .split(" ")
    .map((x) => parseInt(x.trim()));
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
    return getMapB(index);
  });

  const seedsMap = seeds
    .map((val, index, array) => {
      if (index % 2 === 0) {
        return [array[index]!, array[index]! + array[index + 1]! - 1, -1];
      }
    })
    .filter((val) => val);

  let candidateSeeds: number[] = [];
  loop: while (seedsMap.length > 0) {
    let [seedMin, seedMax, depth] = seedsMap.pop()!;

    if (depth === maps.length - 1) {
      candidateSeeds.push(seedMin!);
      continue loop;
    }

    for (const [sourceMin, sourceMax, diff] of maps[depth! + 1]!) {
      if (seedMin! <= sourceMax! && sourceMin! <= seedMax!) {
        const intersect: number[] = [
          Math.max(seedMin!, sourceMin!),
          Math.min(seedMax!, sourceMax!),
        ];
        seedsMap.push([
          intersect[0]! + diff!,
          intersect[1]! + diff!,
          depth! + 1,
        ]);

        if (seedMin! < intersect[0]!) {
          seedsMap.push([seedMin!, intersect[0]! - 1, depth!]);
        }

        if (seedMax! > intersect[1]!) {
          seedsMap.push([intersect[1]! + 1, seedMax!, depth!]);
        }

        continue loop;
      }
    }

    if (!candidateSeeds.includes(seedMin!)) {
      seedsMap.push([seedMin!, seedMax!, depth! + 1]);
    }

    continue loop;
  }

  return Math.min(...candidateSeeds);
};

export const solve = async () => {
  return solveB();
};
