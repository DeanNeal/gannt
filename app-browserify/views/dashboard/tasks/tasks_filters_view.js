var Backbone              = require('backbone'),
    Helpers               = require('helpers'),
    $                     = require('jquery'),
    _                     = require('underscore'),
    BaseView              = require('views/baseview'),
    BaseListView          = require('views/elements/base_list_view'),
    FilterModel           = require('models/dashboard/tasks_filter_model'),
    tpl                   = require('templates/dashboard/tasks/tasks_filters.tpl');

var ContentView =  BaseView.extend({
	template: tpl,
    className : 'filters',
    events: {
    	'click .menu-item'   : 'changeFilter',
        'change .priority'   : 'changePriority',
        'click .open-filter' : 'toggleFilter'
    },
    onInitialize: function(params) {
        BaseView.prototype.onInitialize.call(this, params);
        this.route = location.hash.split('?')[0] + '?';

        this.model = new FilterModel({
            priority: 'critical',
            filter: 'all'
        });
        this.modelBinder = new Backbone.ModelBinder();
    },
    onRender: function() {
        var bindings = {
            filter: {
                selector: '.base-filters',
                elAttribute: 'data-active'
            },
            priority: { selector: '.right-filters .priority'}
        };
        this.modelBinder.bind(this.model, this.el, bindings);
    },
    serialize: function(){
        this.data = _.clone(this.model.attributes);
    },
    getRouteWithParams: function(){
        return this.route + Helpers.serializeModel(this.model.toJSON());
    },
    changeFilter: function(e){
    	e.preventDefault();

        this.model.set('filter', $(e.currentTarget).data('filter'));

        Backbone.history.navigate(this.getRouteWithParams(), { trigger: true });
    },
    changePriority: function(e){
        Backbone.history.navigate(this.getRouteWithParams(), { trigger: true });
    },
    toggleFilter: function(e){
        e.preventDefault();
        this.getElement('.dashboard-table-header').toggle().toggleClass('active');
    },
    remove : function () {
        this.modelBinder.unbind();
        BaseView.prototype.remove.call(this);
    }
});

module.exports = ContentView;