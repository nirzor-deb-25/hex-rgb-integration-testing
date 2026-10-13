/**
 * Converts a six-digit hexadecimal colour into RGB channel values.
 *
 * @param {string} hex - Six hexadecimal digits, optionally prefixed with #.
 * @returns {{r: number, g: number, b: number}} Channels from 0 to 255.
 * @throws {TypeError} If the input is not a string.
 * @throws {Error} If the string is not a supported hexadecimal colour.
 */
function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Hex colour must be a string.');
  }

  if (!/^#?[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error('Hex colour must contain exactly six hexadecimal digits, optionally prefixed with #.');
  }

  const digits = hex.startsWith('#') ? hex.slice(1) : hex;

  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16)
  };
}

module.exports = { hexToRgb };
