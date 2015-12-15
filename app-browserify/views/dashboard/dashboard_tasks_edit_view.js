var Backbone         = require('backbone'),
    _                = require('underscore'),
    BaseView         = require('views/baseview'),
    tpl              = require('templates/dashboard/dashboard_tasks_edit.tpl');

// var taskList = BaseView.extend({
//     template: tpl,
//     className: 'task-edit',
//     onInitialize: function(params){
//         BaseView.prototype.onInitialize.call(this, params);
//     },
//     serialize: function(){
//         this.data = _.clone({data: this.collection});
//     }
// });

var ContentView = BaseView.extend({
    className: 'tasks',
    template: tpl,
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        // this.api.getResousceFromCatalog('tasks').then(function(response){
        //     this.taskList = this.addView(taskList, {collection: response.data});
        //     this.renderNestedView(this.taskList);
        // }.bind(this));
    }
});

module.exports = ContentView;