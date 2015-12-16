var Backbone = require('backbone'),
    _        = require('underscore'),
    BaseView = require('views/baseview'),
    tpl      = require('templates/dashboard/dashboard_task_description.tpl');

var ContentView = BaseView.extend({
	className: 'tasks-edit',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		//this.api.getResousceFromCatalog('task-id').then(function (response) {
		//	this.taskList = this.addView(taskList, {collection: response.data});
		//	this.renderNestedView(this.taskList);
		//}.bind(this));
	}
});

module.exports = ContentView;