import { styles } from "./Complete.module";

export default function Complete({ complete, onClick }) {
  return (
    <>
      <div className={styles.completeArea}>
        <h1 className={styles.title}>完了</h1>
        <div className={styles.completeListArea}>
          <ul className={styles.completeUl}>
            {complete.map((task, index) => (
              <li key={index} className={styles.completeLi}>
                <span className={styles.completeSpan}>{task.title}</span>
                <div className={styles.completeButtonArea}>
                  <button className={styles.completeButtonBack} onClick={() => onClick(task, index)}>戻す</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
