/**
 * A helper function for returning a string containing classes separated by spaces
 * @param  {...any} classes A list of classes
 * @returns Classes joined together
 */
export function joinClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * A helper function that converts bytes to a human readable format
 * @param {number} bytes A filesize in bytes
 * @param {number} decimals The number of decimal points the function should output
 * @returns A filesize in a readable format
 */
export function formatBytes(bytes, decimals) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
