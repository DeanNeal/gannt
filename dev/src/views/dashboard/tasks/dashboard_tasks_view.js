var Backbone              	  = require('backbone'),
    Helpers                   = require('base/helpers'),
    $                     	  = require('jquery'),
    _                     	  = require('underscore'),
    BaseView              	  = require('views/baseview'),
    RoutedView            	  = require('views/routedview'),
    TasksFiltersView      	  = require('views/dashboard/tasks/tasks_filters_view.js'),
    TaskEditView          	  = require('views/dashboard/tasks/dashboard_tasks_edit_view'),
    dashboardTpl          	  = require('templates/dashboard/dashboard_tasks.tpl'),
    //dashboardTasksListTpl 	  = require('templates/dashboard/dashboard_tasks_list.tpl'),
    dashboardTasksListItemTpl = require('templates/dashboard/dashboard_tasks_list_item.tpl');


var TaskListItem = BaseView.extend({
	template: dashboardTasksListItemTpl,
	className: 'task-list-item',
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function () {
		this.data = _.clone(this.model.attributes);
	}
});


var TaskList = BaseView.extend({
	// template: dashboardTasksListTpl,
	// className: 'task-list',
	className: 'dashboard-table',
	tagName: 'div',
	events: {
	    'click .task-list-item .row'                     : 'changeTask',
	    'click .close-icon'                              : 'closeEdit'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function () {
		this.data = _.clone({data: this.collection});
	},
	updateTaskList: function(query){
		// this.api.getResousceFromCatalog('tasks', query).then(function (response) {
		// 	this.collection = response.data;
		// 	this.render(true);

		// 	if(this.editView)
		// 		this.closeEdit();
		// }.bind(this));

		var tasksModel = new Backbone.Model();
		tasksModel.getResource('build/api/tasks.json').then(function(tasks) {
			this.collection = tasks;

			this.collection.each(function(model) {
			    this.addView(TaskListItem, {model: model});
			}.bind(this));
			this.render(true);

		}.bind(this));
	},
	changeTask: function(e){
		var id   = $(e.currentTarget).data('id'),
			model = Helpers.findById(this.collection, id);

		// model.get_tasks().then(function(task){
		// 	debugger
		// });

		if(!this.editView){
			this.editView = this.addView(TaskEditView/*, {model: model}*/);
			this.renderNestedView(this.editView);
		}

		this.editView.updateModel(model);
	},
	closeEdit: function(){
		this.removeNestedView(this.editView);
		this.editView = undefined;
	}
});

var ContentView = BaseView.extend({
	className: 'tasks full-size have-filter',
	template: dashboardTpl,
	events: {
		'click .open-filter'			 	: 'toggleFilter'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.taskList = this.addView(TaskList, {collection: {}}, '.task-list');
		this.filter = this.addView(TasksFiltersView, {query: params.query}, '.filters-container');
	},
	onChangeParams: function(params){
		this.taskList.updateTaskList(params.query);
		this.filter.updateFilterModel(params.query);
	},
	toggleFilter: function(e){
	    e.preventDefault();
	    this.getElement('.dashboard-table-header').toggle().toggleClass('active');
	    this.$el.toggleClass('have-sort');
	}
	
});

module.exports = ContentView;