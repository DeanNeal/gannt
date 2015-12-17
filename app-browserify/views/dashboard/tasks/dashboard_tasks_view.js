var Backbone              = require('backbone'),
    $                     = require('jquery'),
    _                     = require('underscore'),
    BaseView              = require('views/baseview'),
    RoutedView            = require('views/routedview'),
    TasksFiltersView      = require('views/dashboard/tasks/tasks_filters_view.js'),
    TaskEditView          = require('views/dashboard/tasks/dashboard_tasks_edit_view'),
    dashboardTpl          = require('templates/dashboard/dashboard_tasks.tpl'),
    dashboardTasksListTpl = require('templates/dashboard/dashboard_tasks_list.tpl');

var TaskList = BaseView.extend({
	template: dashboardTasksListTpl,
	className: 'task-list',
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function () {
		this.data = _.clone({data: this.collection});
	}
});

var ContentView = RoutedView.extend({
	className: 'tasks full-size have-filter',
	template: dashboardTpl,
	routes: {
		'edit': TaskEditView
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);

		this.addView(TasksFiltersView, {}, '.filters-container');
	},
	beforeLoad: function (params) {
		var deferred = $.Deferred();

		this.api.getResousceFromCatalog('tasks').then(function (response) {
			this.tasksCollection = response.data;
			this.taskList = this.addView(TaskList, {collection: response.data});
			this.renderNestedView(this.taskList, '.task-list');
			deferred.resolve(true);
		}.bind(this));

		return deferred.promise();
	},
	beforeChangeStage: function (params) {
		var deferred = $.Deferred();
		this.serviceData = {
			href: this.api.getUrl(this.tasksCollection, params.query ? params.query.id : null)
		};
		deferred.resolve(true);
		return deferred.promise();
	}
});

module.exports = ContentView;