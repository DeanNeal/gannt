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

		this.link = params.serviceData.href;

		this.api.getResourceByUrl(this.link).then(function (response) {
			var model = new TaskDescriptionModel(response.data);
			this.descr = this.addView(TaskDescriptionView, {model: model});
			this.renderNestedView(this.descr, '.task-description')
		}.bind(this));
	},
	onRender: function () {
		this.parent.getElement('.bb-route-container').addClass('active-task');
	}
});

module.exports = ContentView;