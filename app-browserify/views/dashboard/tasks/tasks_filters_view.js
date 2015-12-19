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
        route: "dashboard/tasks/?filter=all"
    }, {
        name: "To Do",
        id: "todo",
        route: "dashboard/tasks/?filter=todo"
    }, {
        name: "My tasks",
        id: "my_tasks",
        route: "dashboard/tasks/?filter=my_tasks"
    }],
    events: {
    	'click .menu-item': 'changeFilter',
        'change .priority': 'changePriority'
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.leftFilters = this.leftFilter;

        this.addView(BaseListView, {
            itemTpl: leftFilterItemTpl,
            className: 'base-filters',
            collection: new navBarCollection(this.leftFilters)
        }, '.left-filters');
    },

    changeFilter: function(e){
    	e.preventDefault();
        Backbone.history.navigate($(e.currentTarget).attr('href'), { trigger: true });
    },
    changePriority: function(e){
        Backbone.history.navigate($(e.currentTarget).val(), { trigger: true });
    }
});

module.exports = ContentView;