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
		var val = this.model.get('spent-hours');

		if (val)
			this.parent.trigger('spentHours:submit', this.model.attributes);
	} 
});

module.exports = ContentView;