import Typography from "@material-ui/core/Typography";
import styles from "../styles/Home.module.css";
import GameOfLife from "../components/GameOfLife";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Typography variant="h1">Conways Game of Life</Typography>
        <GameOfLife />
      </main>
    </div>
  );
}
