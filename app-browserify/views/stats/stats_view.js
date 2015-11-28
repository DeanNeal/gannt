var Backbone = require('backbone'),
    BaseView = require('../../views/baseview'),
    tpl = require('./submenu.tpl');

    var ContentView = BaseView.extend({
        tagName: 'div',
        template: tpl,
        className: 'stats',
        router: true,
        routes: {

        },
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

module.exports = ContentView;
