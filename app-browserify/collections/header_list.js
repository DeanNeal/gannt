var MenuItem = require('../models/header_list_item'),
    Backbone = require('backbone');

var MenuItemCollection = Backbone.Collection.extend({
    model: MenuItem,
    initialize: function(params) {
        this.on('change:isSelected', this.onSelectedChanged, this);

        this.lastActive = undefined;

        _.each(params, function(item, key) {
            this.add({
                title: item.title,
                route: item.route,
                isSelected: false
            })
        }, this);
    },

    onSelectedChanged: function(model) {
        if (this.lastActive && this.lastActive != model) {
            this.lastActive.set('isSelected', false);
        }
        this.lastActive = model;
    }
});

module.exports = MenuItemCollection;