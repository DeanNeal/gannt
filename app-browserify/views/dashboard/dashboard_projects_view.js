var Backbone = require('backbone'),
    BaseView = require('../../views/baseview'),
    tpl = require('./templates/dashboard_projects.tpl');

var ContentView = BaseView.extend({
    className : 'projects',
    template  : tpl,
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

module.exports = ContentView;