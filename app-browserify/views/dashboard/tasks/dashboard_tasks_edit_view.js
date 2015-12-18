var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    TaskDescriptionView  = require('views/dashboard/tasks/task_description_view'),
    TaskDescriptionModel = require('models/dashboard/task_description_model'),
    tpl                  = require('templates/dashboard/dashboard_tasks_edit.tpl');

var ContentView = BaseView.extend({
	className: 'tasks-edit',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);

		this.api.getResourceByUrl(params.href).then(function (response) {
			var model = new TaskDescriptionModel(response.data);
			this.descr = this.addView(TaskDescriptionView, {model: model});
			this.renderNestedView(this.descr, '.task-description')
		}.bind(this));
	},
	onRender: function () {

	},
	updateModel: function(href){
		this.api.getResourceByUrl(href).then(function (response) {
			this.descr.updateModel(response.data);
		}.bind(this));
	}
});

module.exports = ContentView;