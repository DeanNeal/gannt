var Backbone       = require('backbone');
var $              = require('jquery');
var _              = require('underscore');
var Helpers        = require('base/helpers');
var BaseView       = require('views/baseview');
var BaseListView   = require('views/elements/base_list_view');
var PaginationView = require('views/dashboard/tracker/pagination_view');
var FilterModel    = require('models/dashboard/tasks_filter_model');
var tpl            = require('templates/dashboard/tracker/filters.tpl');

import { SetActiveStateAtList, SetActiveStateAtTable} from 'base/plugins/highlightActiveFilter';

var TasksFilterView = BaseView.extend({
	template: tpl,
	className: 'filters',
	events: {
		'click .pagination_left'                   : 'prevClick',
		'click .pagination_right'                  : 'nextClick',
		'click .pagination_pages .pagination_item' : "changePage",
		'click .icon-search'                       : 'toogleSearch'
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
	},
	onModelChange: function () {
		Backbone.history.navigate(this.getRouteWithParams(), {trigger: true});
	},
	updateFilterModel: function (model) {
		this.model.clear({silent : true}).set(model || this.defaults, {silent: true});
		this.modelBinder.bind(this.model, this.el);

		this.sortList.highLight();

		this.getElement('.custom-select').customSelect('refresh');
	},
	prevClick: function(){
		var offset = parseInt(this.model.get('offset') || 0);

		if (offset >= this.countModel.perpage)
			offset -= parseInt(this.countModel.perpage);
		else 
			offset = 0;
		this.model.set('offset', offset);
	},
	nextClick: function(){
		var offset = parseInt(this.model.get('offset') || 0);

 	 	if((offset + this.countModel.perpage) < (this.pagesCount - 1) * this.countModel.perpage)
			offset += parseInt(this.countModel.perpage);
		else 
			offset = (this.pagesCount - 1) * this.countModel.perpage;
		this.model.set('offset', offset);
	},
	changePage: function(e){
		var pageId = $(e.currentTarget).data('page-id');
		this.model.set('offset', (pageId - 1) * this.countModel.perpage);
	},
	updatePagination: function(countModel){
		var offset = 0,
			currentPage = 0;
		this.countModel = countModel;
		this.pagesCount = Math.ceil(countModel.count / countModel.perpage) || 1;
		this.maxOffset = countModel.perpage * (this.pagesCount - 1);
 	
		offset = this.model.get('offset') > this.maxOffset  ? this.maxOffset : this.model.get('offset');
		currentPage = Math.round(offset / countModel.perpage + 1);

		//if user enter wrong offset value 
		this.model.set('offset', offset);

		this.paginationView.update(this.pagesCount, currentPage);
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);

		this.sortList = new SetActiveStateAtTable(this.getElement('.dashboard-table-header'), 'sort');

		this.getElement('#filter-select').customSelect({
			template: 'customSelectListDefault', 
			items: [
				{	
					id: 'all',
					name: 'All'
				},
				{
					id:'todo',
					name: 'To do'
				},
				{
					id: 'my_tasks',
					name: 'My tasks'
				}
			]
		});


		this.getElement('#companies-select').customSelect({
			url: this.api.catalog.get_dashboard_company,
			template: 'customSelectListTpl',
			initialState: true
		});

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
		
		// this.getElement('#priorities-select').customSelect({
		// 	url: this.api.catalog.get_list_task_priority,
		// 	template: 'customSelectListPriority',
		// 	initialState: true
		// });
	},
	toogleSearch: function(){
		this.getElement('.table-search').toggleClass('active');
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

module.exports = TasksFilterView;