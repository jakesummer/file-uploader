export function formatDate(date) {
  return new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
