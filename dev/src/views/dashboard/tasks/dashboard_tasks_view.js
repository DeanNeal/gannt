var Backbone              	  = require('backbone'),
    Helpers                   = require('base/helpers'),
    $                     	  = require('jquery'),
    _                     	  = require('underscore'),
    PreloaderView             = require('views/preloader'),
    BaseView              	  = require('views/baseview'),
    RoutedView            	  = require('views/routedview'),
    TasksFiltersView      	  = require('views/dashboard/tasks/tasks_filters_view.js'),
    TaskEditView          	  = require('views/dashboard/tasks/dashboard_tasks_edit_view'),
    dashboardTpl          	  = require('templates/dashboard/dashboard_tasks.tpl'),
    dashboardTasksListTpl     = require('templates/dashboard/dashboard_tasks_list.tpl'),
    dashboardTasksListItemTpl = require('templates/dashboard/dashboard_tasks_list_item.tpl');

var TaskListItem = BaseView.extend({
	template: dashboardTasksListItemTpl,
	className: 'task-list-item',
	events: {
	    'click .col.status': 'toggleStatusWindow'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.modelBinder = new Backbone.ModelBinder();
	},
	onRender: function() {
	    this.modelBinder.bind(this.model, this.el);
	},
	toggleStatusWindow: function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(e.currentTarget).find('.status-select').toggle();
	},
	serialize: function () {
		this.data = _.clone(this.model.attributes);
		this.data.Helpers = Helpers;
	},
	remove : function () {
	    this.modelBinder.unbind();
	}
});


var TaskList = BaseView.extend({
	className: 'dashboard-table',
	tagName: 'div',
	events: {
	    'click .task-list-item .row'                     : 'changeTask',
	    'click .close-icon'                              : 'closeEdit'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);

		this.preloaderView = this.addView(PreloaderView);
	},
	serialize: function () {
		this.data = _.clone({data: this.collection});
	},
	updateTaskList: function(query){
		if(this.editView)
			this.closeEdit();

		var tasksModel = new Backbone.Model();

		this.preloaderView.show();

 		this.api.catalog.get_dashboard_tasks(query).then(function(tasks){
			this.collection = tasks;

			if(this.taskItemView){			
				this.$el.empty();
				this.removeNestedView();
				this.taskItemView.remove();
			}

			this.collection.each(function(model) {
				this.taskItemView = this.addView(TaskListItem, {model: model});
			    this.renderNestedView(this.taskItemView);
			}.bind(this));

			this.preloaderView.hide();
 		}.bind(this));
	},
	changeTask: function(e){
		var id   = $(e.currentTarget).data('id'),
			model = Helpers.findById(this.collection, id);

		if(!this.editView){
			this.editView = this.addView(TaskEditView);
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