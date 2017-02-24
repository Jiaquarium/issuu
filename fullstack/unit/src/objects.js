module.exports = {
    alterContext : function(fn, obj) {
      return fn.call(obj);
    },

    alterObjects : function(constructor, greeting) {
      constructor.prototype.greeting = greeting;
    },

    iterate : function(obj) {
      var output = [];
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          output.push(k + ': ' + obj[k]);
        }
      }
      return output;
    }
};
