var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_status_report.tpl');

var ContentView = BaseView.extend({
	className: 'status-report full-size',
	template: tpl
});

module.exports = ContentView;