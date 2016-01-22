var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_assignee_user.tpl');

var ContentView = BaseView.extend({
	className: 'assigne-user',
	template: tpl,
});

module.exports = ContentView;