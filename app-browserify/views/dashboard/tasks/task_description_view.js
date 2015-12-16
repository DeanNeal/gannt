var Backbone = require('backbone'),
    _        = require('underscore'),
    BaseView = require('views/baseview'),
    tpl      = require('templates/dashboard/dashboard_task_description.tpl');

var ContentView = BaseView.extend({
	className: 'tasks-edit',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		console.log(params);
		//this.api.getResousceFromCatalog('task-id').then(function (response) {
		//	this.addView(taskList, {collection: response.data});
		//}.bind(this));
	},
	serialize: function(params) {
		console.log(this, params);
		//this.data = _.clone(params.data);
	}
});

module.exports = ContentView;