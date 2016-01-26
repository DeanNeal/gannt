var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_tasks_comments.tpl'),
    commentItemTpl       = require('templates/dashboard/dashboard_tasks_comments_item.tpl');


var CommentItemView = BaseView.extend({
	className: 'comment clearfix',
	tagName: 'li',
	template: commentItemTpl,
	events: {
	    'click .icon-trash'         : "removeComment",
	},
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	},
	removeComment: function(){
	//	this.remove();
	}
});
 
var ContentView = BaseView.extend({
	className: 'comments full-size',
	template: tpl,
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	},
	events: {
	    'click .send-message'         : "addComment",
	},
	addComment: function(){
		var comment = this.getElement('textarea').val();

		this.commentView = this.addView(CommentItemView, {});
		this.renderNestedView(this.commentView, '.comments-container');
	}
});

module.exports = ContentView;