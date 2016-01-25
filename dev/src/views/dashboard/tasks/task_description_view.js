var Backbone             = require('backbone'),
    $                    = require('jquery'),
    datepicker           = require('datepicker'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/dashboard_task_description.tpl'),
    SeeMorePanelView     = require('views/dashboard/tasks/task_description_see_more_view'),
    AssigneePanelView    = require('views/dashboard/tasks/dashboard_assignee_user_view'),
    SpentHoursPopupView  = require('views/dashboard/tasks/dashboard_tasks_spent_hours_popup_view');

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
        'click .status-select-item'          : "changeStatus",
        'click .open-assignee-panel'         : "openAssingeePanel",
        'click .assignee-panel_close'        : "closeAssingeePanel",
        'click .show-spent-hours-popup'      : "openSpentHoursPopup"
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.link = params.link;
        this.modelBinder = new Backbone.ModelBinder();

        this.model.on('change', this.onChange, this);
        Backbone.on('global:click', this.onGlobalClick, this);

        this.listenTo(this, 'assignee:apply', this.onAssingeeApply, this);
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

        });
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

        if(!currentEl.parents().hasClass('assignee-panel') && !currentEl.parents().hasClass('open-assignee-panel'))
            this.closeAssingeePanel();

        if(!currentEl.parents().hasClass('spent-hours') && !currentEl.parents().hasClass('show-spent-hours-popup'))
            this.closeSpentHoursPopup();
    },
    serialize: function(params) {
        this.data = _.clone(this.model.attributes);
    },
    toggleFiles: function(e) {
        $(e.currentTarget).find('.files-preview').toggle();
    },
    openSeeMorePanel: function(){
        if(!this.seeMoreView) {
            this.seeMoreView = this.addView(SeeMorePanelView, {});
            this.renderNestedView(this.seeMoreView);
        }
    },
    closeSeeMorePanel: function() {
        this.removeNestedView(this.seeMoreView);
        this.seeMoreView = undefined;
    },
    openAssingeePanel: function() {
        if(!this.assigneeView) {
            this.assigneeView = this.addView(AssigneePanelView, {});
            this.renderNestedView(this.assigneeView);
        }
    },
    closeAssingeePanel: function() {
        this.removeNestedView(this.assigneeView);
        this.assigneeView = undefined;
    },
    onAssingeeApply: function(text){
        this.model.set('taskusername', text);
        this.closeAssingeePanel();
    },  
    openSpentHoursPopup: function() {
        if(!this.spentHoursView) {
            this.spentHoursView = this.addView(SpentHoursPopupView, {});
            this.renderNestedView(this.spentHoursView);
        }
    },
    closeSpentHoursPopup: function() {
        this.removeNestedView(this.spentHoursView);
        this.spentHoursView = undefined;
    },
    updateModel: function(model) {
        this.model = model;
        this.model.on('change', this.onChange, this);
        this.modelBinder.bind(this.model, this.el);
        this.getElement('.custom-select').customSelect('refresh');
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