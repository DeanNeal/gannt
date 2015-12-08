var Backbone       = require('backbone'),
     _             = require('underscore'),
    BaseView       = require('views/baseview'),
    navListItemTpl = require('templates/elements/nav_list_item.tpl'),
    ModelBinder    = require('backbone.modelbinder');

var listItemView = BaseView.extend({
    tagName: 'li',
    template: navListItemTpl,
    className: '',
    events: {
        'click': 'onClick'
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.modelBinder = new Backbone.ModelBinder();
    },
    onRender: function() {
        var bindings = {
            isSelected: {
                selector: '.menu-item',
                elAttribute: 'data-active'
            }
        }
        this.modelBinder.bind(this.model, this.el, bindings);
    },
    serialize: function() {
        this.data = _.clone(this.model.attributes);
    },
    onClick: function() {
        this.model.set({
            'isSelected': true
        });
    }
});

var listView = BaseView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav',
    onInitialize: function(params) {
        var self = this;
        BaseView.prototype.onInitialize.call(this, params);
        this.collection.each(function(model) {
            self.addView(listItemView, {
                model: model
            });
        });
        this.listenTo(this.parent, 'change:stage', this.onChangeStage, this);
    },
    onChangeStage: function(currentStage) {
        this.collection.each(function(model) {
            if (model.get('id') == currentStage)
                model.set({
                    'isSelected': true
                });
        });
    }
});


module.exports = listView;