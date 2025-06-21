export function utils() {
  const changeDate = (date) => {
    if(date == null) return "未設定";

    const utcDate = new Date(date);
    const jstString = utcDate.toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
    });
    return jstString;
  };
  return {
    changeDate,
  };
}
