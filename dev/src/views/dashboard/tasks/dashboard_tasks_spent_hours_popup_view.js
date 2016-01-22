var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_spent_hours_popup.tpl');

var ContentView = BaseView.extend({
	className: 'spent-hours',
	template: tpl
});

module.exports = ContentView;