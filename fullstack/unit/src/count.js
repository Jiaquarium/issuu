module.exports = {
    count : function (start, end) {
      let i = start;
      let intervalID = setInterval(function () {
        console.log(i);
        if (++i > end) {
          clearInterval(intervalID);
        }
      }, 100);
      
      // give reference to intervalID through closure
      let cancel = function () {
        clearInterval(intervalID);
      };
      return {
        cancel : function() {
          cancel(intervalID)
        }
      };
    }
};