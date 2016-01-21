var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_add_task.tpl'),
    $                    = require('jquery');

var ContentView = BaseView.extend({
	className: 'task-create panel',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		Backbone.on('global:click', this.onGlobalClick, this);
	},
	onGlobalClick: function(e) {
		var currentEl = $(e.target);
 
		if(!currentEl.parents().hasClass('panel') && currentEl.parents().hasClass('task-list-item'))
		  	this.parent.trigger('createView:close');
	},
	remove: function(){
		Backbone.off('global:click', this.onGlobalClick, this);
		BaseView.prototype.remove.call(this);
	}
});

module.exports = ContentView;