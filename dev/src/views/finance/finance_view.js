var Backbone = require('backbone'),
    Kefir = require('kefir'),
//Rx = require('rx/dist/rx.lite'),
    Rx = require('rx-dom');

var Helpers = require('base/helpers');
var WikiRx = require('views/finance/finance_rx');
var BaseView = require('views/baseview');
var RoutedView = require('views/routedview');
var BaseListView = require('views/elements/base_list_view');
var navBarCollection = require('collections/header_list');
var financeTpl = require('templates/finance/finance.tpl');
var headerListItemTpl = require('templates/elements/nav_list_item.tpl');
var transactionsTpl = require('templates/finance/tabs/transactions.tpl');
var finacntTpl = require('templates/finance/tabs/finacnt.tpl');
var cashflowacntTpl = require('templates/finance/tabs/cashflowacnt.tpl');

var transactionsView = BaseView.extend({
    tagName: 'div',
    template: transactionsTpl,
    className: 'finance-container',
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

var finacntView = BaseView.extend({
    tagName: 'div',
    template: finacntTpl,
    className: 'finance-container',
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

var cashflowacntView = BaseView.extend({
    tagName: 'div',
    template: cashflowacntTpl,
    className: 'finance-container',
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    },
    onRender: function () {
        var $input = this.getContentInternal().find('.input'),
            $results = this.getContentInternal().find('.results');

        var wikiRx = new WikiRx($input, $results);
        wikiRx.initialize();

        //KEFIR
        var counterUp = this.getContentInternal().find('.counterUp'),
            counterDown = this.getContentInternal().find('.counterDown'),
            count = this.getContentInternal().find('.count'),
            outputElement = this.getContentInternal().find('.label');

        var btnClicksUp = Kefir.fromEvents(counterUp, 'click');
        var btnClicksDown = Kefir.fromEvents(counterDown, 'click');

        //var inputValue = Kefir.fromEvents(count, 'keyup')
        //                      .map(event = > event.target.value
        //)
        //;
        //
        //
        //var clicksCountUp = btnClicksUp.scan(sum = > sum + 1, 0
        //)
        //;
        //var clicksCountDown = btnClicksDown.scan(sum = > sum - 1, 0
        //)
        //;

        // var inputNumber = inputValue.map(text => parseInt(text, 10));

        // var fixedInputNumber = inputValue.flatMap(
        //     x => isNaN(x) ? Kefir.constantError('banana?') : Kefir.constant(x)
        // );

        //var theResult = Kefir.combine([clicksCountUp, clicksCountDown], (a, b) = > a + b
        //)
        //;

        //
        //theResult
        //    .onValue(x => {
        //        outputElement.html(x);
        //    })
        //    .onError(error => {
        //        outputElement.html('<span style="color:red">' + error + '</span>');
        //    });


    }
});

var ContentView = RoutedView.extend({
    tagName: 'div',
    template: financeTpl,
    className: 'finance',
    routes: {
        'transactions': transactionsView,
        'finacnt': finacntView,
        'cashflowacnt': cashflowacntView
    },
    links: [{
        id: "transactions",
        name: "transactions"
    }, {
        id: "finacnt",
        name: "finacnt"
    }, {
        id: "cashflowacnt",
        name: "cashflowacnt"
    }],
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);

        this.collection = Helpers.createLinks(this.links, params.stage);
        this.addView(BaseListView, {
            collection: new navBarCollection(this.collection)
        }, '.finance_page__left');
    },
    onRender: function () {

    }
});

module.exports = ContentView;
