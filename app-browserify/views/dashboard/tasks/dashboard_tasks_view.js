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
	},
	updateTaskList: function(query){
		this.api.getResousceFromCatalog('tasks', query).then(function (response) {
			this.collection = response.data;
			this.render(true);
		}.bind(this));
	}
});

var ContentView = BaseView.extend({
	className: 'tasks full-size have-filter',
	template: dashboardTpl,
	events: {
		'click .dashboard-table tr'         : 'changeTask',
		'click .close-icon'                 : 'closeEdit',
		'click .open-filter'			 	:'toggleFilter'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.addView(TasksFiltersView, {}, '.filters-container');
	},
	beforeLoad: function (params) {
		var deferred = $.Deferred();
		
		this.api.getResousceFromCatalog('tasks', params.query).then(function (response) {
			this.tasksCollection = response.data;
			this.taskList = this.addView(TaskList, {collection: response.data});
			this.renderNestedView(this.taskList, '.task-list');
			deferred.resolve(true);
		}.bind(this));

		return deferred.promise();
	},
	beforeChangeParams: function(params){
		if(params.query && (params.query.filter || params.query.sort))
			this.taskList.updateTaskList(params.query);
	},
	changeTask: function(e){
		var id   = $(e.currentTarget).data('id'),
			href = this.api.getUrl(this.tasksCollection, id);
		
		if(!this.editView){
			this.editView = this.addView(TaskEditView, {href: href});
			this.renderNestedView(this.editView, '.edit-block');
		}

		this.editView.updateModel(href);
	},
	closeEdit: function(){
		this.removeNestedView(this.editView);
		this.editView = undefined;
	},
	toggleFilter: function(e){
	    e.preventDefault();
	    this.getElement('.dashboard-table-header').toggle().toggleClass('active');
	    this.$el.toggleClass('have-sort');
	}
	
});

module.exports = ContentView;