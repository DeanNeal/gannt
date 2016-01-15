var Backbone                  = require('backbone');
var $                         = require('jquery');
var _                         = require('underscore');
var BaseView                  = require('views/baseview');
var dashboardTasksPagination  = require('templates/dashboard/dashboard_tasks_pagination.tpl');

var PaginationView = BaseView.extend({
    template: dashboardTasksPagination,
    className: 'pagination-wrap',
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    },
    serialize: function () {
        //this.data = _.clone(this.model.attributes);
    }
});

module.exports = PaginationView;