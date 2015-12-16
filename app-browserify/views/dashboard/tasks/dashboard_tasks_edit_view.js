var Backbone            = require('backbone'),
    _                   = require('underscore'),
    BaseView            = require('views/baseview'),
    TaskDescriptionView = require('views/dashboard/tasks/task_description_view'),
    tpl                 = require('templates/dashboard/dashboard_tasks_edit.tpl');

var ContentView = BaseView.extend({
	className: 'tasks-edit',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.addView(TaskDescriptionView, {data: {}});debugger
		this.api.getResourceFromUrl(this.parent.tasksCollection, params.query.id).then(function (response) {
			//this.addView(TaskDescriptionView, {data: response});debugger
		}.bind(this));
	},
	onRender: function () {
		this.parent.getElement('.bb-route-container').addClass('active-task');
	}
});

module.exports = ContentView;