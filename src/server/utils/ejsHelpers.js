export function formatDate(date) {
  return new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// adapted from: https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
export function formatBytes(bytes) {
  if (bytes == 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
