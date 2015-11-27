define('views/dashboard/dashboard_projects_view', [
    'views/baseview',
    'text!templates/dashboard/dashboard_projects.tpl'
], function(
    BaseView,
    tpl
) {
    return BaseView.extend({
        className : 'projects',
        template  : tpl,
        onInitialize: function(params) {
            BaseView.prototype.onInitialize.call(this, params);
        }
    });

});