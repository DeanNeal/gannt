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
        links.map(function(item) {
            item.id = stage + '/' + item.id;
        });
        return links;
    }
};

module.exports = Helpers;