var BaseView         = require('views/baseview'),
    Helpers          = require('Helpers'),
    RoutedView       = require('views/routedview'),
    BaseListView     = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    mainTpl          = require('templates/dashboard/dashboard.tpl'),
    dashboardListTpl = require('templates/dashboard/dashboard_list.tpl'),
    tasksView        = require('views/dashboard/dashboard_tasks_view'),
    tasksEditView    = require('views/dashboard/dashboard_tasks_edit_view'),
    milestonesView   = require('views/dashboard/dashboard_milestones_view'),
    projectsView     = require('views/dashboard/dashboard_projects_view');

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard full_height content',
    qwe: this,
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
        this.addView(BaseListView, {
            itemTpl: dashboardListTpl,
            //if not set then will get default classes
            // className: 'listClassName', //class name for <ul>
            // itemClassName: 'itemClassName', // class name for <li>
            collection: new navBarCollection(this.collection)
        }, '.dashboard-menu');
    }
});

module.exports = ContentView;