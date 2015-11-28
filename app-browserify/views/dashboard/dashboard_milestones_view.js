var Backbone = require('backbone'),
    BaseView = require('../../views/baseview'),
    tpl = require('./templates/dashboard_milestones.tpl');

var ContentView =  BaseView.extend({
    className : 'milestones',
    template  : tpl,
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

module.exports = ContentView;