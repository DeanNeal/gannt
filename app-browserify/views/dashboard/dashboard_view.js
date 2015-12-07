var BaseView         = require('views/baseview'),
    Helpers          = require('Helpers'),
    RoutedView       = require('views/routedview'),
    BaseListView     = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    mainTpl          = require('templates/dashboard/dashboard.tpl'),
    tasksView        = require('views/dashboard/dashboard_tasks_view'),
    milestonesView   = require('views/dashboard/dashboard_milestones_view'),
    projectsView     = require('views/dashboard/dashboard_projects_view');


var dashboardLinks = [{
    name: "tasks",
    id: "tasks"
}, {
    name: "milestones",
    id: "milestones"
}, {
    name: "projects",
    id: "projects"
}];

var Menu = BaseListView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav'
});

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard full_height content',
    routes: {
        'tasks'     : tasksView,
        'milestones': milestonesView,
        'projects'  : projectsView
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        
        dashboardLinks = Helpers.createLinks(dashboardLinks, params.stage);
        this.addView(Menu, {
            collection: new navBarCollection(dashboardLinks)
        }, '.dashboard-menu');
    },
    onRender: function(){
        
    }

});

module.exports = ContentView;