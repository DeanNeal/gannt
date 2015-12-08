var Helpers = {
    getUrlVars: function(args) {
        if(!args) return null;
        
        var vars = {},
            hash, hashes = args.split('&');

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[i]] = hash[i+1];
        }

        return vars;
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