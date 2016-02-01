var Backbone              	  = require('backbone'),
    Helpers                   = require('base/helpers'),
    $                     	  = require('jquery'),
    _                     	  = require('underscore'),
    BaseView              	  = require('views/baseview'),
    RoutedView            	  = require('views/routedview'),
    TasksFiltersView      	  = require('views/dashboard/tracker/filters_view.js'),
    TaskEditView          	  = require('views/dashboard/tracker/edit_view'),
    TaskCreateView            = require('views/dashboard/tracker/add_task_view'),
    dashboardTpl          	  = require('templates/dashboard/tracker/tasks.tpl'),
    dashboardTasksListTpl     = require('templates/dashboard/tracker/tasks_list.tpl'),
    dashboardTasksListItemTpl = require('templates/dashboard/tracker/tasks_list_item.tpl'),
    PreloaderView             = require('views/preloader');


var TaskListItem = BaseView.extend({
	template: dashboardTasksListItemTpl,
	className: 'task-list-item',
	events: {
	    'click .col.status'  : 'preventDefault',
	    'click .col.priority': 'preventDefault'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.modelBinder = new Backbone.ModelBinder();
	},
	onRender: function() {
	    this.modelBinder.bind(this.model, this.el);

	    this.getElement('.priorities-select').customSelect({
	        url: this.api.catalog.get_list_task_priority,
	        template: 'customSelectListPriority'
	    });

	    this.getElement('.custom-select-status').customSelect({
	        url: this.api.catalog.get_list_task_status,
	        template: 'customSelectListPriority'
	    });

	},
	preventDefault: function (e) {
		e.preventDefault();
		e.stopPropagation();
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
	template: dashboardTasksListTpl,
	events: {
	    'click .task-list-item .row'                      : 'changeTask',
	    'click .close-panel'                              : 'closeEditView'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);

		this.preloaderView = this.addView(PreloaderView, {}, '.preloader');

		this.listenTo(this, 'disable:change', this.onDisableStage, this);
		this.listenTo(this, 'enable:change', this.onEnableStage, this);
		this.listenTo(this, 'taskView:close', this.closeEditView, this);
	},
	serialize: function () {
		this.data = _.clone({data: this.collection});
	},
	updateTaskList: function(query){
		var self = this;

		this.preloaderView.show();
 		this.api.catalog.get_dashboard_tasks(query).then(function(tasks){
			self.collection = tasks;

			if(self.taskItemView){			
				self.getElement('.custom-select').customSelect('destroy');
				self.getElement('.tasks-container').empty();
				self.removeNestedView();
				self.taskItemView.remove();
			}

			self.collection.each(function(model) {
				self.taskItemView = self.addView(TaskListItem, {model: model});
			    self.renderNestedView(self.taskItemView, '.tasks-container');
			});

			self.parent.trigger('pagination:update', tasks.get_extra_data);
			self.preloaderView.hide();
 		});
	},
	changeTask: function(e){
		var id   = $(e.currentTarget).data('id'),
			model = Helpers.findById(this.collection, id);

		this.addViewByName('editView', TaskEditView);
		this.editView.updateModel(model);
	},
	onDisableStage: function(){
		this.events["click .task-list-item .row"] = undefined;
		this.delegateEvents(this.events);
	},
	onEnableStage: function(){
		this.events["click .task-list-item .row"] = "changeTask";
		this.delegateEvents(this.events);
	},
	closeEditView: function(){
		this.removeNestedViewByName('editView');
		this.updateTaskList();
	}
});

var ContentView = BaseView.extend({
	className: 'tasks full-size have-filter have-sort',
	template: dashboardTpl,
	events: {
		'click .open-filter' : 'toggleFilter',
		'click .btn-add-new' : 'openCreateTask',
		'click .close-panel' : 'closeCreateView'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.taskList = this.addView(TaskList, {collection: {}}, '.task-list');
		this.filter = this.addView(TasksFiltersView, {query: params.query}, '.filters-container');
		this.listenTo(this, 'createView:close', this.closeCreateView, this);
	},
	onChangeParams: function(params){
		this.taskList.updateTaskList(params.query);
		this.filter.updateFilterModel(params.query);
	},
	toggleFilter: function(e){
	    e.preventDefault();
	    this.getElement('.dashboard-table-header').toggle().toggleClass('active');
	    this.$el.toggleClass('have-sort');
	},
	openCreateTask: function(){
		this.addViewByName('createView', TaskCreateView, this.taskList.collection);
	},
	closeCreateView: function(){
		this.removeNestedViewByName('createView');
	}
	

});

module.exports = ContentView;