var BaseView = requare('views/baseview');
var tpl = requare('templates/preloader.tpl');

module.exports = BaseView.extend({
    tagName:'div',
    className   : 'preloader',
    template: tpl,
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    },
    show: function(){
        this.$el.show();
    },
    hide: function(){
        this.$el.hide();
    }
});
