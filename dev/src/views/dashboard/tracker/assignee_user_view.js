var $                    = require('jquery'),
	Backbone             = require('backbone'),
	_                    = require('underscore'),
    BaseView             = require('views/baseview'),
    PopupView            = require('views/elements/popup_view'),
    Helpers              = require('base/helpers'),
    tpl                  = require('templates/dashboard/tracker/assignee_user.tpl'),
    memberTpl            = require('templates/dashboard/tracker/assignee_member.tpl');


var MemberView = BaseView.extend({
	className: '',
	template: memberTpl,
	tagName:'li',
	events: {
		'click'   : 'onUserClick',
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.modelBinder = new Backbone.ModelBinder();
	},
	onRender: function(){
		this.modelBinder.bind(this.model, this.el);
	},
	serialize: function(params) { 
	    this.data = _.clone(this.model.attributes);
	},
	onUserClick: function(e){
		this.member = {
			taskusername: this.model.get('name'),
			taskuserid: this.model.get('id'),
			// role: 'unknown',
			avatar: this.model.get('avatar'),
			'modulerelation-taskuser': this.model.get('id')
		};

		this.getElement().addClass('active').siblings().removeClass('active');
		this.parent.trigger('member:click', this.member);
	},
	remove : function () {
	    this.modelBinder.unbind();
	    BaseView.prototype.remove.call(this);
	}
}); 

var ContentView = PopupView.extend({
	// className: 'assignee-panel popup',
	template: tpl,
	events: {
		'click .btn-apply'                   : 'onApplyClick',
		'keyup .assignee-panel_search input' : 'searchMembers'
	},

	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.getMembers();
		this.listenTo(this, 'member:click', this.setMember, this);
	},
	setMember: function(member){
		this.member = member;
	},
	onApplyClick: function(){
		if(this.member)
			this.parent.trigger('assignee:apply', this.member);
	},
	searchMembers: function(e){
		var value = $(e.currentTarget).val(),
			$list = this.getElement('.assignee-panel_content ul');
		Helpers.searchEngine(value, $list, 2);
	},
	getMembers: function(){
		var self = this;
		this.model['get_modulerelation-taskuser-edit']().then(function(collection){
		    collection.each(function(model){
			    self.addItemView(MemberView, model, '.assignee-panel_content ul');
		    });
		});
	}

});

module.exports = ContentView;