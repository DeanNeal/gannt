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
		console.log(_.clone(this.model.attributes));
		this.api.updateResourceByUrl(this.link, {data: _.clone(this.model.attributes)}).then(function (response) {
			console.log(response);
		})
	},
	updateModel: function(model){
		console.log(model);
		this.model.set(model);
	}
});

module.exports = ContentView;