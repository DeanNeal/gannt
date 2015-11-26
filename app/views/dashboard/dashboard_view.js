 define('views/dashboard/dashboard_view', [
    'views/baseview',
    // 'views/elements/list_item_view',
    // 'views/elements/list_view',
    'collections/header_list',
    'text!templates/dashboard/dashboard.tpl',
    'views/dashboard/dashboard_tasks_view',
    'views/dashboard/dashboard_milestones_view',
    'views/dashboard/dashboard_projects_view'
], function(
    BaseView,
    // ListItemView,
    // ListView,
    navBarCollection,
    mainTpl,
    tasksView,
    milestonesView,
    projectsView
){

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

    var ContentView = BaseView.extend({
        tagName:'div',
        template: mainTpl,
        className: 'dashboard',
        router: true,
        routes: {
            'tasks'          : tasksView,
            'milestones'     : milestonesView,
            'projects'       : projectsView
        },
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
            //this.addView(SidebarLeftMenu)
            this.collection = new navBarCollection(dashboardLinks);
        },
        serialize: function() {
            this.data = {
                navBarLinks : _.clone(this.collection.models)
            };
        }
    });

    return ContentView;

});
