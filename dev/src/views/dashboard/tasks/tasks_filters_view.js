var Backbone       = require('backbone');
var $              = require('jquery');
var _              = require('underscore');
var Helpers        = require('base/helpers');
var Plugins        = require('base/plugins');
var BaseView       = require('views/baseview');
var BaseListView   = require('views/elements/base_list_view');
var PaginationView = require('views/dashboard/tasks/task_pagination_view');
var FilterModel    = require('models/dashboard/tasks_filter_model');
var tpl            = require('templates/dashboard/tasks/tasks_filters.tpl');

import { SetActiveStateAtList, SetActiveStateAtTable} from 'base/plugins';

var TasksFilterView = BaseView.extend({
	template: tpl,
	className: 'filters',
	events: {
		'click .pagination_left'    : 'prevClick',
		'click .pagination_right'   : 'nextClick',
		'click .pagination_pages span' : "changePage"
	},
	defaults: {
		filter: 'all',
	 	sort: 'title',
	 	page: '1'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.route = location.hash.split('?')[0] + '?';

		this.model = new FilterModel(params.query);
		this.modelBinder = new Backbone.ModelBinder();
		this.model.on('change', this.onModelChange, this);

		this.paginationView = this.addView(PaginationView, {}, '.pagination');

		this.listenTo(this.parent, 'pagination:update', this.updatePagination, this);
		Backbone.on('global:click', this.onGlobalClick, this);
	},
	onModelChange: function () {
		Backbone.history.navigate(this.getRouteWithParams(), {trigger: true});
	},
	updateFilterModel: function (model) {
		this.model.clear({silent : true}).set(model || this.defaults);
		this.modelBinder.bind(this.model, this.el);

		this.filterList.highLight();
		this.sortList.highLight();

		this.getElement('.custom-select').customSelect('refresh');
	},
	prevClick: function(tasks){
		var page = parseInt(this.model.get('page') || 1);

		if (page > 1)
			page -= 1;
		this.model.set('page', page);
	},
	nextClick: function(tasks){
		var page = parseInt(this.model.get('page') || 1);
		if(page < this.pagesCount)
			page += 1;
		this.model.set('page', page);
	},
	changePage: function(e){
		var pageId = $(e.currentTarget).data('page-id');
		this.model.set('page', pageId);
	},
	updatePagination: function(countModel){
		this.pagesCount = Math.ceil(countModel.get('count') / countModel.get('perpage'));
		this.paginationView.update(this.pagesCount, this.model.get('page'));
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);
		this.filterList = new SetActiveStateAtList(this.getElement('.base-filters'), 'filter');
		this.sortList = new SetActiveStateAtTable(this.getElement('.dashboard-table-header'), 'sort');

		this.getElement('#projects-select').customSelect({
			url: this.api.catalog.get_dashboard_product,
			template: 'customSelectListTpl'
		});
		
		this.getElement('#milestones-select').customSelect({
			url: this.api.catalog.get_dashboard_milestones,
			template: 'customSelectListTpl'
		});
		
		this.getElement('#priorities-select').customSelect({
			url: this.api.catalog.get_list_task_priority,
			template: 'customSelectListPriority'
		});
	},
	serialize: function () {
		this.data = _.clone(this.model.attributes);
	},
	getRouteWithParams: function () {
		return this.route + Helpers.serializeModel(this.model.toJSON());
	},
	onGlobalClick: function(e) {
		var currentEl = $(e.target);
		 if(!currentEl.parents().hasClass('custom-select'))
		 	this.getElement('.custom-select').customSelect('hide');
	},
	remove: function () {
		this.modelBinder.unbind();
		this.getElement('.custom-select').customSelect('destroy');
		BaseView.prototype.remove.call(this);
	}
});

module.exports = TasksFilterView;