var Backbone = require('backbone'),
    Rx = require('rx'),
    sortable = require('jquery-ui/sortable'),
    tooltip = require('jquery-ui/tooltip'),
    BaseView = require('views/baseview'),
    RoutedView = require('views/routedview'),
    BaseListView = require('views/elements/base_list_view'),
    navBarCollection = require('collections/header_list'),
    financeTpl = require('templates/finance/finance.tpl'),
    headerListItemTpl = require('templates/elements/nav_list_item.tpl'),
    transactionsTpl = require('templates/finance/tabs/transactions.tpl'),
    finacntTpl = require('templates/finance/tabs/finacnt.tpl'),
    cashflowacntTpl = require('templates/finance/tabs/cashflowacnt.tpl');

var transactionsView = BaseView.extend({
    tagName: 'div',
    template: transactionsTpl,
    className: 'finance-container',
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

var finacntView = BaseView.extend({
    tagName: 'div',
    template: finacntTpl,
    className: 'finance-container',
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

var cashflowacntView = BaseView.extend({
    tagName: 'div',
    template: cashflowacntTpl,
    className: 'finance-container',
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
    },
    onRender: function() {
        var $input = this.getContentInternal().find('.input'),
            $results = this.getContentInternal().find('.results');



        // /* Only get the value from each key up */
        var keyups = Rx.Observable.fromEvent($input, 'keyup')
            .pluck('target', 'value')
            .filter(function(text) {
                return text.length > 2;
            });

        //  Now debounce the input for 500ms 
        // var debounced = keyups
        //   .debounce(500 /* ms */);

        // /* Now get only distinct values, so we eliminate the arrows and other control characters */
        // var distinct = debounced
        //   .distinctUntilChanged();


        // Same as above, but detects single clicks
        // var singleClickStream = clickStream
        //     .buffer(function() { return clickStream.throttle(250); })
        //     .map(function(list) { return list.length; })
        //     .filter(function(x) { return x === 1; });

            
        keyups.subscribe(function(event) {

            $results.text(event);
        });
    }
});



var financeLinks = [{
    title: "transactions",
    route: "finance/transactions",
    name: "transactions"
}, {
    title: "chart of financial accaunts",
    route: "finance/finacnt",
    name: "finacnt"
}, {
    title: "chart of cash flow accaunts",
    route: "finance/cashflowacnt",
    name: "cashflowacnt"
}];

var SidebarLeftMenu = BaseListView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav'
});

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: financeTpl,
    className: 'finance',
    routes: {
        transactions: transactionsView,
        finacnt: finacntView,
        cashflowacnt: cashflowacntView
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.addView(SidebarLeftMenu, {
            collection: new navBarCollection(financeLinks)
        }, '.finance_page__left');
    },
    onRender: function() {
        this.getContentInternal().find('.navbar-nav').sortable();
        this.getContentInternal().tooltip();
    }
});

module.exports = ContentView;
