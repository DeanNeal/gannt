var $ = require('jquery');

var Helpers = {
    getUrlVars: function (args) {
        if (!args) return null;
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = args.split("&");

        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            if(temp[1])
                params[temp[0]] = temp[1];
        }

        return params;
    },
    serializeModel: function (model) {
        if (!model) return null;

        return Object.keys(model).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(model[key]);
        }).join('&');
    },
    findById: function (collection, id) {
        var model = collection.find(function (model) {
            return model.get('id') == id;
        });

        return model;
    },
    searchEngine: function (str, list, startCount) {
        var valueWords = str.split(" ").join(")(?=.*"),
            end        = ').*',
            pattern    = new RegExp("(?=.*" + valueWords + end, 'ig');

        if (str.length > (startCount ? startCount : 0)) {
            list.find('li').map(function (i, item) {
                var testVal = $(item).text().replace(/\s\s+/g, ' ');
                $(item).toggleClass('hide', !pattern.test(testVal));
            });
        } else
            list.find('li').removeClass('hide');
    },
    timeDifference: function (date) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = new Date() - new Date(date.replace(' ', 'T'));

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    },
    formatDate: function (date) {
        //noinspection JSDuplicatedDeclaration
        var date = new Date(date.replace(' ', 'T'));
        return date.toLocaleDateString('en-GB');
    }

};

module.exports = Helpers;