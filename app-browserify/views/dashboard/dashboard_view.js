var BaseView         = require('views/baseview'),
    Helpers          = require('Helpers'),
    RoutedView       = require('views/routedview'),
    BaseListView     = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    mainTpl          = require('templates/dashboard/dashboard.tpl'),
    tasksView        = require('views/dashboard/dashboard_tasks_view'),
    tasksEditView    = require('views/dashboard/dashboard_tasks_edit_view'),
    milestonesView   = require('views/dashboard/dashboard_milestones_view'),
    projectsView     = require('views/dashboard/dashboard_projects_view');


var Menu = BaseListView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav'
});

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard full-size',
    routes: {
        'tasks'     : tasksView,
        'tasks-edit': tasksEditView,
        'milestones': milestonesView,
        'projects'  : projectsView
    },
    params : true,
    links: [{
        name: "tasks",
        id: "tasks"
    }, {
        name: "milestones",
        id: "milestones"
    }, {
        name: "projects",
        id: "projects"
    }],
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.collection = Helpers.createLinks(this.links, params.stage);
        this.addView(Menu, {
            collection: new navBarCollection(this.collection)
        }, '.dashboard-menu');
    }
});

module.exports = ContentView;