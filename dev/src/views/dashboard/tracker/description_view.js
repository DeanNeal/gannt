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
        'click .description .icon-edit'      : "onOpenSeeMorePanelClick",
        'click .files'                       : "toggleFiles",
        'click .see_more'                    : "onOpenSeeMorePanelClick",
        'click .close-see-more'              : "onCloseSeeMorePanelClick",
        'click .details-table_desc_priority' : "openPriority",
        'click .details-table_desc_status'   : "openStatus",
        'click .status-select-item'          : "changeStatus",
        'click .open-assignee-panel'         : "onOpenAssingeePanelClick",
        'click .assignee-panel_close'        : "onCloseAssingeePanelClick",
        'click .show-spent-hours-popup'      : "onOpenSpentHoursPopupClick",
        'click .btn-status'                  : "showStatusReport",
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
    commentsIsLoaded : true,
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.addView(BaseListView, {
            itemTpl: panelTab,
            collection: new navBarCollection(this.links)
        }, '.left-view_header');

        this.commentsPreloaderView = this.addView(PreloaderView, {}, '.left-view_content');

        //this.commentsFetch();
//        this.watchersFetch();
     //   this.model.on('change', this.onChange, this);

        this.modelBinder = new Backbone.ModelBinder();

        this.listenTo(this, 'assignee:apply', this.onAssingeeApply, this);
        this.listenTo(this, 'spentHours:submit', this.onSpentHoursChange, this);
        this.listenTo(this, 'comments:add', this.onAddComment, this);
        this.listenTo(this, 'popups:close', this.closeAllPopups, this);
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
            url: this.model['get_priority-edit'],
            template: 'customSelectListPriority'
        });

        this.getElement('.custom-select-status').customSelect({
            url: this.model['get_processing-edit'],
            template: 'customSelectListPriority'
        });

        this.getElement('.custom-select-milestones').customSelect({
            url: this.model['get_modulerelation-milestonetask-edit'],
            template: 'customSelectListTpl'
        });

        this.getElement('.custom-select-watchers').customSelect({
            url: this.model['get_modulerelation-taskwatchers-edit'],
            template: 'customSelectListTpl'
        });

        // Restrict для шаблонизатора форм.
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
    serialize: function(params) {
        this.data = _.clone(this.model.attributes);
    },
    toggleFiles: function(e) {
        $(e.currentTarget).find('.files-preview').toggle();
    },
    openPopup: function(popupName, view, data){
        this.addViewByName(popupName, view, data);
    },

    closePopup: function(popupName){
        this.removeNestedViewByName(popupName);
    },

    closeAllPopups: function() {
        this.closePopup('seeMoreView')
        this.closePopup('assigneeView');
        this.closePopup('spentHoursView');
    },

    onOpenSeeMorePanelClick: function(){
        this.openPopup('seeMoreView', SeeMorePanelView, this.model);
    },

    onCloseSeeMorePanelClick: function(){
        this.closePopup('seeMoreView');
    },

    onOpenAssingeePanelClick: function(){
        this.openPopup('assigneeView', AssigneePanelView, this.model);
    },

    onCloseAssingeePanelClick: function(){
        this.closePopup('assigneeView');
    },

    onAssingeeApply: function(member){
        this.model.set(member);
        this.closePopup('assigneeView');
    },  

    onOpenSpentHoursPopupClick: function(){
        var model =  _.clone(this.model);
        this.openPopup('spentHoursView', SpentHoursPopupView, model);
    },
    showStatusReport: function() {
        if(this.statusReportView) {
            this.removeNestedView(this.statusReportView);
        }
        this.statusReportView = this.addView(StatusReportView, {});
        this.renderNestedView(this.statusReportView, '.left-view_content');
        this.removeComments();
    },
    removeStatusReport: function() {
        this.removeNestedViewByName('statusReportView');
    },
    showComments: function() {
        this.commentsFetch();
        this.removeStatusReport();
    },
    removeComments: function() {
        this.removeNestedViewByName('commentsView');
    },
    commentsFetch: function(){
        this.removeNestedViewByName('commentsView');
        this.commentsPreloaderView.show();
        //get posts collection

        if(this.commentsIsLoaded){ 
            this.commentsIsLoaded = false;       
            this.model.get_post().then(function(posts){
                this.addViewByName('commentsView', CommentsView, posts, '.left-view_content');
                this.commentsPreloaderView.hide();
                this.commentsIsLoaded = true;
            }.bind(this));
        }
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
        this.modelBinder.bind(this.model, this.el);
        this.closePopup('spentHoursView');
    },
    watchersFetch: function() {
        var self = this;
        this.removeNestedViewByName('watchersView');
        this.model['get_modulerelation-taskwatchers']().then(function(watchers){
            self.addItemView(WatchersView, {collection: watchers}, '.details-table_watchers_container', true);
            self.watchers = watchers.map(function(model){
                return model.get('id')
            });
        });

    },
    updateModel: function(model) {
        this.model = model;
        this.model.on('change', this.onChange, this);
        this.modelBinder.bind(this.model, this.el);
        this.getElement('.custom-select').customSelect('refresh');
        this.commentsFetch();
        this.watchersFetch();
    },
    onChange: function(){
        //this.model.set('modulerelation-taskwatchers', this.watchers, {silent: true} );
        this.watchersFetch();
        this.model.update_self(this.model.attributes);
    },

    remove : function () {
        this.modelBinder.unbind();
        this.getElement('#task-date-start').datepicker("destroy");
        this.getElement('#task-date-finish').datepicker("destroy");

        this.getElement('.custom-select').customSelect('destroy');
        BaseView.prototype.remove.call(this);
    }
});


module.exports = ContentView;