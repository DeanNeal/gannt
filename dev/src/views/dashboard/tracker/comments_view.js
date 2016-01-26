var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/tracker/comments.tpl'),
    commentItemTpl       = require('templates/dashboard/tracker/comments_item.tpl');


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
	events: {
	    'click .send-message'         : "addComment",
	},
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	    
	    this.collection.each(function(model) {
	    	this.commentView = this.addView(CommentItemView, {model: model}, '.comments-container');
	    }.bind(this));
	},
	addComment: function(){
		var comment = this.getElement('textarea').val();

		this.commentView = this.addView(CommentItemView, {});
		this.renderNestedView(this.commentView, '.comments-container');
	},

});

module.exports = ContentView;