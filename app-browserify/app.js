//window.jQuery = require("jquery");
var Backbone       = require('backbone'),
    $              = require('jquery'),
    GlobalView     = require('views/globalview'),
    Router         = require('router/router'),
    Helpers        = require('helpers'),
    Api            = require('api'),
    ModelBinder    = require('backbone.modelbinder');
 

var api = Api.getInstance('build/api/catalog.json');

api.getCatalog().then(function() {
    var App = new GlobalView();
    App.start();
    Backbone.history.start();
});


var router = new Router();

router.on('route:cubeggRoute', function(actions, args) {

    if (!actions) {
        router.navigate('dashboard/tasks', {
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

