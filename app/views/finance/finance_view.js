define('views/finance/finance_view', [
    'views/baseview',
    'views/elements/list_item_view',
    'views/elements/list_view',
    'collections/header_list',
    'text!templates/header/header_list_item.tpl',
    'text!templates/finance/sidebar.tpl',
    'text!templates/finance/tabs/transactions.tpl',
    'text!templates/finance/tabs/finacnt.tpl',
    'text!templates/finance/tabs/cashflowacnt.tpl'
], function(
    BaseView,
    ListItemView,
    ListView,
    navBarCollection,
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
    }, {
        title: "tree of purposes",
        route: "finance/purposes",
        name: "purposes"
    }];

    var SidebarItemView = ListItemView.extend({
        template: headerListItemTpl
    });

    var SidebarListView = ListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

    var SidebarLeftMenu = BaseView.extend({
        tagName: 'div',
        className: 'finance_page__left scroller',
        onInitialize: function(params) {
            this.addView(SidebarListView, {
                collection: new navBarCollection(financeLinks),
                listItemView: SidebarItemView
            });
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    var ContentView = BaseView.extend({
        tagName: 'div',
        className: 'finance',
        router: true,
        routes: {
            transactions: transactionsView,
            finacnt: finacntView,
            cashflowacnt: cashflowacntView
        },
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
            this.addView(SidebarLeftMenu);
        }
    });

    return ContentView;

});
