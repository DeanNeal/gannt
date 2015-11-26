define('models/header_list_item', function() {
    var MenuItem = Backbone.Model.extend({
          title: 'Default Title',
          isSelected: false
    });

    return MenuItem;
});
