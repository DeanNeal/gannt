var Backbone         = require('backbone'),
    _                = require('underscore'),
    RoutedView       = require('views/routedview'),
    BaseView         = require('views/baseview'),
    BaseListView     = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    tpl              = require('templates/dashboard/dashboard_tasks.tpl');

    var navMenu = BaseListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

    var navMenu = BaseListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

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
        className: 'tasks',
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
            this.api.getTasks().then(function(response){
                this.taskList = this.addView(taskList, {collection: response.data});
                this.renderNestedView(this.taskList);
            }.bind(this));
        }
    });

module.exports = ContentView;