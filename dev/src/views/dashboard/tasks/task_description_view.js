var Backbone         = require('backbone'),
    $                = require('jquery'),
    _                = require('underscore'),
    BaseView         = require('views/baseview'),
    tpl              = require('templates/dashboard/dashboard_task_description.tpl'),
    SeeMorePanelView = require('views/dashboard/tasks/task_description_see_more_view');

var ContentView = BaseView.extend({
    className: 'tasks-description full-size',
    template: tpl,
    events: {
        'click .save'               : "testPutQuery",
        'click .delete'             : "testDeleteQuery",
        'click .files'              : "toggleFiles",
        'click .see_more'           : "openSeeMorePanel",
        'click .close-see-more'     : "closeSeeMorePanel"
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
    toggleFiles: function(e) {
        $(e.currentTarget).find('.files-preview').toggle();
    },
    openSeeMorePanel: function(){
        this.seeMoreView = this.addView(SeeMorePanelView, {});
        this.renderNestedView(this.seeMoreView);
    },
    closeSeeMorePanel: function() {
        this.removeNestedView(this.seeMoreView);
        this.seeMoreView = undefined;
    },
    updateModel: function(model) {
        this.model.set(model.attributes);
    },
    remove : function () {
        this.modelBinder.unbind();
        BaseView.prototype.remove.call(this);
    }
});


module.exports = ContentView;