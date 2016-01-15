var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/tracker/dashboard_tracker_task_desc_panel.tpl');

var SeeMorePanelView = BaseView.extend({
	className: 'see-more-panel-wrap',
	template: tpl,
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	}
});

module.exports = SeeMorePanelView;