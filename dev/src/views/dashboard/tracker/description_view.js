var Backbone             = require('backbone'),
    Helpers              = require('base/helpers'),
    $                    = require('jquery'),
    datepicker           = require('datepicker'),
    _                    = require('underscore'),
    BaseView             = require('views/baseview'),
    BaseListView         = require('views/elements/base_list_view'),
    navBarCollection     = require('collections/header_list'),
    panelTab             = require('templates/dashboard/tracker/panel_tab.tpl'),
    tpl                  = require('templates/dashboard/tracker/description.tpl'),
    SeeMorePanelView     = require('views/dashboard/tracker/see_more_view'),
    AssigneePanelView    = require('views/dashboard/tracker/assignee_user_view'),
    WatchersView         = require('views/dashboard/tracker/watchers_view'),
    SpentHoursPopupView  = require('views/dashboard/tracker/spent_hours_popup_view'),
    CommentsView         = require('views/dashboard/tracker/comments_view'),
    StatusReportView     = require('views/dashboard/tracker/status_report_view'),
    PreloaderView        = require('views/preloader');

var ContentView = BaseView.extend({
    className: 'tasks-description full-size',
    template: tpl,
    events: {
        'click .description .icon-edit'      : "editDescription",
        'click .files'                       : "toggleFiles",
        'click .see_more'                    : "openSeeMorePanel",
        'click .close-see-more'              : "closeSeeMorePanel",
        'click .details-table_desc_priority' : "openPriority",
        'click .details-table_desc_status'   : "openStatus",
        'click .status-select-item'          : "changeStatus",
        'click .open-assignee-panel'         : "openAssingeePanel",
        'click .assignee-panel_close'        : "closeAssingeePanel",
        'click .show-spent-hours-popup'      : "openSpentHoursPopup",
        'click .btn-status'                  : "openStatusReport",
        'click .btn-comments'                : "showComments"
    },
    links: [{
        name: "Comments",
        className: "btn-comments",
        id: "comments",
        active: true
    }, {
        name: "Status Report",
        className: "btn-status",
        id: "status_report"
    }],
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.addView(BaseListView, {
            itemTpl: panelTab,
            collection: new navBarCollection(this.links)
        }, '.left-view_header');

        this.commentsPreloaderView = this.addView(PreloaderView, {}, '.left-view_content');

        this.commentsFetch();
        this.watchersFetch();

        this.modelBinder = new Backbone.ModelBinder();

        this.model.on('change', this.onChange, this);
        Backbone.on('global:click', this.onGlobalClick, this);


        this.listenTo(this, 'assignee:apply', this.onAssingeeApply, this);
        this.listenTo(this, 'spentHours:submit', this.onSpentHoursChange, this);
        this.listenTo(this, 'comments:add', this.onAddComment, this);
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

        this.getElement('.priorities-select').customSelect({
            url: this.model.get_priority,
            template: 'customSelectListPriority'
        });

        this.getElement('.custom-select-status').customSelect({
            url: this.model.get_processing,
            template: 'customSelectListPriority'
        });

            // массив для шаблонизатора форм.
        // var restrict = { 
        //     'date-start': { 
        //         disabled : false,
        //         readonly : false,
        //         visible   : false,  
        //         title : 'Fuck' ,
        //         placeholder: 'qweqw'
        //     }
        // };
        // Helpers.initRestrict(restrict, this.el);
    },
    onGlobalClick: function(e) {
        var currentEl = $(e.target);
        if(!currentEl.parents().hasClass('custom-select'))
            this.getElement('.custom-select').customSelect('hide');

        if(!currentEl.parents('body').length)
            return;
        
        if(!currentEl.parents().hasClass('assignee-panel') && !currentEl.parents().hasClass('open-assignee-panel'))
            this.closeAssingeePanel();

        if(!currentEl.parents().hasClass('spent-hours') && !currentEl.hasClass('show-spent-hours-popup'))
            this.closeSpentHoursPopup();
    },
    serialize: function(params) {
        this.data = _.clone(this.model.attributes);
    },
    toggleFiles: function(e) {
        $(e.currentTarget).find('.files-preview').toggle();
    },
    editDescription: function(){ 
        this.getElement('.task-name input').toggleClass('edit-mode').prop('readonly', !this.getElement('.task-name input').attr('readonly'));
        this.getElement('.description-text textarea').toggleClass('edit-mode').prop('readonly', !this.getElement('.description-text textarea').attr('readonly'));
    },
    openSeeMorePanel: function(){
        if(!this.seeMoreView) {
            this.seeMoreView = this.addView(SeeMorePanelView, {model: this.model});
            this.renderNestedView(this.seeMoreView);
        }
    },
    closeSeeMorePanel: function() {
        this.removeNestedView(this.seeMoreView);
        this.seeMoreView = undefined;
    },
    openAssingeePanel: function() {
        if(!this.assigneeView) {
            this.assigneeView = this.addView(AssigneePanelView, {model: this.model});
            this.renderNestedView(this.assigneeView);
        }
    },
    closeAssingeePanel: function() {
        this.removeNestedView(this.assigneeView);
        this.assigneeView = undefined;
    },
    onAssingeeApply: function(member){
        this.model.set(member);
        this.closeAssingeePanel();
    },  
    openSpentHoursPopup: function() {
        if(!this.spentHoursView) {
            this.spentHoursView = this.addView(SpentHoursPopupView, {model: this.model});
            this.renderNestedView(this.spentHoursView);
        }
    },
    closeSpentHoursPopup: function() {
        this.removeNestedView(this.spentHoursView);
        this.spentHoursView = undefined;
    },
    openStatusReport: function() {
        if(this.statusReportView) {
            this.removeNestedView(this.statusReportView);
        }
        this.statusReportView = this.addView(StatusReportView, {});
        this.renderNestedView(this.statusReportView, '.left-view_content');
        this.removeComments();
    },
    removeStatusReport: function() {
        this.removeNestedView(this.statusReportView);
        this.statusReportView = undefined;
    },
    showComments: function() {
        this.commentsFetch();
        this.removeStatusReport();
    },
    removeComments: function() {
        this.removeNestedView(this.commentsView);
        this.commentsView = undefined;
    },
    commentsFetch: function(){
        if(this.commentsView) {
            this.removeNestedView(this.commentsView);
        }
        this.commentsPreloaderView.show();
        //get posts collection
        this.model.get_post().then(function(posts){
            this.commentsView = this.addView(CommentsView, {collection: posts});
            this.renderNestedView(this.commentsView, '.left-view_content');
            this.commentsPreloaderView.hide();
        }.bind(this));
    },
    onAddComment: function(content) {
        this.commentsPreloaderView.show();
        this.model.create_post_create().then(function(comment){
            comment.set('content', content);
            this.model.update_post_create(comment.attributes).then(function(){
                this.commentsFetch();
            }.bind(this));
        }.bind(this));
    },
    onSpentHoursChange: function(model) {
        this.model.set(model);
        this.closeSpentHoursPopup();
    },
    watchersFetch: function() {
        if(this.watchersView) {
            this.removeNestedView(this.watchersView);
        }
        var collection = new Backbone.Collection([{},{},{}]);
        this.watchersView = this.addView(WatchersView, {collection: collection}, '.details-table_watchers_container');
        this.renderNestedView(this.watchersView);
    },
    updateModel: function(model) {
        this.model = model;
        this.model.on('change', this.onChange, this);
        this.modelBinder.bind(this.model, this.el);
        this.getElement('.custom-select').customSelect('refresh');
        this.commentsFetch();
    },
    onChange: function(){
        this.model.update_self(this.model.attributes);
    },

    remove : function () {
        this.modelBinder.unbind();
        this.getElement('#task-date-start').datepicker("destroy");
        this.getElement('#task-date-finish').datepicker("destroy");
        BaseView.prototype.remove.call(this);
    }
});


module.exports = ContentView;