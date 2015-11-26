define('views/finance/finance_view', [
    'views/baseview',
    'collections/header_list',
    'text!templates/finance/finance.tpl',
    'text!templates/header/header_list_item.tpl',
    'text!templates/finance/sidebar.tpl',
    'text!templates/finance/tabs/transactions.tpl',
    'text!templates/finance/tabs/finacnt.tpl',
    'text!templates/finance/tabs/cashflowacnt.tpl'
], function(
    BaseView,
    navBarCollection,
    financeTpl,
    headerListItemTpl,
    sidebarTpl,
    transactionsTpl,
    finacntTpl,
    cashflowacntTpl
) {

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
            this.collection = new navBarCollection(financeLinks);
        },
        serialize: function() {
            this.data = {
                sideBarLinks : _.clone(this.collection.models)
            };
        }
    });

    return ContentView;

});
