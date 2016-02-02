var Backbone             = require('backbone'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    watcherItemTpl       = require('templates/dashboard/tracker/watcher_item.tpl');


var WatcherItemView = BaseView.extend({
	className: 'watcher_item',
	template: watcherItemTpl,
	events: {
 
	},
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function(params) {
	    this.data = _.clone(this.model.attributes);
	}
});
 
var WatchersView = BaseView.extend({
	className: 'watchers',
	events: {

	},
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);

	    this.collection.each(function(model) {
	    	this.addView(WatcherItemView, {model: model});
	    }.bind(this));
	}
});

module.exports = WatchersView;