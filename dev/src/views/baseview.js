var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Api = require('base/api');

var BaseView = Backbone.View.extend({

    template: '',

    tagName: 'div',

    className: 'BaseView',

    /**
     * Methods provides basic initialization functionality
     */
    initialize: function (params) {

        //this.middlewares = {};

        //this.subscribes  = {};

        this.api = Api.getInstance();

        this.contentInternal = this.$el;

        this.parent = params ? params.parent : null;

        this.isRendered = false;

        this.stage = params ? params.stage : null;

        this.data = {};

        this.nestedViews = [];
        /**
         * Unique id for current view
         * @type {string}
         * @private
         */
        this.id = this.id; //|| Helpers.generateUUID();

        //this.registeredMiddlewares = [];

        // this.registeredSubscibes = [];

        this.template = _.template(this.template);

        if (!this.collection && this.parent)
            this.collection = this.parent.collection;

        this.onInitialize(params);
        //this.setSubscribes();
        //this.setMiddlewares();
        this.serialize(params);
        this.afterInitialize(params);

    },

    getId: function () {
        return this.id;
    },
    getContentInternal: function () {
        return $(this.contentInternal);
    },
    /**
     * This method must be override by child classes for
     * custom serialization
     */
    serialize: function (params) {
        /** nothing to do **/
    },
    /**
     * This method can be override by child classes for
     * custom initialization. Be careful, do not forget to
     * call the parent onInitialize method in inheritance
     * chain.
     */
    onInitialize: function (params) {
        /** nothing to do **/
    },

    afterInitialize: function (params) {
        /** nothing to do **/
    },
    getElement: function (el) {
        if (typeof el === 'string') {
            return this.$el.find(el);
        } else {
            return el;
        }
    },
    toggleClassNames: function () {
        var parent = this.parent;
        while (parent) {
            this.$el.toggleClass(parent.className);
            parent = parent.parent;
        }
        return this.el;
    },
    /**
     * Method adds new nested view
     * @param view
     * @param params object
     * @param targetElement
     */
    addView: function (view, params, targetElement) {
        params = params || {};
        params.parent = this;
        view = new view(params);
        this.nestedViews.push({
            targetElement: targetElement,
            view: view
        });
        return view;
    },

    addViewByName: function(popupName, view, data, target){
        if(data instanceof Backbone.Collection)
            data = {collection: data}
        else
            data = {model: data}

        if(!this[popupName]) {
            this[popupName] = this.addView(view, data || {}, target || false);
            this.renderNestedView(this[popupName], target || false);
        }
    },

    addItemView: function(view, data, target, prepend){
        this.renderNestedView(this.addView(view, data || {}), target || false, prepend || false);
    },

    renderNestedView: function (view, targetElement, prepend) {
        var el = this.$el;
        if (targetElement)
            el = (typeof targetElement === 'string') ? this.$el.find(targetElement) : targetElement;

        if(prepend)
            el.prepend(view.render().el);
        else
            el.append(view.render().el);
    },

    // getTemplate: function (name, model) {
    //     var temp = 'text!templates/' + name + '.tpl',
    //         template = require(temp);
    //     return _.template(template)(model ? model : {});
    // },
    /**
     * Renders current view. It always returns itself and must be called from
     * all render methods in child classes
     * @returns {BaseView}
     */
    render: function (redraw) {

        this.serialize();

        if (redraw) {
            this.isRendered = false;
        }

        if (!this.isRendered) {
            this.$el.empty();
            var html = this.template(this.data);
            if (html) {
                var el = document.createElement('div');
                el.innerHTML = html;
                // check if exists template wrapper
                if ($(el).find('.template').length)
                    this.contentInternal = $(el).find('.template').children();
                else
                    this.contentInternal = el.firstElementChild;
                this.$el.append(this.contentInternal);
            }
            this.$el.attr('id', this.id);
            this.isRendered = true;
        }

        _(this.nestedViews).forEach(function (currentElement) {
            this.renderNestedView(currentElement.view, currentElement.targetElement);
        }, this);

        this.onRender();

        return this;
    },

    onRender: function (params) {
        /** nothing to do **/
    },
    /**
     * Removes nested view
     * @param view
     */
    removeNestedView: function (view) {
        if(view){
            this.stopListening(view);
            this.nestedViews = this.nestedViews.filter(function (value) {
                return value.view != view;
            }.bind(this));
            view.remove();
        } else {
            this.nestedViews = [];
        }
    },

    removeNestedViewByName: function (popupName) {
        if(this[popupName]){        
            this.removeNestedView(this[popupName]);
            this[popupName] = undefined;
        }
    },

    // removeAllNestedView: function () {
    //     this.stopListening();
    //     this.nestedViews = [];
    // },
    /**
     * Removes view
     */
    remove: function () {
        // view is removed
        this.isRendered = false;
        // removes all nested views
        _.each(this.nestedViews, function (value) {
            this.removeNestedView(value.view);
        }, this);
        // clear all listeners
        this.stopListening();
        // clear main element
        this.$el.empty();
        // remove view
        Backbone.View.prototype.remove.call(this);
    },
    beforeChangeStage: function () {
        var deferred = $.Deferred();
        setTimeout(function () {
            deferred.resolve(true);
        });
        return deferred.promise();
    },
    afterChangeStage: function (currentStage) {
        /*nothing to do*/
    },
    beforeModelUpdate: function (params) {
        /*nothing to do*/
    },
    onChangeParams: function (params) {
        /*nothing to do*/
    },
    changeStage: function (params) {
        if (params.stagesArray[0]) {
            this.beforeChangeStage(params).then(function (data) {

                if (this.currentStage !== params.stagesArray[0]) { // if current stage is already rendered and next stage doesn't exist
                    if (this.nextStage) // if current view exist we have to remove it
                        this.removeNestedView(this.nextStage);
                    var target = this.getContentInternal().find('.bb-route-container');
                    
                    if(!this.routes[params.stagesArray[0]])
                        window.location.href = '404.html';

                    this.nextStage = this.addView(this.routes[params.stagesArray[0]], {
                        stage: params.stagesArray[0],
                        query: params.query
                    }, target);
                    this.renderNestedView(this.nextStage, target);
                }


                this.currentStage = params.stagesArray[0]; // save current stage
                params.stagesArray.shift(); // remove current stage from stages array

                this.afterChangeStage(this.currentStage);
                this.nextStage.onChangeParams(params);
                this.nextStage.changeStage(params);

            }.bind(this));
        }
    },
    testCase: function() {
        return true;
    }
});

module.exports = BaseView;
