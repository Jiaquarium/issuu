module.exports = {
    argsAsArray : function(fn, arr) {
        return fn.apply(null, arr);
    },

    speak : function(fn, obj) {
        return fn.call(obj);
    },

    functionFunction : function(str) {
        return function(str2) {
            return str + ', ' + str2;
        };
    },

    makeClosures : function(arr, fn) {
        return arr.map(function(item) { 
            return fn.bind(null, item);
        });
    },

    partial : function(fn, str1, str2) {
        return function(str3) {
            return fn(str1, str2, str3);
        };
    },

    useArguments : function() {
        /*  ES6:
            let args = [...arguments];
        */
        var args = Array.prototype.slice.call(arguments);

        return args.reduce(function(a, b) {
            return a + b;
        });
    },

    callIt : function(fn) {
        var argsToApply = Array.prototype.slice.call(arguments, 1);

        return fn.apply(null, argsToApply);
    },

    partialUsingArguments : function(fn) {
        var partialArgs = Array.prototype.slice.call(arguments, 1);

        return function() {
            var args2 = Array.prototype.slice.call(arguments);
            var allArgs = partialArgs.concat(args2);
            return fn.apply(null, allArgs);
        };
    },

    curryIt : function(fn) {
        var cap = fn.length; // get length we need to satisfy a valid invocation

        return function curry(int) {
            var args = Array.prototype.slice.call(arguments);

            if (args.length >= cap) {
                return fn.apply(null, args);
            } else {
                return function moreCurry(int) {
                    var args2 = Array.prototype.slice.call(arguments);

                    return curry.apply(null, args.concat(args2));
                }
            }
        }
    }
};

