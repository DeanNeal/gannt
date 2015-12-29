var BaseView = require('views/baseview');

var RoutedView = BaseView.extend({
	routes: {},
	onInitialize: function(params) {
	    BaseView.prototype.onInitialize.call(this, params);
	},
	afterChangeStage: function(){
	   this.trigger('change:stage', this.currentStage);
	}
});

module.exports = RoutedView;