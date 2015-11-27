var BaseView = require('baseview'), 
    headerView = require('header/header_list_view'),
    dashboardView = require('dashboard/dashboard_view'),
    // treeView = require('views/tree/tree_view'),
    // statsView = require('views/stats/stats_view'),
    // financeView = require('views/finance/finance_view'),
    navBarCollection = require('../collections/header_list');
    //mainTpl = require('../templates/main.tpl');
debugger
module.exports = function() {
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
            'dashboard': dashboardView
            // 'tree'     : treeView,
            // 'stats'    : statsView,
            // 'finance'  : financeView
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

};