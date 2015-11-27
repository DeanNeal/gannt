define('views/header/header_list_view', [
    'views/baseview',
    'views/elements/base_list_view',
    'text!templates/header/header_logo.tpl'
], function(
    BaseView,
    BaseListView,
    headerLogoTpl
) {

    var HeaderListView = BaseListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

    return HeaderListView;
});
