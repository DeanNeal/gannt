 define('views/globalview', [
    'views/baseview',
    'views/header/header_list_view',
    'views/dashboard/dashboard_view',
    'views/tree/tree_view',
    'views/stats/stats_view',
    'views/finance/finance_view',
    'collections/header_list',
    'text!templates/main.tpl'
], function(
    BaseView,
    headerView,
    dashboardView,
    treeView,
    statsView,
    financeView,
    navBarCollection,
    mainTpl
){

    var headerLinks = [{
        route: "dashboard/tasks",
        title: 'dashboard',
        name: "dashboard"
    }, {
        route: "tree",
        title: 'tree',
        name: "tree"
    }, {
        route: 'stats',
        title: 'stats',
        name: "stats"
    }, {
        route: "finance/transactions",
        title: 'finance',
        name: "finance"
    }];

    return BaseView.extend({
        tagName:'div',
        template: mainTpl,
        className: 'content',
        id: 'content', 
        router: true,
        routes: {
            'dashboard': dashboardView,
            'tree'     : treeView,
            'stats'    : statsView,
            'finance'  : financeView
        },
        onInitialize : function (params) {
            Backbone.on('change:page', this.changeStage, this);
            this.addView(headerView, {collection: new navBarCollection(headerLinks)}, '.header-container');
        },
        afterChangeStage: function(){
           this.trigger('change:stage', this.currentStage);
        },
        start: function(){
            document.body.appendChild(this.render().el);
        }
    });

});
