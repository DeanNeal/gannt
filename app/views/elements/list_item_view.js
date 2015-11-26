define('views/elements/list_item_view', [
    'views/baseview',
    //'modelBinder'
], function(
    BaseView
) {

    var listItemView = BaseView.extend({
        tagName: 'li',
        className: '',
        events: {
            'click': 'onClick'
        },
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
            //this.modelBinder = new Backbone.ModelBinder();  
        },
        onRender: function() {
            var bindings = {
                isSelected : {
                    selector: '.menu-item', elAttribute: 'data-active'
                }
            }
           // this.modelBinder.bind(this.model, this.el, bindings);
        },
        serialize: function() {
            this.data = _.clone(this.model.attributes);
        },
        onClick: function() {
            this.model.set({'isSelected': true});
        }
    });

    return listItemView;
});
