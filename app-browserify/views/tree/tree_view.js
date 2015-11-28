var BaseView = require('views/baseview'), 
    tpl      = require('templates/tree/submenu.tpl');

    var treeView = BaseView.extend({
        className   : 'tree',
        template: tpl,
        onInitialize : function (params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });


module.exports = treeView;