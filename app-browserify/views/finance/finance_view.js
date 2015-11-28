var Backbone = require('backbone'),
    BaseView = require('../../views/baseview'),
    BaseListView = require('./../elements/base_list_view'),
    navBarCollection = require('./../../collections/header_list'),
    financeTpl = require('./finance.tpl'),
    headerListItemTpl = require('./../elements/nav_list_item.tpl'),
    transactionsTpl = require('./tabs/transactions.tpl'),
    finacntTpl = require('./tabs/finacnt.tpl'),
    cashflowacntTpl = require('./tabs/cashflowacnt.tpl');

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

var ContentView = BaseView.extend({
    tagName: 'div',
    template: financeTpl,
    className: 'finance',
    router: true,
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
    }
});

module.exports = ContentView;