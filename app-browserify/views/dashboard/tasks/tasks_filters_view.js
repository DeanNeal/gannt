var Backbone = require('backbone'),
	_        = require('underscore'),
    BaseView = require('views/baseview'),
    tpl      = require('templates/dashboard/tasks/tasks_filters.tpl');

var ContentView =  BaseView.extend({
	template: tpl,
    className : 'filters',
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

module.exports = ContentView;