define('views/stats/stats_view', [
    'views/baseview',
    'text!templates/stats/submenu.tpl'
], function(
    BaseView,
    tpl
) {

    var ContentView = BaseView.extend({
        tagName: 'div',
        template: tpl,
        className: 'wrapper',
        router: true,
        routes: {

        },
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    return ContentView;

});
