var Backbone         = require('backbone'),
    $                = require('jquery'),
    Helpers          = require('helpers'),
    BaseView         = require('views/baseview'),
    RoutedView       = require('views/routedview'),
    BaseListView     = require('views/elements/base_list_view'),
    dashboardView    = require('views/dashboard/dashboard_view'),
    treeView         = require('views/tree/tree_view'),
    statsView        = require('views/stats/stats_view'),
    financeView      = require('views/finance/finance_view'),
    navBarCollection = require('collections/header_list');
    mainTpl          = require('templates/main.tpl');

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
