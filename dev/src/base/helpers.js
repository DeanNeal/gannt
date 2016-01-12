var $ = require('jquery');

var Helpers = {
    getUrlVars: function(args) {
        if(!args) return null;
        var params = {}, queries, temp, i, l;
        
        // Split into key/value pairs
        queries = args.split("&");
        
        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        
        return params;
    },
    serializeModel: function(model) {
        if(!model) return null;

        return Object.keys(model).map(function(key){ 
            return encodeURIComponent(key) + '=' + encodeURIComponent(model[key]);
        }).join('&');
    },
    createLinks: function(links, stage) {
        var array = [];
        links.forEach(function(item, i) { 
            array[i] = item;
            array[i].route = stage + '/' + item.id;
        });
        return array;
    },
    // createMenuLinks: function(menuLinks){
    //     return menuLinks.map(function(item, i) { 
    //         item.route = item.id;
    //         switch (item.id){
    //             case 'dashboard':
    //                 item.route = item.id + '/tasks';
    //                 break;
    //             case 'finance':
    //                 item.route = item.id + '/transactions';
    //                 break;
    //         }

    //         return item;
    //     });
    // },
    findById: function (collection, id) {
        var model = collection.find(function(model) { return model.get('id') == id; });
        
        return model;
    },
    searchEngine: function(str, list, startCount) {
         var valueWords = str.split(" ").join(")(?=.*"),
             end = ').*',
             pattern = new RegExp("(?=.*" + valueWords + end, 'ig');

         if (str.length > (startCount ? startCount : 0)) {
             list.find('li').map(function(i, item) {
                var testVal = $(item).text().replace(/\s\s+/g, ' ');
                $(item).toggleClass('hide', !pattern.test(testVal));
             });
         } else
            list.find('li').removeClass('hide');
     }
};

module.exports = Helpers;