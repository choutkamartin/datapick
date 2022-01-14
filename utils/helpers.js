// Simple helper function that returns a list of classes joined together with a space as a separator
export function joinClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Simple helper function that returns the size of a file in a human readable format
export function formatBytes(bytes, decimals) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
