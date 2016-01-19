var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_add_task.tpl'),
    $                    = require('jquery'),
    // PreloaderView        = require('views/preloader');

var ContentView = BaseView.extend({
	className: 'panel add-task-panel',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		// this.preloaderView = this.addView(PreloaderView);
		// Backbone.on('global:click', this.onGlobalClick, this);
	},
});

module.exports = ContentView;