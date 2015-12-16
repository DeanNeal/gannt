var Backbone = require('backbone'),
	_        = require('underscore'),
    BaseView = require('views/baseview'),
    tpl      = require('templates/dashboard/dashboard_tasks_list.tpl');

var milestonesList = BaseView.extend({
    template: tpl,
    className: 'task-list',
    onInitialize: function(params){
        BaseView.prototype.onInitialize.call(this, params);
    },
    serialize: function(){
        this.data = _.clone({data: this.collection});
    }
});

var ContentView =  BaseView.extend({
    className : 'milestones scroll',
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.api.getResousceFromCatalog('milestones').then(function(response){
            this.milestonesList = this.addView(milestonesList, {collection: response.data});
            this.renderNestedView(this.milestonesList);
        }.bind(this));
    }
});

module.exports = ContentView;