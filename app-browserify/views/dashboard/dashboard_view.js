var BaseView = require('../../views/baseview'),
    BaseListView = require('./../elements/base_list_view'),
    navBarCollection = require('./../../collections/header_list'),
    mainTpl = require('./templates/dashboard.tpl'),
    tasksView = require('./dashboard_tasks_view'),
    milestonesView = require('./dashboard_milestones_view'),
    projectsView = require('./dashboard_projects_view');


var dashboardLinks = [{
    title: "tasks",
    route: "dashboard/tasks",
    name: "tasks"
}, {
    title: "milestones",
    route: "dashboard/milestones",
    name: "milestones"
}, {
    title: "projects",
    route: "dashboard/projects",
    name: "projects"
}];

var SidebarLeftMenu = BaseListView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav'
});

var ContentView = BaseView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'dashboard',
    router: true,
    routes: {
        'tasks': tasksView,
        'milestones': milestonesView,
        'projects': projectsView
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.addView(SidebarLeftMenu, {
            collection: new navBarCollection(dashboardLinks)
        }, '.dashboard-menu');
    },
    afterChangeStage: function() {
        this.trigger('change:stage', this.currentStage);
    }
});

module.exports = ContentView;