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
		console.log(this.parent.tasksCollection);
		this.api.getResousceFromUrl(this.parent.tasksCollection, params.query.id).then(function(response){
			this.taskDescription = this.addView(TaskDescriptionView);
			this.renderNestedView(this.taskDescription);
		}.bind(this));
	},
	onRender: function () {
		this.parent.getElement('.bb-route-container').addClass('active-task');
	}
});

module.exports = ContentView;