var Backbone = require('backbone'),
    //Rx = require('rx/dist/rx.lite'),
    Rx                = require('rx-dom'),
    WikiRx            = require('views/finance/finance_rx');

    Kefir             = require('kefir'),
    sortable          = require('jquery-ui/sortable'),
    tooltip           = require('jquery-ui/tooltip'),
    BaseView          = require('views/baseview'),
    RoutedView        = require('views/routedview'),
    BaseListView      = require('views/elements/base_list_view'),
    navBarCollection  = require('collections/header_list'),
    financeTpl        = require('templates/finance/finance.tpl'),
    headerListItemTpl = require('templates/elements/nav_list_item.tpl'),
    transactionsTpl   = require('templates/finance/tabs/transactions.tpl'),
    finacntTpl        = require('templates/finance/tabs/finacnt.tpl'),
    cashflowacntTpl   = require('templates/finance/tabs/cashflowacnt.tpl');

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

        var wikiRx = new WikiRx($input, $results);
        wikiRx.initialize();

        //KEFIR
        var counter = this.getContentInternal().find('.counter'),
            count = this.getContentInternal().find('.count'),
            outputElement = this.getContentInternal().find('.label');

        var btnClicks = Kefir.fromEvents(counter, 'click');
        var inputValue = Kefir.fromEvents(count, 'keyup')
            .map(event =>  event.target.value);


        var clicksCount = btnClicks.scan(sum => sum + 1, 0);

        // var inputNumber = inputValue.map(text => parseInt(text, 10));

        // var fixedInputNumber = inputValue.flatMap(
        //     x => isNaN(x) ? Kefir.constantError('banana?') : Kefir.constant(x)
        // );

        // var theResult = Kefir.combine([fixedInputNumber, clicksCount], (a, b) => a * b);


        clicksCount
            .onValue(x => {
                outputElement.html(x);
            })
            .onError(error => {
                outputElement.html('<span style="color:red">' + error + '</span>');
            });
        clicksCount.log()



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
