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
	},
	serialize: function(params) { 
	    this.data = _.clone(this.model.attributes);
	}
});


var SeeMorePanelView = BaseView.extend({
	className: 'see-more-panel-wrap',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.getFiles();
	},
	serialize: function(params) {
	    this.data = _.clone(this.model.attributes);
	},
	getFiles: function(){
		this.model.get_self().then(function(posts){
		    this.fileView = this.addView(FileView, {model: this.model});
		    this.renderNestedView(this.fileView, '.see-more-panel_footer');
		}.bind(this));
	}
});

module.exports = SeeMorePanelView;