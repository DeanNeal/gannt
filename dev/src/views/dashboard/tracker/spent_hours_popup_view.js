var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    PopupView            = require('views/elements/popup_view'),
    tpl                  = require('templates/dashboard/tracker/spent_hours_popup.tpl');

var ContentView = PopupView.extend({
	// className: 'spent-hours popup',
	template: tpl,
	events: {
		// 'click .btn-submit'    : "submitCount"
	},
	onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        //this.modelBinder = new Backbone.ModelBinder();
    },
    onRender: function() {
    	//this.modelBinder.bind(this.model, this.el);
    },
	submitCount: function() {
		var val = this.model.get('spent-hours');
		
		if (val)
			this.parent.trigger('spentHours:submit', this.model.attributes);
		else
			alert('Empty value');
	} 
});

module.exports = ContentView;