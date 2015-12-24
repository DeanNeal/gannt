var Backbone     = require('backbone'),
    Helpers      = require('helpers'),
    Plugins      = require('plugins'),
    select2      = require('select2')
    // jQuery            = require('jquery'),
    // chosen           = require('drmonty-chosen'),
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

		var initialState = _.extend({filter: 'all', sort: 'title'}, params.query);

		this.model = new FilterModel(initialState);
		this.modelBinder = new Backbone.ModelBinder();
		this.model.on('change', this.onModelChange, this);
	},
	onModelChange: function () {
		Backbone.history.navigate(this.getRouteWithParams(), {trigger: true});
	},
	updateFilterModel: function (model) {
		this.model.set(model);
		this.filterList.highlight();
		this.sortList.highlight();

//		this.getElement('.custom-select').customSelect('refresh');
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);
		this.filterList = new Plugins.setActiveStateAtList(this.getElement('.base-filters'), 'filter');
		this.sortList = new Plugins.setActiveStateAtTable(this.getElement('.dashboard-table-header'), 'sort');
		this.getElement('.custom-select').customSelect();
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