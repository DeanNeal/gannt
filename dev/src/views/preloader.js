var BaseView = require('views/baseview');
var tpl      = require('templates/preloader.tpl');

module.exports = BaseView.extend({
    tagName:'div',
    className   : 'loader-wrapper',
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
