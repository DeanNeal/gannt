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
		filter: 'my_tasks',
	 	sort: 'title',
	    offset: 0
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
	prevClick: function(){
		var offset = parseInt(this.model.get('offset') || 0);

		if (offset >= this.countModel.get('perpage'))
			offset -= parseInt(this.countModel.get('perpage'));
		this.model.set('offset', offset);
	},
	nextClick: function(){
		var offset = parseInt(this.model.get('offset') || 0);

 	 	if(offset < (this.pagesCount - 1) * this.countModel.get('perpage'))
			offset += parseInt(this.countModel.get('perpage'));
		this.model.set('offset', offset);
	},
	changePage: function(e){
		var pageId = $(e.currentTarget).data('page-id');
		this.model.set('offset', (pageId - 1) * this.countModel.get('perpage'));
	},
	updatePagination: function(countModel){
		this.countModel = countModel;
		this.pagesCount = Math.ceil(countModel.get('count') / countModel.get('perpage'));
		this.paginationView.update(this.pagesCount, Math.round(this.model.get('offset') / countModel.get('perpage') + 1));
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);
		this.filterList = new SetActiveStateAtList(this.getElement('.base-filters'), 'filter');
		this.sortList = new SetActiveStateAtTable(this.getElement('.dashboard-table-header'), 'sort');

		this.getElement('#projects-select').customSelect({
			url: this.api.catalog.get_dashboard_product,
			template: 'customSelectListTpl',
			initialState: true
		});
		
		this.getElement('#milestones-select').customSelect({
			url: this.api.catalog.get_dashboard_milestones,
			template: 'customSelectListTpl',
			initialState: true
		});
		
		this.getElement('#priorities-select').customSelect({
			url: this.api.catalog.get_list_task_priority,
			template: 'customSelectListPriority',
			initialState: true
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
		Backbone.off('global:click', this.onGlobalClick, this);
		BaseView.prototype.remove.call(this);
	}
});

module.exports = TasksFilterView;