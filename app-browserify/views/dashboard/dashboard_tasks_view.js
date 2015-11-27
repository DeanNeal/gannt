define('views/dashboard/dashboard_tasks_view', [
    'views/baseview',
    'views/elements/base_list_view',
    'collections/header_list',
    'text!templates/dashboard/dashboard_tasks.tpl',
    'text!templates/dashboard/dashboard_task_item1.tpl',
    'text!templates/dashboard/dashboard_task_item2.tpl'
], function(
    BaseView,
    BaseListView,
    navBarCollection,
    tpl,
    taskItem1Tpl,
    taskItem2Tpl
) {


    var taskItemView1 = BaseView.extend({
        template: taskItem1Tpl,
        className: 'task_item_view_1',
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    var taskItemView2 = BaseView.extend({
        template: taskItem2Tpl,
        className: 'task_item_view_2',
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });


    var tabsLinks = [{
        title: "Task view 1",
        route: "dashboard/tasks/task_item_1",
        name: "task_item_1"
    }, {
        title: "Task view 2",
        route: "dashboard/tasks/task_item_2",
        name: "task_item_2"
    }];

    var navMenu = BaseListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });


    var ContentView = BaseView.extend({
        template: tpl,
        className: 'tasks',
        router: true,
        routes: {
            'task_item_1': taskItemView1,
            'task_item_2': taskItemView2
        },
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
            this.addView(navMenu, {
                collection: new navBarCollection(tabsLinks) 
            }, '.task-tabs');
        },
        afterChangeStage: function(){
           this.trigger('change:stage', this.currentStage);
        }
    });

    return ContentView;
});
