import { useState } from "react";
import { styles } from "./DueDate.module";

export default function DueDate() {
  const [date, setDate] = useState();

  const handleClick = () => {
    console.log("click")
  }

  return (
    <div className={styles.date}>
      <input type="date" value="2025-07-22" />
		</div>
	)
}


