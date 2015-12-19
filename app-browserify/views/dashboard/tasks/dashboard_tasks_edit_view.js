var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    TaskDescriptionView  = require('views/dashboard/tasks/task_description_view'),
    TaskDescriptionModel = require('models/dashboard/task_description_model'),
    tpl                  = require('templates/dashboard/dashboard_tasks_edit.tpl'),
    $                    = require('jquery');

var ContentView = BaseView.extend({
	className: 'tasks-edit',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.taskDescrModel = new TaskDescriptionModel();
	},
	updateModel: function(link){
		this.api.getResourceByUrl(link).then(function (response) {
			if(!this.descr){			
				this.taskDescrModel.set(response.data);
				this.descr = this.addView(TaskDescriptionView, {model: this.taskDescrModel, link: link});
				this.renderNestedView(this.descr, '.task-description');
			} else
				this.descr.updateModel(response.data);
		}.bind(this));
	}
});

module.exports = ContentView;