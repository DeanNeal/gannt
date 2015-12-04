var Backbone   = require('backbone'),
    $          = require('jquery'),
    GlobalView = require('./views/globalview'),
    Router     = require('./router/router'),
    Helpers    = require('./Helpers'),
    Api        = require('api');
 

var api = Api.getInstance('build/catalog.json')

api.getCatalog().then(function() {
    var App = new GlobalView();
    App.start();
    Backbone.history.start();
});


var router = new Router();

router.on('route:defaultRoute', function(actions, args) {
    
    if (!actions) {
        router.navigate('dashboard', {
            trigger: true
        });
        return;
    }

    var stagesArray = actions.split('/'),
        query = Helpers.getUrlVars(args);

    Backbone.trigger("change:page", {
        stagesArray: stagesArray,
        query: query
    });
});

