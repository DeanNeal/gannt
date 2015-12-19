var Backbone              = require('backbone'),
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
        route: "all"
    }, {
        name: "To Do",
        id: "todo",
        route: "todo"
    }, {
        name: "My tasks",
        id: "my_tasks",
        route: "my_tasks"
    }],
    events: {
    	'click .menu-item': 'changeFilter'
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.leftFilters = this.leftFilter;
        this.rightFilters = this.rightFilter;

        this.addView(BaseListView, {
            itemTpl: leftFilterItemTpl,
            className: 'base-filters',
            collection: new navBarCollection(this.leftFilters)
        }, '.left-filters');
    },

    changeFilter: function(e){
    	e.preventDefault();

    }
});

module.exports = ContentView;