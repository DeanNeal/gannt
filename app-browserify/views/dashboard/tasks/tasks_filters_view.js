var Backbone     = require('backbone'),
    Helpers      = require('helpers'),
    Plugins      = require('plugins'),
    $            = require('jquery'),
    _            = require('underscore'),
    BaseView     = require('views/baseview'),
    BaseListView = require('views/elements/base_list_view'),
    FilterModel  = require('models/dashboard/tasks_filter_model'),
    tpl          = require('templates/dashboard/tasks/tasks_filters.tpl');

var ContentView = BaseView.extend({
	template: tpl,
	className: 'filters',
	events: {
		'click .menu-item': 'changeFilter',
		'change .priority': 'changePriority'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.route = location.hash.split('?')[0] + '?';

		var initialState = _.extend({filter: 'all'}, params.query);

		this.model = new FilterModel(initialState);
		this.modelBinder = new Backbone.ModelBinder();
		this.model.on('change', this.onModelChange, this);
	},
	onModelChange: function () {
		Backbone.history.navigate(this.getRouteWithParams(), {trigger: true});
	},
	updateFilterModel: function (model) {
		this.model.set(model);
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);
		Plugins.setActiveStateAtList(this.getElement('.base-filters'),'filter');
		Plugins.setActiveStateAtList(this.getElement('.dashboard-table-header'),'sort');
	},
	serialize: function () {
		this.data = _.clone(this.model.attributes);
	},
	getRouteWithParams: function () {
		return this.route + Helpers.serializeModel(this.model.toJSON());
	},
	remove: function () {
		this.modelBinder.unbind();
		BaseView.prototype.remove.call(this);
	}
});

module.exports = ContentView;