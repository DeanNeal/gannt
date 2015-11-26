 define('views/dashboard/dashboard_view', [
    'views/baseview',
    'views/elements/list_item_view',
    'views/elements/list_view',
    'collections/header_list',
    'text!templates/header/header_list_item.tpl',
    'views/dashboard/dashboard_tasks_view',
    'views/dashboard/dashboard_milestones_view',
    'views/dashboard/dashboard_projects_view'
], function(
    BaseView,
    ListItemView,
    ListView,
    navBarCollection,
    headerListItemTpl,
    tasksView,
    milestonesView,
    projectsView,
    tpl
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


    var SidebarItemView = ListItemView.extend({
        template: headerListItemTpl
    });

    var SidebarListView = ListView.extend({
        tagName: 'ul',
        className: 'tabs'
    });

    var SidebarLeftMenu = BaseView.extend({
        tagName: 'div',
        className: 'right_block',
        onInitialize: function(params) {
            this.addView(SidebarListView, {
                collection: new navBarCollection(dashboardLinks),
                listItemView: SidebarItemView
            });
            BaseView.prototype.onInitialize.call(this, params);
        }
    });


    var ContentView = BaseView.extend({
        tagName:'div',
        className: 'dashboard',
        router: true,
        routes: {
            'tasks'          : tasksView,
            'milestones'     : milestonesView,
            'projects'       : projectsView
        },
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
            this.addView(SidebarLeftMenu)
        }
    });

    return ContentView;

});
