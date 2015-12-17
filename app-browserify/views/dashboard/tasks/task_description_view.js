var Backbone    = require('backbone'),
    _           = require('underscore'),
    BaseView    = require('views/baseview'),
    tpl         = require('templates/dashboard/dashboard_task_description.tpl'),
    ModelBinder = require('backbone.modelbinder');

var ContentView = BaseView.extend({
	className: 'tasks-description',
	template: tpl,
	events: {
		'click button': "testPutQuery"
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);

		this.modelBinder = new Backbone.ModelBinder();
	},
	onRender: function () {
		this.modelBinder.bind(this.model, this.el);
	},
	serialize: function (params) {
		this.data = _.clone(this.model.attributes);
	},
	testPutQuery: function () {
		console.log(arguments);
		this.api.updateResourceByUrl(this.link, {data: 'testData'}).then(function (response) {
			console.log(response);
		})
	}
});

module.exports = ContentView;