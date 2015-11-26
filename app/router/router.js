define('router/router', function() {

    var Router = Backbone.Router.extend({
        routes: {
            "*route(/?:params)": 'defaultRoute'
        }
    });

    return Router;
});
