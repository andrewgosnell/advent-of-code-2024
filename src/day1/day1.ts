import { readFileSync } from "fs";
const filePath = "./input.txt";

const message: string = "Hello world!\n************\n";
console.log(message);

const fileString: string[] = readFileSync(filePath, "utf8").split("\n");

const getUnsortedList = (lineArray: string[], leftOrRight: number) => {
  const output: number[] = lineArray.map((line: string): number => {
    return Math.abs(parseInt(line.split("   ")[leftOrRight]));
  });
  return output;
};

const sortList = (list: number[]) => {
  return list.toSorted((a, b) => a - b);
};

const differenceTotal = (listA: number[], listB: number[]) => {
  const listASorted: number[] = sortList(listA);
  const listBSorted: number[] = sortList(listB);

  const differences: number[] = listASorted.map(
    (value: number, index: number) => {
      const difference: number = value - listBSorted[index];
      return Math.abs(difference);
    }
  );
  // const output: number = differences.reduce((acc, value) => acc + value);
  const output: number = sumOfArray(differences);
  return output;
};

const sumOfArray = (arr: number[]): number => {
  return arr.reduce((acc, value) => acc + value);
};

const leftListUnsorted = getUnsortedList(fileString, 0);
const rightListUnsorted = getUnsortedList(fileString, 1);

const leftListSorted = sortList(leftListUnsorted);
const rightListSorted = sortList(rightListUnsorted);

const part1Answer: number = differenceTotal(leftListSorted, rightListSorted);

console.log(part1Answer);

/**
 * Part 2
 *
 */

const findNumberOfInstancesInList = (
  numberToFind: number,
  list: number[]
): number => {
  const output = list.reduce((acc, value) => {
    const add: number = value === numberToFind ? 1 : 0;
    return acc + add;
  }, 0);
  return output;
};

const instancesArray: number[] = leftListSorted.map((value: number) => {
  const timesInList: number = findNumberOfInstancesInList(
    value,
    rightListSorted
  );
  return value * timesInList;
});

const part2Answer = sumOfArray(instancesArray);

console.log(part2Answer);
