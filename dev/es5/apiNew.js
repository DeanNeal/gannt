var $ = require('jquery'),
    _ = require('underscore');

var Node = function (data) {
    this.data = data.data;
    _.each(data.links, (function (item, i) {
        var getterName = 'get' + item.id.substr(0, 1).toUpperCase() + item.id.substr(1);
        this[getterName] = function () {
            return Node.create(item.href);
        };
    }).bind(this));
};

Node.create = function (url) {
    var deffered = $.Deferred();
    $.get(url, (function (data) {
        deffered.resolve(new Node(data));
    }).bind(this));
    return deffered.promise();
};

Node.getCollectionItem = function () {};

module.exports = Node;
//# sourceMappingURL=apiNew.js.map
