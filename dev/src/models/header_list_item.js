var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
      title: 'Default Title',
      isSelected: false
});

module.exports = MenuItem;