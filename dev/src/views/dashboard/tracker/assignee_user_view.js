var $                    = require('jquery'),
	Backbone             = require('backbone'),
	_                    = require('underscore'),
    BaseView             = require('views/baseview'),
    Helpers              = require('base/helpers'),
    tpl                  = require('templates/dashboard/tracker/assignee_user.tpl'),
    memberTpl            = require('templates/dashboard/tracker/assignee_member.tpl');


var MemberView = BaseView.extend({
	className: '',
	template: memberTpl,
	tagName:'li',
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.modelBinder = new Backbone.ModelBinder();
	},
	onRender: function(){
		this.modelBinder.bind(this.model, this.el);
	},
	serialize: function(params) { 
	    this.data = _.clone(this.model.attributes);
	} 
}); 

var ContentView = BaseView.extend({
	className: 'assignee-panel',
	template: tpl,
	events: {
		'click .btn-apply'                   : 'onApplyClick',
		'click .assignee-panel_content li'   : 'onUserClick',
		'keyup .assignee-panel_search input' : 'searchMembers'
	},

	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.getMembers();
	},
	onRender: function(){
		
	},
	onApplyClick: function(){ 
		if(this.member)
			this.parent.trigger('assignee:apply', this.member);
	},
	onUserClick: function(e){
		var member = $(e.currentTarget),
	        id = member.data('id'),
			text = member.find('.name').text(),
	        role = member.find('.role').text(),
			avatar = member.find('img').attr('src'),
			checkbox = $(e.currentTarget).find('input[type="checkbox"]');
 
		this.member = {
			taskusername: text,
			taskuserid: id,
			role: role,
			avatar: avatar
		};

		checkbox.prop('checked', !checkbox.is(':checked'));
	},
	searchMembers: function(e){
		var value = $(e.currentTarget).val(),
			$list = this.getElement('.assignee-panel_content ul');
		Helpers.searchEngine(value, $list, 2);
	},
	getMembers: function(){
		this.model.get_self().then(function(posts){
		    this.memberView = this.addView(MemberView, {model: this.model});
		    this.renderNestedView(this.memberView, '.assignee-panel_content ul');
		}.bind(this));
	}

});

module.exports = ContentView;