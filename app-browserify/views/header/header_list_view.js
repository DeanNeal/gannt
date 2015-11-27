var BaseView = require('views/baseview'),
    BaseListView = require('views/elements/base_list_view'),
    headerLogoTpl = require('templates/header/header_logo.tpl');


    var HeaderListView = BaseListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

module.exports = HeaderListView;