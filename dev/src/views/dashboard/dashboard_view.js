var BaseView         = require('views/baseview');
var Helpers          = require('base/helpers');
var RoutedView       = require('views/routedview');
var BaseListView     = require('views/elements/base_list_view');
var PulseView        = require('views/dashboard/pulse/dashboard_pulse_view');
var tasksView        = require('views/dashboard/tasks/dashboard_tasks_view');
var projectsView     = require('views/dashboard/projects/dashboard_projects_view');
var navBarCollection = require('collections/header_list');
var mainTpl          = require('templates/dashboard/dashboard.tpl');
var dashboardListTpl = require('templates/dashboard/dashboard_list.tpl');

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard full-size',
    routes: {
        'pulse'     : PulseView,
        'tasks'     : tasksView,
        'projects'  : projectsView
    },
    links: [{
        name: "Pulse",
        route: "pulse",
        iconClass: 'fa fa-exclamation-triangle',
        prevent: true
    }, {
        name: "Tracker",
        route: "dashboard/tasks",
        iconClass: 'fa fa-circle-o'
    },{
        name: "Projects",
        route: "projects",
        iconClass: 'fa fa-circle-o',
        prevent: true
    },{
        name: "Timetable",
        route: "timetable",
        iconClass: 'fa fa-circle-o',
        prevent: true
    },
    {
        name: "Kanban",
        route: "kanban",
        iconClass: 'fa fa-circle-o',
        prevent: true
    }
    ],
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.addView(BaseListView, {
            itemTpl: dashboardListTpl,
            //if not set then will get default classes
            // className: 'listClassName', //class name for <ul>
            // itemClassName: 'itemClassName', // class name for <li>
            collection: new navBarCollection(this.links)
        }, '.dashboard-header_menu');
    }
});

module.exports = ContentView;