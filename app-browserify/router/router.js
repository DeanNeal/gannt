var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        "*route(/?:params)": 'defaultRoute'
    }
});

module.exports = Router;