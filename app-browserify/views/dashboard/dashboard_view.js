var BaseView         = require('views/baseview'),
    Helpers          = require('helpers'),
    RoutedView       = require('views/routedview'),
    BaseListView     = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    mainTpl          = require('templates/dashboard/dashboard.tpl'),
    dashboardListTpl = require('templates/dashboard/dashboard_list.tpl'),
    PulseView        = require('views/dashboard/pulse/dashboard_pulse_view'),
    tasksView        = require('views/dashboard/tasks/dashboard_tasks_view'),
    milestonesView   = require('views/dashboard/milestones/dashboard_milestones_view'),
    projectsView     = require('views/dashboard/projects/dashboard_projects_view');

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard full-size',
    routes: {
        'pulse'     : PulseView,
        'tasks'     : tasksView,
        'milestones': milestonesView,
        'projects'  : projectsView
    },
    links: [{
        name: "pulse",
        id: "pulse",
        iconClass: 'fa fa-exclamation-triangle'
    }, {
        name: "tasks",
        id: "tasks",
        iconClass: 'fa fa-circle-o'
    }, {
        name: "milestones",
        id: "milestones",
        iconClass: 'fa fa-circle-o'
    }, {
        name: "projects",
        id: "projects",
        iconClass: 'fa fa-circle-o'
    }],
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.collection = Helpers.createLinks(this.links, params.stage);
        this.addView(BaseListView, {
            itemTpl: dashboardListTpl,
            //if not set then will get default classes
            // className: 'listClassName', //class name for <ul>
            // itemClassName: 'itemClassName', // class name for <li>
            collection: new navBarCollection(this.collection)
        }, '.dashboard-header_menu');
    }
});

module.exports = ContentView;