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
        'click .files'                       : "toggleFiles",
        'click .see_more'                    : "openSeeMorePanel",
        'click .close-see-more'              : "closeSeeMorePanel",
        'click .details-table_desc_priority' : "openPriority",
        'click .priority-select-item'        : "changePriority",
        'click .details-table_desc_status'   : "openStatus",
        'click .status-select-item'          : "changeStatus" 
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.link = params.link;
        this.modelBinder = new Backbone.ModelBinder();

        this.model.on('change', this.onChange, this);
        Backbone.on('global:click', this.onGlobalClick, this);
    },
    onRender: function() {
        var self = this;
        this.modelBinder.bind(this.model, this.el);
        this.getElement('#task-date-start').datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: new Date(this.model.get('date-finish')),
            onSelect: function(selected) {
                $(this).change(); 
                self.getElement('#task-date-finish').datepicker("option","minDate", selected)
            }

        }).change();
        this.getElement('#task-date-finish').datepicker({
            dateFormat: "yy-mm-dd",
            minDate: this.model.get('date-start'),
            onSelect: function(selected) {
                $(this).change(); 
                self.getElement('#task-date-start').datepicker("option","maxDate", selected)
            }
        });

        this.getElement('.custom-select').customSelect({
            url: this.api.catalog.get_list_task_priority,
            template: 'customSelectListPriority'
        });

        // this.getElement('.status-select').customSelect({
        //     url: this.api.catalog.get_list_task_priority,
        //     template: 'customSelectListPriority'
        // });
    },
    onGlobalClick: function(e) {
        var currentEl = $(e.target);
         if(!currentEl.parents().hasClass('custom-select'))
            this.getElement('.custom-select').customSelect('hide');
    },
    serialize: function(params) {
        this.data = _.clone(this.model.attributes);
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
    // openPriority: function(){
    //     this.getElement('.priority-select').show();
    // },
    // changePriority: function(e){
    //     this.model.set('priority-name', $(e.currentTarget).data('priority-name'));
    //     this.getElement('.priority-select').hide(); 
    // },
    // openStatus: function(){
    //     this.getElement('.status-select').show();
    // },
    // changeStatus: function(e){
    //     this.model.set('processing-name', $(e.currentTarget).data('processing-name'));
    //     this.getElement('.status-select').hide(); 
    // },
    updateModel: function(model) {
        this.model = model;
        this.model.on('change', this.onChange, this);
        this.modelBinder.bind(this.model, this.el);
    },
    onChange: function(){
        this.model.update_self().then(function(){
        });
    },
    remove : function () {
        this.modelBinder.unbind();
        BaseView.prototype.remove.call(this);
    }
});


module.exports = ContentView;