
module.exports = {
    indexOf : function(arr, item) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    },

    sum : function(arr) {
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    },

    remove : function(arr, item) {
        let removed = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== item) {
                removed.push(arr[i]);
            }
        }
        return removed;
    },

    removeWithoutCopy : function(arr, item) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
        return arr;
    },

    append : function(arr, item) {
        let appended = arr.slice();
        appended.push(item);
        return appended;
    },

    truncate : function(arr) {
        let truncated = arr.slice();
        truncated.pop();
        return truncated;
    },

    prepend : function(arr, item) {
        let prepended = arr.slice();
        prepended.unshift(item);
        return prepended;
    },

    curtail : function(arr) {
        let curtailed = arr.slice();
        curtailed.shift();
        return curtailed;
    },

    concat : function(arr1, arr2) {
        // without using native concat
        let joined = arr1.slice();

        for (let i = 0; i < arr2.length; i++) {
            joined.push(arr2[i]);
        }
        return joined;
    },

    insert : function(arr, item, index) {
        // without using splice / mutating original array
        let inserted = [];

        for (let i = 0; i < arr.length; i++) {
            if (i === index) {
                inserted.push(item);
            }
            inserted.push(arr[i]);
        }
        return inserted;
    },

    count : function(arr, item) {
        let count = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                count++;
            }
        }
        return count;
    },

    duplicates : function(arr) {
        let cache = {};
        let dupes = [];

        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];

            if (!cache[item]) {
                cache[item] = 0;
            }
            if (cache[item] === 1) {
                dupes.push(item);
            }
            cache[item]++;
        }
        return dupes;
    },

    square : function(arr) {
        let squared = [];

        for (let i = 0; i < arr.length; i++) {
            squared.push(Math.pow(arr[i], 2));
        }
        return squared;
    },

    findAllOccurrences : function(arr, target) {
        let occurences = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                occurences.push(i);
            }
        }
        return occurences;
    }
};
