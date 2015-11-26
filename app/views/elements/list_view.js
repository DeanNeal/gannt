define('views/elements/list_view', [
    'views/baseview'
], function(
    BaseView
) {

    var listView = BaseView.extend({
        tagName: 'ul',
        className: 'nav navbar-nav',
        onInitialize: function(params) {
            var self = this;
            BaseView.prototype.onInitialize.call(this, params);
            this.collection.each(function(model) {
                self.addView(params.listItemView, {
                    model: model
                });
            });
            
        },
        onChangeStage: function(currentStage) {
            
            this.collection.each(function(model) {
                if(model.get('name') == currentStage)
                   model.set({'isSelected': true});
            });
        } 
    });

    return listView;
});
