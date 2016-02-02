//window.jQuery = require("jquery");
import "babel-polyfill";

var Backbone       = require('backbone');
var $              = require('jquery');
var GlobalView     = require('views/globalview');
var Router         = require('router/router');
var Helpers        = require('base/helpers');
var Api            = require('base/api');
var ModelBinder    = require('base/backbone.modelbinder');

import ModelFactory from 'base/ModelFactory';
import 'base/plugins/customSelectList';

let api = Api.getInstance('/api/v1/system/catalog');

api.getCatalog().then(function() {
    let App = new GlobalView();
    App.start();
    Backbone.history.start();
});

let router = new Router();

router.on('route:cubeggRoute', function(actions, args) {

    if (!actions) {
        router.navigate('dashboard/tracker', {
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

