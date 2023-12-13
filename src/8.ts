import fs from "fs";
import path from "path";

// Read the input file and split it into lines
const inputData = fs
  .readFileSync(path.resolve(__dirname, "./files/8.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.trim());

type Node = {
  L: string;
  R: string;
};

// Parse line like "AAA = (BBB, CCC)" into { step: "AAA", L: "BBB", R: "CCC"} object
const parseStep = (line: string): Node & { step: string } => {
  const [step, rest] = line.split(" = ");
  const [L, R] = rest!.slice(1, -1).split(", ");
  return { step: step!, L: L!, R: R! };
};

// GCD of two numbers
const gcd = (a: number, b: number): number => {
  if (a === 0) return b;
  return gcd(b % a, a);
};

// An efficient LCM function for number of arrays
const LCM = (arr: number[]) => {
  let ans = arr[0]!;
  for (let i = 1; i < arr.length; i++) {
    ans = (arr[i]! * ans) / gcd(arr[i]!, ans);
  }
  return ans;
};

const parse = () => {
  const instruction = inputData[0]!;

  const steps = inputData.slice(2!).map(parseStep);

  const paths = steps.reduce(
    (p, c) => ({ ...p, [c.step]: { L: c.L, R: c.R } }),
    {} as Record<string, Node>
  );

  return LCM(
    steps
      .filter((v) => v.step.endsWith("A"))
      .map((s) => {
        let instr = instruction.split(""),
          step = "" + s.step,
          count = 0;

        while (!step.endsWith("Z")) {
          const s = instr.shift()! as "L" | "R";
          step = paths[step]![s];

          count += 1;
          if (instr.length === 0) {
            instr = instruction.split("");
          }
        }

        return count;
      })
  );
};

export const solve = async () => {
  return parse();
};
