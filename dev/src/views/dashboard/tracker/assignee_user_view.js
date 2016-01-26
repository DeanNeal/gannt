var $                    = require('jquery'),
	Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/tracker/assignee_user.tpl');

var ContentView = BaseView.extend({
	className: 'assignee-panel',
	template: tpl,
	events: {
		'click .btn-apply'                : 'onApplyClick',
		'click .assignee-panel_content li': 'onUserClick'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	onApplyClick: function(){ 
		this.parent.trigger('assignee:apply', this.text);
	},
	onUserClick: function(e){
		var member = $(e.currentTarget),
	        id = member.data('id'),
			text = member.text(),
			checkbox = $(e.currentTarget).find('input[type="checkbox"]');

		this.text = text;
		checkbox.prop('checked', !checkbox.is(':checked'));
	}

});

module.exports = ContentView;