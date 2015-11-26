define('Helpers', function() {
    return {
        getUrlVars: function(args) {
            if(!args) return null;
            
            var vars = {},
                hash, hashes = args.split('&');

            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');

                debugger
                vars[hash[i]] = hash[i+1];
            }

            return vars;
        }
    }
});
