var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    NewCommentModel      = require('models/dashboard/new_comment_model'),
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
		this.remove();
	},
	serialize: function(params) {
	    this.data = _.clone(this.model.attributes);
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
		var content = this.getElement('textarea').val();
		var model = new NewCommentModel();
		model.set({
			content: content,
			create: (new Date()).toISOString().substr(0, 10) + ' ' + (new Date()).toLocaleTimeString('en-US', {hour12: false})
		});

		this.commentView = this.addView(CommentItemView, {model: model});
		this.renderNestedView(this.commentView, '.comments-container');
	}

});

module.exports = ContentView;