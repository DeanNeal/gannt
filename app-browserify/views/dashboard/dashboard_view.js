var BaseView         = require('views/baseview'),
    RoutedView       = require('views/routedview'),
    BaseListView     = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    mainTpl          = require('templates/dashboard/dashboard.tpl'),
    tasksView        = require('views/dashboard/dashboard_tasks_view'),
    milestonesView   = require('views/dashboard/dashboard_milestones_view'),
    projectsView     = require('views/dashboard/dashboard_projects_view');


var dashboardLinks = [{
    name: "tasks",
    id: "dashboard/tasks"
}, {
    name: "milestones",
    id: "dashboard/milestones"
}, {
    name: "projects",
    id: "dashboard/projects"
}];

var SidebarLeftMenu = BaseListView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav'
});

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard full_height content flex',
    routes: {
        'tasks'     : tasksView,
        'milestones': milestonesView,
        'projects'  : projectsView
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.addView(SidebarLeftMenu, {
            collection: new navBarCollection(dashboardLinks)
        }, '.dashboard-menu');
    }
});

module.exports = ContentView;