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
        this.data = {
        	pageCount : 1,
        	currentPage: 1
        }
    },
   //  serialize: function () {
   // //     this.data = _.clone(this.model.attributes);
   //      this.data.pageCount = 8;
   //      this.data.currentPage = 2;
   //  },
    update: function(count, page){
		this.data = {
			pageCount: 8,
			currentPage: page
		};
		this.serialize(); 
    	this.render(true);
    }
});

module.exports = PaginationView;