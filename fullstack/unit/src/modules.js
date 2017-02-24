module.exports = {
    createModule : function(str1, str2) {
      return {
        sayIt: function() {
          return this.greeting + ', ' + this.name;
        },
        greeting: str1,
        name: str2
      };
    }
};

