 define('views/globalview', [
    'views/baseview',
    'views/dashboard/dashboard_view',
    'views/tree/tree_view',
    'views/stats/stats_view',
    'views/finance/finance_view',
    'collections/header_list',
    'text!templates/main.tpl'
], function(
    BaseView,
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
     },{
         route:"tree",
         title: 'tree',
         name: "tree"
     },{
         route: 'stats',
         title: 'stats',
         name: "stats"
     },{
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
        onInitialize : function () {
            Backbone.on('change:page', this.changeStage, this);
            this.collection = new navBarCollection(headerLinks);
        },
        onRender: function(){
    
        },
        serialize: function() {
            this.data = {
                navBarLinks : _.clone(this.collection.models)
            };
        },
        start: function(){
            document.body.appendChild(this.render().el);
        }
    });

});
