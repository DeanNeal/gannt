var Backbone              = require('backbone'),
    $                     = require('jquery'),
    _                     = require('underscore'),
    BaseView              = require('views/baseview'),
    RoutedView            = require('views/routedview'),
    TasksFiltersView      = require('views/dashboard/tasks/tasks_filters_view.js'),
    TaskEditView          = require('views/dashboard/tasks/dashboard_tasks_edit_view'),
    dashboardTpl          = require('templates/dashboard/dashboard_tasks.tpl'),
    dashboardTasksListTpl = require('templates/dashboard/dashboard_tasks_list.tpl');



import ModelFactory from 'base/apiNew';

var TaskList = BaseView.extend({
	template: dashboardTasksListTpl,
	className: 'task-list',
	events: {
	    'click .dashboard-table tr'         : 'changeTask',
	    'click .close-icon'                 : 'closeEdit'
	},
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

			if(this.editView)
				this.closeEdit();
		}.bind(this));

		// let MF = ModelFactory();
		var startModel = new Backbone.Model();
		startModel.getResource('json/person1.json').then(function(person) {
			console.log(person);
			return person.get_address();
		}).then(function(address){
			//console.log(address);
		});

	},
	changeTask: function(e){
		var id   = $(e.currentTarget).data('id'),
			href = this.api.getUrl(this.collection, id);
		
		if(!this.editView){
			this.editView = this.addView(TaskEditView, {href: href});
			this.renderNestedView(this.editView);
		}

		this.editView.updateModel(href);
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