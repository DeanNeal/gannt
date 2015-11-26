 define('views/globalview', [
    'views/baseview',
    'views/header/header_list_view',
    'views/dashboard/dashboard_view',
    'views/tree/tree_view',
    'views/stats/stats_view',
    'views/finance/finance_view'
], function(
    BaseView,
    HeaderView,
    dashboardView,
    treeView,
    statsView,
    financeView
){
    
    // var ContentView = BaseView.extend({
    //     tagName:'div',
    //     className: 'content',
    //     id: 'content', 
    //     router: true,
    //     routes: {
    //         'dashboard': dashboardView,
    //         'tree'     : treeView,
    //         'stats'    : statsView,
    //         'finance'  : financeView
    //     },
    //     onInitialize: function (params) {
    //         BaseView.prototype.onInitialize.call(this, params);
            
    //     }
    // });

    return BaseView.extend({
        tagName:'div',
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
            this.addView(HeaderView);
           // this.addView(ContentView);
            Backbone.on('change:page', this.changeStage, this); 
        },
        start: function(){
            document.body.appendChild(this.render().el);
        }
    });

});
