var Backbone             = require('backbone'),
	_                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/tracker/desc_panel.tpl'),
    fileTpl              = require('templates/dashboard/tracker/desc_panel_file.tpl');

var FileView = BaseView.extend({
	className: 'description-file',
	template: fileTpl,
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
	remove : function () {
	    this.modelBinder.unbind();
	    BaseView.prototype.remove.call(this);
	}
});


var SeeMorePanelView = BaseView.extend({
	className: 'see-more-panel-wrap popup',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.getFiles();
		this.modelBinder = new Backbone.ModelBinder();
	},
	onRender: function(){
		this.modelBinder.bind(this.model, this.el);
	},
	serialize: function(params) {
	    this.data = _.clone(this.model.attributes);
	},
	getFiles: function(){
		this.model.get_self().then(function(posts){
		    this.fileView = this.addView(FileView, {model: this.model});
		    this.renderNestedView(this.fileView, '.see-more-panel_footer');
		}.bind(this));
	},
	remove : function () {
	    this.modelBinder.unbind();
	    BaseView.prototype.remove.call(this);
	}
});

module.exports = SeeMorePanelView;