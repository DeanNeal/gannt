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
    createLinks: function(links, stage) {
        var array = [];
        links.forEach(function(item, i) { 
            array[i] = {
               id: item.id,
               route: stage + '/' + item.id,
               name: item.name 
            };
        });
        return array;
    },
    createMenuLinks: function(menuLinks){
        return menuLinks.map(function(item, i) { 
            item.route = item.id;
            switch (item.id){
                case 'dashboard':
                    item.route = item.id + '/tasks';
                    break;
                case 'finance':
                    item.route = item.id + '/transactions';
                    break;
            }

            return item;
        });
    }
};

module.exports = Helpers;