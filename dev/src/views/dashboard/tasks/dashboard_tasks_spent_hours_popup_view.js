var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_spent_hours_popup.tpl');

var ContentView = BaseView.extend({
	className: 'spent-hours',
	template: tpl,
	events: {
		'click .btn-submit'    : "submitCount"
	},
	submitCount: function() {
		var hours = this.getElement('.hours-count').val();

		if (hours)
			this.parent.trigger('spentHours:submit', hours);
	}
});

module.exports = ContentView;