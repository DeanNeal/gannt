var Backbone            = require('backbone'),
    _                   = require('underscore'),
    BaseView            = require('views/baseview'),
    TaskDescriptionView = require('views/dashboard/tasks/task_description_view'),
    tpl                 = require('templates/dashboard/dashboard_tasks_edit.tpl');

// var taskList = BaseView.extend({
//     template: tpl,
//     className: 'task-edit',
//     onInitialize: function(params){
//         BaseView.prototype.onInitialize.call(this, params);
//     },
//     serialize: function(){
//         this.data = _.clone({data: this.collection});
//     }
// });

var ContentView = BaseView.extend({
	className: 'tasks-edit',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		// this.api.getResousceFromCatalog('task-id').then(function(response){
		this.taskDescription = this.addView(TaskDescriptionView, '.description');
		this.renderNestedView(this.taskDescription);
		console.log(params);
		// }.bind(this));
	},
	onRender: function () {
		this.parent.getElement('.bb-route-container').addClass('active-task');
	}
});

module.exports = ContentView;