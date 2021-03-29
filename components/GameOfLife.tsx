import React from "react";

const numRows: number = 50
const numCols: number = 50

const blankGrid = [...Array<number[]>(numCols)].map(x => Array<number>(numRows).fill(0))

const GameOfLife: React.FC = () => {

    return <div>testing </div>;
}

export default GameOfLife;
