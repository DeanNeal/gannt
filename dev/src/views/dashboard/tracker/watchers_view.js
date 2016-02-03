var Backbone             = require('backbone'),
	Helpers              = require('base/helpers'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    watcherItemTpl       = require('templates/dashboard/tracker/watcher_item.tpl'),
    watchersTpl          = require('templates/dashboard/tracker/watchers.tpl');


var WatcherItemView = BaseView.extend({
	className: 'watcher_item',
	template: watcherItemTpl,
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function(params) {
	    this.data = _.clone(this.model.attributes);
	}
});

var WatcherListView = BaseView.extend({
	className: '',
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	    this.collection.each(function(model) {
	    	this.addView(WatcherItemView, {model: model});
	    }.bind(this));
	}
});
 
var WatchersView = BaseView.extend({
	className: 'watchers',
	template: watchersTpl,
	events: {

	},
	onInitialize: function(params) {
		this.model = new Backbone.Model();
	    BaseView.prototype.onInitialize.call(this, params);
	    this.modelBinder = new Backbone.ModelBinder();

        this.model.set('modulerelation-taskwatchers', Helpers.getIds(this.collection));

	    this.addViewByName('watchersList', WatcherListView, this.collection, '.watchers-wrapper')

	    this.model.on('change', this.onChange, this);
	},
	updateWatchers: function(){
		var self = this;
		self.removeNestedViewByName('watchersList');
		this.parent.model['get_modulerelation-taskwatchers']().then(function(watchers){
			self.addViewByName('watchersList', WatcherListView, watchers, '.watchers-wrapper');
		});
	},
	onRender: function(){
		this.modelBinder.bind(this.model, this.el);
		this.getElement('.custom-select-watchers').customSelect({
		    url: this.parent.model['get_modulerelation-taskwatchers-edit'],
		    template: 'customSelectListTpl'
		});
	},
	onChange: function(){
		var self = this;
		this.parent.model['update_modulerelation-taskwatchers'](this.model.attributes).then(function(){
			self.updateWatchers();
		});
	},
	remove : function () {
	    this.modelBinder.unbind();
	    BaseView.prototype.remove.call(this);
	}

});

module.exports = WatchersView;