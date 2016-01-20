var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_add_task.tpl'),
    $                    = require('jquery');

var ContentView = BaseView.extend({
	className: 'panel',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
});

module.exports = ContentView;