export const numRows: number = 40;
export const numCols: number = 40;
export const cellWidth: number = 16;

export const blankGrid = [...Array<number[]>(numCols)].map((x) =>
  Array<number>(numRows).fill(0)
);

export const createRandomGrid = () =>
  [...Array<number[]>(numCols)].map((x) =>
    Array<number>(numRows)
      .fill(0)
      .map(() => (Math.random() > 0.7 ? 1 : 0))
  );

export const neighborChecks: Array<number[]> = [
  [-1, 0], // left
  [-1, 1], // top left
  [0, 1], // top
  [1, 1], // top right
  [1, 0], // right
  [1, -1], // bottom right
  [0, -1], // bottom
  [-1, -1], // bottom left
];
