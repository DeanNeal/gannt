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
	events: {
		'click tr': 'changeTask'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function () {
		this.data = _.clone({data: this.collection});
	},
	changeTask: function(e){
		var url = $(e.currentTarget).data('href');
		
		Backbone.history.navigate(url, { trigger: true });
	}
});

var ContentView = BaseView.extend({
	className: 'tasks full-size have-filter',
	template: dashboardTpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		
		this.params = params;

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
	beforeChangeParams: function(params){
		this.beforeModelUpdate(params);
	},
	beforeModelUpdate: function(params){
		
		if(params.query && params.query.id){
			var href =  this.api.getUrl(this.tasksCollection, params.query ? params.query.id : null);
			if(!this.editView){
				this.editView = this.addView(TaskEditView, {href: href});
				this.renderNestedView(this.editView,  '.edit-block');
			}
			this.editView.updateModel(href);
		}

		if(!params.query && this.editView){
			this.editView.remove();
			this.editView = undefined;
		}
	}
	
});

module.exports = ContentView;