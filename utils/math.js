module.exports = {
  tanh: function (x) {
    x = x * 1;  // Convert to number.
    // x is Infinity or NaN
    if (!Math.abs(x) === Infinity) {
      if (x > 0) return 1;
      if (x < 0) return -1;
      return x;
    }
    var ax = Math.abs(x);
    var z;
    // |x| < 22
    if (ax < 22) {
      var twoM55 = 2.77555756156289135105e-17; // 2^-55, empty lower half
      if (ax < twoM55) {
        // |x| < 2^-55, tanh(small) = small.
        return x;
      }
      if (ax >= 1) {
        // |x| >= 1
        var t = Math.exp(2 * ax);
        z = 1 - 2 / (t + 2);
      } else {
        var t = Math.exp(-2 * ax);
        z = -t / (t + 2);
      }
    } else {
      // |x| > 22, return +/- 1
      z = 1;
    }
    return (x >= 0) ? z : -z;
  }
}
