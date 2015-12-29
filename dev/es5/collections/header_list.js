var MenuItem = require('../models/header_list_item'),
    Backbone = require('backbone'),
    _ = require('underscore');

var MenuItemCollection = Backbone.Collection.extend({
    model: MenuItem,
    initialize: function (params) {
        this.on('change:isSelected', this.onSelectedChanged, this);

        this.lastActive = undefined;
    },

    onSelectedChanged: function (model) {
        if (this.lastActive && this.lastActive != model) {
            this.lastActive.set('isSelected', false);
        }
        this.lastActive = model;
    }
});

module.exports = MenuItemCollection;
//# sourceMappingURL=header_list.js.map
