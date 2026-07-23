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

// prettier-ignore
const MIME_MAP = {
  "application/pdf": "file-pdf",
  "application/zip": "file-zipper",
  "application/x-zip-compressed": "file-zipper",
  "application/x-rar-compressed": "file-zipper",
  "application/json": "file-code",
  "application/javascript": "file-code",
  "text/html": "file-code",
  "text/css": "file-code",
  "text/csv": "file-csv",
  "application/msword": "file-word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "file-word",
  "application/vnd.ms-excel": "file-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "file-excel",
  "application/vnd.ms-powerpoint": "file-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "file-powerpoint",
};

export function getFileIcon(mimeType) {
  if (MIME_MAP[mimeType]) {
    return MIME_MAP[mimeType];
  }

  if (mimeType.startsWith("image/")) return "file-image";
  if (mimeType.startsWith("video/")) return "file-video";
  if (mimeType.startsWith("audio/")) return "file-audio";
  if (mimeType.startsWith("text/")) return "file-lines";

  return "file";
}
