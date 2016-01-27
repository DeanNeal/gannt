var $                    = require('jquery'),
	Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    Helpers              = require('base/helpers'),
    tpl                  = require('templates/dashboard/tracker/assignee_user.tpl');

var ContentView = BaseView.extend({
	className: 'assignee-panel',
	template: tpl,
	events: {
		'click .btn-apply'                   : 'onApplyClick',
		'click .assignee-panel_content li'   : 'onUserClick',
		'keyup .assignee-panel_search input' : 'searchMembers'
	},
	members: [],
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	onRender: function(){
		
	},
	onApplyClick: function(){ 
		if(this.text)
			this.parent.trigger('assignee:apply', this.text);
	},
	onUserClick: function(e){
		var member = $(e.currentTarget),
	        id = member.data('id'),
			text = member.text(),
			checkbox = $(e.currentTarget).find('input[type="checkbox"]');

		this.text = text;

		this.members.push({
			id: id
		});
		checkbox.prop('checked', !checkbox.is(':checked'));
	},
	searchMembers: function(e){
		var value = $(e.currentTarget).val(),
			$list = this.getElement('.assignee-panel_content ul');
		Helpers.searchEngine(value, $list, 2);
	}

});

module.exports = ContentView;