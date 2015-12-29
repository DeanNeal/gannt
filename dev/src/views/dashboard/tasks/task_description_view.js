var Backbone    = require('backbone'),
    _           = require('underscore'),
    BaseView    = require('views/baseview'),
    tpl         = require('templates/dashboard/dashboard_task_description.tpl');

var ContentView = BaseView.extend({
    className: 'tasks-description full-size',
    template: tpl,
    events: {
        'click .save'  : "testPutQuery",
        'click .delete': "testDeleteQuery"
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.link = params.link;
        this.modelBinder = new Backbone.ModelBinder();
    },
    onRender: function() {
        this.modelBinder.bind(this.model, this.el);
    },
    serialize: function(params) {
        this.data = _.clone(this.model.attributes);
    },
    testPutQuery: function() {
        this.api.updateResourceByUrl(this.link, {data: _.clone(this.model.attributes)}).then(function(response) {
            console.log(response);
        })
    },
    testDeleteQuery: function() {
    	this.api.deleteResourceByUrl(this.link).then(function(response) {
    	    console.log(response);
    	})
    },
    updateModel: function(model) {
        this.model.set(model);
    },
    remove : function () {
        this.modelBinder.unbind();
        BaseView.prototype.remove.call(this);
    }
});


module.exports = ContentView;