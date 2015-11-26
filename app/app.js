require([
    'views/globalview',
    'router/router',
    'Helpers'
], function(GlobalView, Router, Helpers) {

    var App = new GlobalView();
    App.start();

    var router = new Router();

    router.on('route:defaultRoute', function(actions, args) {
        if(!actions){
            router.navigate('dashboard/tasks', {trigger: true});
            return;
        }

        var stagesArray = actions.split('/'),
        	query = Helpers.getUrlVars(args);

        Backbone.trigger("change:page", {
            stagesArray: stagesArray,
            query: query
        });
    });

    
    Backbone.history.start();
});