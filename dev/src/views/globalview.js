var Backbone         = require('backbone');
var $                = require('jquery');
var _                = require('underscore');
var Helpers          = require('base/helpers');
var BaseView         = require('views/baseview');
var RoutedView       = require('views/routedview');
var BaseListView     = require('views/elements/base_list_view');
var dashboardView    = require('views/dashboard/dashboard_view');
var treeView         = require('views/tree/tree_view');
var statsView        = require('views/stats/stats_view');
var financeView      = require('views/finance/finance_view');
var navBarCollection = require('collections/header_list');
var mainTpl          = require('templates/main.tpl');
var avatarTpl        = require('templates/overall/avatar.tpl')

var AvatarView = BaseView.extend({
    tagName:'div',
    className   : 'avatar',
    template: avatarTpl,
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    },
    serialize: function(){
        this.data = _.clone(this.model.attributes);
    }
});

var GlobalView = RoutedView.extend({
    tagName: 'div',
    template: mainTpl,
    className: 'main full-size',
    routes: {
        'dashboard': dashboardView,
        'tree'     : treeView,
        'stats'    : statsView,
        'finance'  : financeView
    },
    links: [{
        name: "Dashboard",
        id: "dashboard",
        route: "dashboard/tasks",
        disabled: false
    }, {
        name: "Tree",
        id: "tree",
        route: "tree",
        disabled: true
    }, {
        name: "Stats",
        id: "stats",
        route: "stats",
        disabled: true
    }],
    onInitialize: function(params) {
        Backbone.on('change:page', this.changeStage, this);

        this.addView(BaseListView, {
            collection: new navBarCollection(this.links)
        }, '.header-container');

        this.api.catalog.get_current_user().then(function(user){
            var avatarView =  this.addView(AvatarView, {model: user});
            this.renderNestedView(avatarView, '.current-user');
        }.bind(this));
    },
    start: function() {
        document.body.appendChild(this.render().el);
    }
});

module.exports = GlobalView;