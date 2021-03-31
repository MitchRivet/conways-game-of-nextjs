import React, { useCallback, useEffect, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import produce from "immer";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import Slider from "@material-ui/core/Slider/Slider";
import Grid from "@material-ui/core/Grid/Grid";
import {
  numRows,
  numCols,
  cellWidth,
  blankGrid,
  createRandomGrid,
  neighborChecks,
  defaultGrid,
} from "./constants";

const useStyles = makeStyles(() => ({
  gridLayout: {
    display: "grid",
    gridTemplateColumns: `repeat(${numCols}, ${cellWidth}px)`,
  },
  cell: {
    border: "1px solid black",
    width: cellWidth,
    height: cellWidth,
    cursor: "pointer",
  },
  alive: {
    backgroundColor: "green",
  },
  dead: {
    backgroundColor: "white",
  },
  padBottom: {
    paddingBottom: 16,
  },
}));

const GameOfLife: React.FC = () => {
  const [cellGrid, setCellGrid] = useState<number[][]>(defaultGrid);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [simulationInterval, setSimulationInterval] = useState<number>(500);
  const gameRunningRef = useRef(isGameRunning);
  const classes = useStyles();

  const changeSlider = (event: any, newInterval: number) => {
    setSimulationInterval(newInterval as number);
  };

  const simulate = useCallback(() => {
    if (!gameRunningRef.current) {
      return;
    }
    // Any live cell with two or three live neighbours survives.
    // Any dead cell with three live neighbours becomes a live cell.
    // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    const aliveOrDead = (cell, neighbors) => {
      if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
        return 1;
      } else if (cell === 0 && neighbors >= 3) {
        return 1;
      }
      return 0;
    };

    const inRange = (num, a, b) => {
      return num >= a && num < b;
    };

    setCellGrid((currentGrid) =>
      produce(currentGrid, (draft) => {
        draft.forEach((row, i) => {
          row.forEach((col, j) => {
            let neighborCount = 0;
            neighborChecks.forEach(([x, y]) => {
              const neighborX = x + i;
              const neighborY = y + j;

              if (
                inRange(neighborX, 0, numRows) &&
                inRange(neighborX, 0, numRows)
              ) {
                neighborCount += currentGrid[neighborX][neighborY];
              }
            });

            draft[i][j] = aliveOrDead(draft[i][j], neighborCount);
          });
        });
      })
    );

    setTimeout(simulate, simulationInterval);
  }, [simulationInterval]);

  useEffect(() => {
    if (isGameRunning) {
      simulate();
    }
  }, [isGameRunning]);

  return (
    <Grid
      container
      className={classes.padBottom}
      direction="column"
      spacing={4}
    >
      <Grid item>
        <div className={classes.gridLayout}>
          {cellGrid.map((cols, i) =>
            cols.map((row, j) => {
              const livingState =
                cellGrid[i][j] === 0 ? classes.dead : classes.alive;

              return (
                <div
                  key={`${i}${j}`}
                  className={`${classes.cell} ${
                    cellGrid[i][j] === 0 ? classes.dead : classes.alive
                  }`}
                  onClick={() => {
                    setCellGrid(
                      produce(cellGrid, (draft) => {
                        draft[i][j] = draft[i][j] ? 0 : 1;
                        return draft;
                      })
                    );
                  }}
                />
              );
            })
          )}
        </div>
      </Grid>

      <Grid item container direction="column" spacing={2}>
        <Grid
          container
          className={classes.padBottom}
          direction="row"
          item
          spacing={3}
        >
          <Grid item>
            <Button
              variant="contained"
              color={isGameRunning ? "secondary" : "primary"}
              onClick={() => {
                gameRunningRef.current = !isGameRunning;
                setIsGameRunning(!isGameRunning);
              }}
            >
              {isGameRunning ? "Stop" : "Start"}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={isGameRunning}
              onClick={() => setCellGrid(createRandomGrid())}
            >
              Randomize
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              disabled={isGameRunning}
              onClick={() => setCellGrid(blankGrid)}
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        <Grid item className={classes.padBottom}>
          <Typography id="simulation-interval" gutterBottom>
            Simulation Speed
          </Typography>
          <Slider
            aria-labelledby="simulation-interval"
            disabled={isGameRunning}
            marks
            min={100}
            max={2000}
            onChange={changeSlider}
            step={100}
            value={simulationInterval}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameOfLife;
