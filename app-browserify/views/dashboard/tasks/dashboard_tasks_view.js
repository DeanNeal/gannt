var Backbone         = require('backbone'),
    _                = require('underscore'),
    BaseView         = require('views/baseview'),
    RoutedView       = require('views/routedview'),
    TaskEditView     = require('views/dashboard/tasks/dashboard_tasks_edit_view'),
    dashboardTpl     = require('templates/dashboard/dashboard_tasks.tpl'),
    dashboardTasksListTpl              = require('templates/dashboard/dashboard_tasks_list.tpl');

var TaskList = BaseView.extend({
    template: dashboardTasksListTpl,
    className: 'task-list',
    onInitialize: function(params){
        BaseView.prototype.onInitialize.call(this, params);
    },
    serialize: function(){
        this.data = _.clone({data: this.collection});
    }
});

var ContentView = RoutedView.extend({
    className: 'tasks scroll',
    template: dashboardTpl,
    routes: {
        'edit': TaskEditView
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.api.getResousceFromCatalog('tasks').then(function(response){
            this.taskList = this.addView(TaskList, {collection: response.data});
            this.renderNestedView(this.taskList, '.task-list');
        }.bind(this));
    }
});

module.exports = ContentView;