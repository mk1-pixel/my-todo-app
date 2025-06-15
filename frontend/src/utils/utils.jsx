export function utils() {
  const changeDate = (date) => {
    const utcDate = new Date(date);
    const jstString = utcDate.toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return jstString;
  };
  return {
    changeDate,
  };
}
