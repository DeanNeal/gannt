var Backbone         = require('backbone');
var $                = require('jquery');
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
    onInitialize: function(params) {
        Backbone.on('change:page', this.changeStage, this);
    },
    beforeChangeStage: function() {
        var deferred = $.Deferred();

        if (!this.menu) {
            this.api.getResousceFromCatalog('menu').then(function(response) {
                this.collection = Helpers.createMenuLinks(response.data);
                this.menu = this.addView(BaseListView, {
                    collection: new navBarCollection(this.collection)
                });
                this.renderNestedView(this.menu, '.header-container');
                deferred.resolve(true);
            }.bind(this));
        } else
            deferred.resolve(true);

        return deferred.promise();
    },
    start: function() {
        document.body.appendChild(this.render().el);
    }
});

module.exports = GlobalView;
