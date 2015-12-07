var Backbone = require('backbone'),
    $        = require('jquery'),
    BaseView = require('views/baseview'), 
    RoutedView  = require('views/routedview'),
    headerView = require('views/header/header_list_view'),
    dashboardView = require('views/dashboard/dashboard_view'),
    treeView = require('views/tree/tree_view'),
    statsView = require('views/stats/stats_view'),
    financeView = require('views/finance/finance_view'),
    navBarCollection = require('collections/header_list');
    mainTpl = require('templates/main.tpl');

    var GlobalView = RoutedView.extend({
        tagName:'div',
        template: mainTpl,
        className: 'main',
        id: 'content', 
        routes: {
             'dashboard': dashboardView,
             'tree'     : treeView,
             'stats'    : statsView,
             'finance'  : financeView
        },
        onInitialize : function (params) {
            Backbone.on('change:page', this.changeStage, this);
        },
        beforeChangeStage: function(currentStage, stagesArray){
            var deferred = $.Deferred();

            if(!this.menu){
                this.api.getMenu().then(function(response){
                    var collection = new navBarCollection(response.data);

                    this.menu  = this.addView(headerView, {collection: collection});
                    this.renderNestedView(this.menu, '.header-container');
                    deferred.resolve(true);    
                }.bind(this));
            } else
                deferred.resolve(true);   

            return deferred.promise();
        },
        start: function(){
            document.body.appendChild(this.render().el);
        }
    });

module.exports = GlobalView;