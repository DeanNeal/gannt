define('views/dashboard/dashboard_milestones_view', [
    'views/baseview',
    'text!templates/dashboard/dashboard_milestones.tpl'
], function(
    BaseView,
    tpl
) {
    return BaseView.extend({
        className : 'milestones',
        template  : tpl,
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

});