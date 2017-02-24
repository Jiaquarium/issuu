module.exports = {
    containsNumber : function(str) {
        var re = /[0-9][0-9]*/;
        return re.test(str);
    },

    containsRepeatingLetter : function(str) {
        var re = /([a-zA-Z]).*?\1/;
        return re.test(str);
    },

    endsWithVowel : function(str) {
        var re = /[aeiouAEIOU]$/;
        return re.test(str);
    },

    captureThreeNumbers : function(str) {
        var re = /\d{3}/;
        return str.match(re) !== null ? str.match(re)[0] : false;
    },

    matchesPattern : function(str) {
        var re = /^\d{3}-\d{3}-\d{4}$/;
        return re.test(str);
    },
    isUSD : function(str) {
        var re = /^[$][0-9]{1,3}(?:,[0-9]{3})*(\.[0-9]{2})?$/;
        return re.test(str);
    }
};
