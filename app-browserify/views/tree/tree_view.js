 define('views/tree/tree_view', [
    'views/baseview',
    'text!templates/tree/submenu.tpl'
], function(
    BaseView,
    tpl
){

    var ContentView = BaseView.extend({
        tagName:'div',
        template: tpl,
        className: 'wrapper',
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

    return BaseView.extend({
        className   : 'tree',
        onInitialize : function () {
            this.addView(ContentView);
        }
    });

});
