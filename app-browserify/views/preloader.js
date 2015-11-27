 define('views/preloader', [
    'views/baseview',
    'text!templates/preloader.tpl'
], function(
    BaseView,
    tpl
){
    return BaseView.extend({
        tagName:'div',
        className   : 'preloader',
        template: tpl,
        onInitialize: function (params) {
            BaseView.prototype.onInitialize.call(this, params);
            Backbone.on('show:preloader', this.show, this);
            Backbone.on('hide:preloader', this.hide, this);
        },
        show: function(){
            this.$el.show();
        },
        hide: function(){
            this.$el.hide();
        }
    });

});