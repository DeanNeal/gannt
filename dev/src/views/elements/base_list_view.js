var Backbone       = require('backbone'),
     _             = require('underscore'),
    BaseView       = require('views/baseview'),
    navListItemTpl = require('templates/elements/nav_list_item.tpl');

var listItemView = BaseView.extend({
    tagName: 'li',
    template: navListItemTpl,
    className: '',
    events: {
        'click': 'onClick'
    },
    onInitialize: function(params) {
        if(params.template)
            this.template = _.template(params.template);

        BaseView.prototype.onInitialize.call(this, params);
        this.modelBinder = new Backbone.ModelBinder();
        
        if(this.model.get('active'))
            this.model.set({
                'isSelected': true
            });
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
        if(!this.model.get('disabled')){
            this.model.set({
                'isSelected': true
            });
        }
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
                model: model,
                template: params.itemTpl,
                className: params.itemClassName
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