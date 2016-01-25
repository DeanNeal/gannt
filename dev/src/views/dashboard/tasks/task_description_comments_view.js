var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_comments.tpl');

var ContentView = BaseView.extend({
	className: 'comments full-size',
	template: tpl
});

module.exports = ContentView;