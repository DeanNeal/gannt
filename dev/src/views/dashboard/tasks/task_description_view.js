var Backbone    = require('backbone'),
    $           = require('jquery'),
    _           = require('underscore'),
    BaseView    = require('views/baseview'),
    tpl         = require('templates/dashboard/dashboard_task_description.tpl');

var ContentView = BaseView.extend({
    className: 'tasks-description full-size',
    template: tpl,
    events: {
        'click .save'        : "testPutQuery",
        'click .delete'      : "testDeleteQuery",
        'click .files'       : "toggleFiles"
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.link = params.link;
        this.modelBinder = new Backbone.ModelBinder();
    },
    onRender: function() {
        this.modelBinder.bind(this.model, this.el);

        this.getElement('#priorities-select').customSelect({
            url: this.api.getUrlFromCatalog('priorities'),
            template: 'customSelectListPriority'
        });
        this.getElement('.custom-select').customSelect('refresh');
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
    toggleFiles: function(e) {
        $(e.currentTarget).find('.files-preview').toggle();
    },
    updateModel: function(model) {
        this.model.set(model.attributes);
        this.getElement('.custom-select').customSelect('refresh');
    },
    remove : function () {
        this.modelBinder.unbind();
        this.getElement('.custom-select').customSelect('destroy');
        BaseView.prototype.remove.call(this);
    }
});


module.exports = ContentView;