var Backbone              = require('backbone'),
    $                     = require('jquery'),
	_                     = require('underscore'),
    BaseView              = require('views/baseview'),
    BaseListView          = require('views/elements/base_list_view'),
    navBarCollection      = require('collections/header_list'),
    tpl                   = require('templates/dashboard/tasks/tasks_filters.tpl'),
    leftFilterItemTpl     = require('templates/dashboard/tasks/tasks_left_filters_item.tpl');

var ContentView =  BaseView.extend({
	template: tpl,
    className : 'filters',
    leftFilter: [{
        name: "All",
        id: "all",
        route: "filter=all"
    }, {
        name: "To Do",
        id: "todo",
        route: "filter=todo"
    }, {
        name: "My tasks",
        id: "my_tasks",
        route: "filter=my_tasks"
    }],
    events: {
    	'click .menu-item': 'changeFilter',
        'change .priority': 'changePriority'
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.leftFilters = this.leftFilter;

        this.route = location.hash.split('?')[0] + '?';

        this.addView(BaseListView, {
            itemTpl: leftFilterItemTpl,
            className: 'base-filters',
            collection: new navBarCollection(this.leftFilters)
        }, '.left-filters');
    },
    getRouteWithParams: function(){
        return this.route + this.getElement('[data-active="true"]').attr('href') + "&" + this.getElement('.priority').val();
    },
    changeFilter: function(e){
    	e.preventDefault();
        Backbone.history.navigate(this.getRouteWithParams(), { trigger: true });
    },
    changePriority: function(e){
        Backbone.history.navigate(this.getRouteWithParams(), { trigger: true });
    }
});

module.exports = ContentView;