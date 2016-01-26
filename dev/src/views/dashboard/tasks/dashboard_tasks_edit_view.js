var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    TaskDescriptionView  = require('views/dashboard/tasks/task_description_view'),
    tpl                  = require('templates/dashboard/dashboard_tasks_edit.tpl'),
    $                    = require('jquery'),
    PreloaderView        = require('views/preloader');

var ContentView = BaseView.extend({
	className: 'tasks-edit panel',
	template: tpl,
	events: {
		'click .remove-btn'         : "deleteTask"
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.preloaderView = this.addView(PreloaderView);
		Backbone.on('global:click', this.onGlobalClick, this);
	},
	updateModel: function(model){
		this.model = model;
		this.preloaderView.show();

		this.parent.trigger('disable:change');
		model.get_self().then(function(task){
			if(!this.descr){			
				this.descr = this.addView(TaskDescriptionView, {model: task});
				this.renderNestedView(this.descr, '.task-description');
			} else
				this.descr.updateModel(task);

			this.preloaderView.hide();
			this.parent.trigger('enable:change');
		}.bind(this));
	},
	onGlobalClick: function(e) {
		var currentEl = $(e.target);
		if(currentEl.hasClass('close-see-more') || currentEl.hasClass('assignee-panel_close') || currentEl.hasClass('btn-apply'))
			return; 
		if(currentEl.hasClass('btn-submit'))
			return; 
		if(!currentEl.parents().hasClass('tasks-edit') && !currentEl.parents().hasClass('task-list-item'))
		 	this.parent.trigger('taskView:close');
	},
	deleteTask: function(){
	    this.model.delete_self().then(function(){
	        this.parent.trigger('taskView:close');
	    }.bind(this));
	},
	remove: function(){
		Backbone.off('global:click', this.onGlobalClick, this);
		BaseView.prototype.remove.call(this);
	}
});

module.exports = ContentView;