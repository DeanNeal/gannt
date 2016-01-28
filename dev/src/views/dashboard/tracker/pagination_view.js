var Backbone                  = require('backbone');
var $                         = require('jquery');
var _                         = require('underscore');
var BaseView                  = require('views/baseview');
var dashboardTasksPagination  = require('templates/dashboard/tracker/pagination.tpl');

var PaginationView = BaseView.extend({
    template: dashboardTasksPagination,
    className: 'pagination-wrap',
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    },
    update: function(count, page){
		this.data = {
			pageCount: count,
			currentPage: page
		};
    	this.render(true);
    }
});

module.exports = PaginationView;