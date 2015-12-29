var Backbone = require('backbone'),
    _ = require('underscore'),
    BaseView = require('views/baseview'),
    tpl = require('templates/dashboard/dashboard_pulse.tpl');

var ContentView = BaseView.extend({
    template: tpl,
    className: 'pulse scroll',
    onInitialize: function (params) {
        BaseView.prototype.onInitialize.call(this, params);
    }
});

module.exports = ContentView;
//# sourceMappingURL=dashboard_pulse_view.js.map
