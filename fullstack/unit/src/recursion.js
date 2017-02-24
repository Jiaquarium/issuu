module.exports = {
    listFiles: function(data, dirName) {
        var results = [];

        var checkFiles = function(data, found = false) {
            if (data.dir === dirName) {
              found = true;
            }
            if (!data.files) {
              if (found) {
                results.push(data);
              }
              return;
            }
            for (var i = 0; i < data.files.length; i++) {
                checkFiles(data.files[i], found);
            }
        }
        checkFiles(data);
        return results;
    },

    permute: function(arr) {
        var results = [];
        
        var permutate = function(arr, prefix) {
            if (!arr.length) {
                results.push(prefix);
            } else {
                for (var i = 0; i < arr.length; i++) {
                    var rem = arr.slice(0, i).concat(arr.slice(i + 1));
                    permutate(rem, prefix.concat(arr[i]))
                }
            }
        }
        permutate(arr, []);
        return results;
    },

    fibonacci: function(n) {
        var cache = {};
        var findFibonacci = function(n) {
            if (cache[n]) {
                return cache[n];
            }
            if (n <= 0) {
                return 0;
            }
            if (n === 1) {
                return 1;
            }
            var fib = findFibonacci(n - 1) + findFibonacci(n - 2);
            cache[n] = fib;
            return fib;
        }
        return findFibonacci(n);
    },

    validParentheses: function(n) {

    }
};
