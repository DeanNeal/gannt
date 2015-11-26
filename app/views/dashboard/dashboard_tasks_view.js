define('views/dashboard/dashboard_tasks_view', [
    'views/baseview',
    'text!templates/dashboard/dashboard_tasks.tpl',
    'text!templates/dashboard/dashboard_task_item1.tpl',
    'text!templates/dashboard/dashboard_task_item2.tpl'
], function(
    BaseView,
    tpl,
    taskItem1Tpl,
    taskItem2Tpl
) {


    var taskItemView1 = BaseView.extend({
        template: taskItem1Tpl,
        className: 'task_item_view_1',
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    var taskItemView2 = BaseView.extend({
        template: taskItem2Tpl,
        className: 'task_item_view_2',
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });


    var ContentView = BaseView.extend({
        template: tpl,
        className: 'tasks',
        router: true,
        routes: {
            'task_item_1'     : taskItemView1,
            'task_item_2'     : taskItemView2
        },
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    return ContentView;
});
