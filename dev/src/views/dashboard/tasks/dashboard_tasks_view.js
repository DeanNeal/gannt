var Backbone              	  = require('backbone'),
    Helpers                   = require('base/helpers'),
    $                     	  = require('jquery'),
    _                     	  = require('underscore'),
    BaseView              	  = require('views/baseview'),
    RoutedView            	  = require('views/routedview'),
    TasksFiltersView      	  = require('views/dashboard/tasks/tasks_filters_view.js'),
    TaskEditView          	  = require('views/dashboard/tasks/dashboard_tasks_edit_view'),
    TaskCreateView            = require('views/dashboard/tasks/dashboard_tasks_add_task_view'),
    dashboardTpl          	  = require('templates/dashboard/dashboard_tasks.tpl'),
    dashboardTasksListTpl     = require('templates/dashboard/dashboard_tasks_list.tpl'),
    dashboardTasksListItemTpl = require('templates/dashboard/dashboard_tasks_list_item.tpl'),
    PreloaderView             = require('views/preloader');


var TaskListItem = BaseView.extend({
	template: dashboardTasksListItemTpl,
	className: 'task-list-item',
	events: {
	    'click .col.status': 'toggleStatusWindow'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.modelBinder = new Backbone.ModelBinder();
		Backbone.on('global:click', this.onGlobalClick, this);
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
	onGlobalClick: function(e) {
		var currentEl = $(e.target);
		 if(!currentEl.parents().hasClass('status'))
		 	this.getElement('.status-select').hide();
	},
	remove : function () {
		Backbone.off('global:click', this.onGlobalClick, this);
	    this.modelBinder.unbind();
	}
});


var TaskList = BaseView.extend({
	className: 'dashboard-table',
	tagName: 'div',
	template: dashboardTasksListTpl,
	events: {
	    'click .task-list-item .row'                      : 'changeTask',
	    'click .close-panel'                              : 'closeEdit'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);

		this.preloaderView = this.addView(PreloaderView, {}, '.preloader');

		this.listenTo(this, 'disable:change', this.onDisableStage, this);
		this.listenTo(this, 'enable:change', this.onEnableStage, this);
		this.listenTo(this, 'taskView:close', this.closeEdit, this);
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
				self.getElement('.tasks-container').empty();
				self.removeNestedView();
				self.taskItemView.remove();
			}

			self.collection.each(function(model) {
				self.taskItemView = self.addView(TaskListItem, {model: model});
			    self.renderNestedView(self.taskItemView, '.tasks-container');
			});

			tasks.get_count().then(function(data){
				self.parent.trigger('pagination:update', data);
				self.preloaderView.hide();
			});

 		});
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
	onDisableStage: function(){
		this.events["click .task-list-item .row"] = undefined;
		this.delegateEvents(this.events);
	},
	onEnableStage: function(){
		this.events["click .task-list-item .row"] = "changeTask";
		this.delegateEvents(this.events);
	},
	closeEdit: function(){
		this.removeNestedView(this.editView);
		this.editView = undefined;
	}
});

var ContentView = BaseView.extend({
	className: 'tasks full-size have-filter have-sort',
	template: dashboardTpl,
	events: {
		'click .open-filter': 'toggleFilter',
		'click .btn-add-new': 'openCreateTask'
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
	},
	openCreateTask: function(){
		if(!this.createView){
			this.createView = this.addView(TaskCreateView);
			this.renderNestedView(this.createView);
		}
	}
	
});

module.exports = ContentView;