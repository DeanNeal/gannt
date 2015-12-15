var Backbone         = require('backbone'),
    _                = require('underscore'),
    BaseView         = require('views/baseview'),
    tpl              = require('templates/dashboard/dashboard_tasks.tpl');

var taskList = BaseView.extend({
    template: tpl,
    className: 'task-list',
    onInitialize: function(params){
        BaseView.prototype.onInitialize.call(this, params);
    },
    serialize: function(){
        this.data = _.clone({data: this.collection});
    }
});

var ContentView = BaseView.extend({
    className: 'tasks scroll',
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.api.getResousceFromCatalog('tasks').then(function(response){
            this.taskList = this.addView(taskList, {collection: response.data});
            this.renderNestedView(this.taskList);
        }.bind(this));
    }
});

module.exports = ContentView;