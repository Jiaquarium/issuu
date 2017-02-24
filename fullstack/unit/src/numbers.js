module.exports = {
    valueAtBit: function(num, bit) {
      var mask = 1 << (bit - 1);
      var masked_num = num & mask;

      return masked_num >> (bit - 1);
    },

    base10: function(str) {
      return parseInt(str, 2);
    },

    convertToBinary: function(num) {
      const BIT_CONST = 8;
      var string = num.toString(2);
      var pad = Array(BIT_CONST - string.length + 1).join('0');

      return pad.concat(string);
    },

    multiply: function(a, b) {
      // find what precision we need to go to
      var aPrecision = a % 1 === 0 ? 0 : a.toString().split('.')[1].length;
      var bPrecision = b % 1 === 0 ? 0 : b.toString().split('.')[1].length;

      var largeA = a * Math.pow(10, aPrecision);
      var largeB = b * Math.pow(10, bPrecision);
      return (largeA * largeB) / Math.pow(10, aPrecision + bPrecision);
    }
};
