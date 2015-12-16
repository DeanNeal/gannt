var Backbone = require('backbone'),
    _        = require('underscore'),
    BaseView = require('views/baseview'),
    tpl      = require('templates/dashboard/dashboard_task_description.tpl');

var ContentView = BaseView.extend({
	className: 'tasks-description',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function(params) {
		console.log(params);
		this.data = _.clone(params.data);
	}
});

module.exports = ContentView;