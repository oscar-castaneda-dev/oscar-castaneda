export function formatDate(inputDate: string) {
  const [day, month, year] = inputDate.split("/");

  return `${new Date(+year, +month - 1).toLocaleDateString("default", {
    month: "long",
  })} ${day} ${year}`;
}
