var Backbone       = require('backbone'),
    _              = require('underscore'),
    $              = require('jquery'),
    BaseView       = require('views/baseview');

var PopupView = BaseView.extend({
    className: 'popup',
    afterInitialize: function(){
        Backbone.on('global:click', this.onGlobalClick, this);
    },
    onGlobalClick: function(e) {
        var currentEl = $(e.target);
           
        if(!currentEl.parents().hasClass('popup') && !currentEl.parents().hasClass('open-popup')){
            this.parent.trigger('popups:close');
        }
    },
    remove : function () {
        Backbone.off('global:click', this.onGlobalClick, this);
        BaseView.prototype.remove.call(this);
    }
});


module.exports = PopupView;