import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const numRows: number = 50;
const numCols: number = 50;
const cellWidth: number = 24

const blankGrid = [...Array<number[]>(numCols)].map((x) =>
    Array<number>(numRows).fill(0)
);

const useStyles = makeStyles(() => ({
    gridLayout: {
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, ${cellWidth}px)`
    },
    cell: {
        border: "1px solid black",
        width: cellWidth,
        height: cellWidth,
    },
}));

const GameOfLife: React.FC = () => {
    const [cellGrid, setCellGrid] = useState(blankGrid);
    const classes = useStyles();

    return (
        <div className={classes.gridLayout}>
            {cellGrid.map((cols, i) =>
                cols.map((row, j) => <div className={classes.cell} />)
            )}
        </div>
    );
};

export default GameOfLife;
