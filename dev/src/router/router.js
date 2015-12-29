var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        "*route(?:params)": 'cubeggRoute'
    }
});

module.exports = Router;