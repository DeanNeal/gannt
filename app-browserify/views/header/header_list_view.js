var BaseView = require('../../views/baseview'),
    BaseListView = require('../elements/base_list_view');


    var HeaderListView = BaseListView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav'
    });

module.exports = HeaderListView;