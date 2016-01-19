var Backbone         = require('backbone'),
    $                = require('jquery'),
    datepicker       = require('datepicker'),
    _                = require('underscore'),
    BaseView         = require('views/baseview'),
    tpl              = require('templates/dashboard/dashboard_task_description.tpl'),
    SeeMorePanelView = require('views/dashboard/tasks/task_description_see_more_view');

var ContentView = BaseView.extend({
    className: 'tasks-description full-size',
    template: tpl,
    events: {
        'click .files'              : "toggleFiles",
        'click .see_more'           : "openSeeMorePanel",
        'click .close-see-more'     : "closeSeeMorePanel"
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.link = params.link;
        this.modelBinder = new Backbone.ModelBinder();

        this.model.on('change', this.onChange, this);
    },
    onRender: function() {
        this.modelBinder.bind(this.model, this.el);
        this.getElement('.datepicker').datepicker({
            dateFormat: "yy-mm-dd"
        });
    },
    serialize: function(params) {
        this.data = _.clone(this.model.attributes);
    },
    onChange: function(){
        this.model.update_self().then(function(){
        });
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