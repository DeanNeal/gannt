//window.jQuery = require("jquery");
var Backbone       = require('backbone');
var $              = require('jquery');
var GlobalView     = require('views/globalview');
var Router         = require('router/router');
var Helpers        = require('base/helpers');
var Api            = require('base/api');
var ModelBinder    = require('base/backbone.modelbinder');

import ModelFactory from 'base/ModelFactory';


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

