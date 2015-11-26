define('views/header/header_list_view', [
    'views/baseview',
    // 'views/elements/list_item_view',
    // 'views/elements/list_view',
    'text!templates/header/header_logo.tpl',
    'text!templates/header/header_list_item.tpl',
    'collections/header_list'
   // 'modelBinder'
], function(
    BaseView,
    // ListItemView,
    // ListView,
    headerLogoTpl,
    headerListItemTpl,
    navBarCollection
) {
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

    var HeaderLogo = BaseView.extend({
        template: headerLogoTpl,
        className: '',
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    var HeaderItemView = ListItemView.extend({
        template: headerListItemTpl
    });

    var HeaderListView = ListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

    var HeaderTopLeftMenu = BaseView.extend({
        tagName: 'div',
        className: 'top_left__menu',
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
            this.addView(HeaderListView, {
                collection: new navBarCollection(headerLinks),
                listItemView: HeaderItemView
            });
        }
    });


    var HeaderView = BaseView.extend({
        tagName: 'div',
        className: 'navbar',
        id: 'header',
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
            this.addView(HeaderLogo);
            this.addView(HeaderTopLeftMenu);
        }
    });

    return HeaderView;
});
