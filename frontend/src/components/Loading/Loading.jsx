import { styles } from "./Loading.module";

export default function Loading() {
  return (
    <>
      <div className={styles.LoadScreen}>
        <div className={styles.pulse} aria-label="読み込み中">
          <div className={styles.spin}></div>
        </div>
      </div>
    </>
  );
}
