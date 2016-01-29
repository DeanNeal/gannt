var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/tracker/spent_hours_popup.tpl');

var ContentView = BaseView.extend({
	className: 'spent-hours',
	template: tpl,
	events: {
		'click .btn-submit'    : "submitCount"
	},
	onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.modelBinder = new Backbone.ModelBinder();
    },
    onRender: function() {
    	this.modelBinder.bind(this.model, this.el);
    },
	submitCount: function() {
		// var hours = this.getElement('.hours-count').val();

		// if (hours)
		// 	this.parent.trigger('spentHours:submit', hours);
		// 	this.model.set
	} 
});

module.exports = ContentView;