var Backbone     = require('backbone');
var _            = require('underscore');
var Helpers      = require('base/helpers');
var Plugins      = require('base/plugins');
var BaseView     = require('views/baseview');
var BaseListView = require('views/elements/base_list_view');
var FilterModel  = require('models/dashboard/tasks_filter_model');
var tpl          = require('templates/dashboard/tasks/tasks_filters.tpl');
var dashboardTasksPagination  = require('templates/dashboard/dashboard_tasks_pagination.tpl');

import { SetActiveStateAtList, SetActiveStateAtTable} from 'base/plugins';




var PaginationView = BaseView.extend({
	template: dashboardTasksPagination,
	className: 'pagination',
	events: {

	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
	},
	serialize: function () {
		//this.data = _.clone(this.model.attributes);
	},
	update: function(tasks){
		debugger
	}
});



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


		this.paginationView = this.addView(PaginationView, {}, '.pagination');
	},
	onModelChange: function () {
		Backbone.history.navigate(this.getRouteWithParams(), {trigger: true});
	},
	updateFilterModel: function (model) {
		this.model.set(model);
		this.filterList.highLight();
		this.sortList.highLight();

		this.getElement('.custom-select').customSelect('refresh');
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);
		this.filterList = new SetActiveStateAtList(this.getElement('.base-filters'), 'filter');
		this.sortList = new SetActiveStateAtTable(this.getElement('.dashboard-table-header'), 'sort');

		// this.getElement('#projects-select').customSelect({
		// 	template: 'customSelectListTpl',
		// 	url: this.api.catalog.get_dashboard_milestones()
		// });
		
		this.getElement('#milestones-select').customSelect({
			url: this.api.catalog.get_dashboard_milestones(),
			template: 'customSelectListTpl'
		});
		
		this.getElement('#priorities-select').customSelect({
			url: this.api.catalog.get_list_task_priority(),
			template: 'customSelectListPriority'
		});
	},
	serialize: function () {
		this.data = _.clone(this.model.attributes);
	},
	getRouteWithParams: function () {
		return this.route + Helpers.serializeModel(this.model.toJSON());
	},
	remove: function () {
		this.modelBinder.unbind();
		this.getElement('.custom-select').customSelect('destroy');
		BaseView.prototype.remove.call(this);
	}
});

module.exports = ContentView;