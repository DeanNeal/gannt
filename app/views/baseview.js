define('views/baseview', ['backbone', 'require'], function(Backbone, require) {
    //Helpers     = require('core/Helpers'),
    //Facade      = require('core/Facade');

    return Backbone.View.extend({

        template    : '',

        tagName     : 'div',

        className   : 'BaseView',

        router      : false,
        /**
         * Methods provides basic initialization functionality
         */
        initialize : function (params) {

            //this.middlewares = {};

            //this.subscribes  = {};

            //this.controller = Facade.getInstance();

            this.contentInternal = this.$el;

            this.parent = params ? params.parent : null;

            this.isRendered = false;

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

            if(!this.collection && this.parent)
                this.collection = this.parent.collection;

            this.onInitialize(params);
            //this.setSubscribes();
            //this.setMiddlewares();
            this.serialize();
            this.afterInitialize(params);

        },
        // setMiddlewares : function () {
        //     for(var key in this.middlewares) {
        //         if (!this.middlewares.hasOwnProperty(key))
        //             continue;
        //         if(this[this.middlewares[key]]) {
        //             this.registeredMiddlewares.push(
        //                 this.controller.addMiddleware(key, this[this.middlewares[key]], this)
        //             );
        //         }
        //     }
        // },
        // setSubscribes : function () {
        //     for(var key in this.subscribes) {
        //         if (!this.subscribes.hasOwnProperty(key))
        //             continue;
        //         if(this[this.subscribes[key]]) {
        //             this.registeredSubscibes.push(
        //                 this.controller.subscribe(key, this[this.subscribes[key]], this)
        //             );
        //         }
        //     }
        // },
        getId : function () {
            return this.id;
        },
        // getContentInternal: function () {
        //     return $(this.contentInternal);
        // },
        /**
         * This method must be override by child classes for
         * custom serialization
         */
        serialize : function () {
            /** nothing to do **/
        },
        /**
         * This method can be override by child classes for
         * custom initialization. Be careful, do not forget to
         * call the parent onInitialize method in inheritance
         * chain.
         */
        onInitialize : function (params) {
            /** nothing to do **/
        },

        afterInitialize : function (params) {
            /** nothing to do **/
        },
        getElement : function (el) {
            if(typeof el === 'string') {
                return $(this.$el, el);
            } else {
                return el;
            }
        },
        toggleClassNames : function () {
            var parent = this.parent;
            while(parent) {
                this.$el.toggleClass(parent.className);
                parent = parent.parent;
            }
            return this.el;
        },
        /**
         * Method adds new nested view
         * @param view
         */
        addView : function(view, params, targetElement) {
            params = params || {};
            params.parent = this;
            view = new view(params);
            this.nestedViews.push({
                targetElement   : targetElement,
                view            : view});
            return view;
        },
        renderNestedView : function (view, targetElement) {
            var el = this.$el;
            if(targetElement)
                el = (typeof targetElement === 'string') ? this.$el.find(targetElement) : targetElement;
            el.append(view.render().el);
        },

        getTemplate: function(name, model) {
            var temp = 'text!templates/' + name + '.tpl',
                template = require(temp);
            return _.template(template)(model ? model : {});
        },
        /**
         * Renders current view. It always returns itself and must be called from
         * all render methods in child classes
         * @returns {BaseView}
         */
        render : function(redraw) {

            this.serialize();

            if(redraw) {
                this.isRendered = false;
            }

            if(!this.isRendered) {
                this.$el.empty();
                var html = this.template(this.data);
                if (html) {
                    var el = document.createElement('div');
                    el.innerHTML = html;
                    // check if exists template wrapper
                    if($(el).find('.template').length)
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

        onRender: function(params){
            /** nothing to do **/
        },
        /**
         * Removes nested view
         * @param view
         */
        removeNestedView : function(view) {
            this.stopListening(view);
            this.nestedViews = this.nestedViews.filter(function(value){
                return value.view != view;
            }.bind(this));
            view.remove();
        },
        /**
         * Removes view
         */
        remove : function() {
            // view is removed
            this.isRendered = false;
            // removes all nested views
            _.each(this.nestedViews, function (value) {
                this.removeNestedView(value.view);
            }, this);
            // removes registered middlewares
            // _.each(this.registeredMiddlewares, function(id){
            //     this.controller.removeMiddlewareById(id);
            // }, this);
            // removes registered subscriptions
            // _.each(this.registeredSubscibes, function(id){
            //     this.controller.unsubscribeById(id);
            // }, this);
            // clear all listeners
            this.stopListening();
            // clear main element
            this.$el.empty();
            // remove view
            Backbone.View.prototype.remove.call(this);
        },
        onChangeStage: function(currentStage) {
            
            this.collection.each(function(model) {
                if(model.get('name') == currentStage)
                   model.set({'isSelected': true});
            });
        },
        changeStage: function(params) {
            if(params.stagesArray[0]){
                if(this.currentStage !== params.stagesArray[0] || !params.stagesArray[1]){ // if current stage is already rendered and next stage doesn't exist
                    if(this.nextStage) // if current view exist we have to remove it 
                       this.nextStage.remove();
                    this.nextStage = this.addView(this.routes[params.stagesArray[0]], {}, '.bb-route-container'); // create an instance of current view and set it into current view
                    this.$el.find('.bb-route-container').append(this.nextStage.render().el); // render current stage into current view
                }

                this.currentStage = params.stagesArray[0]; // save current stage
                params.stagesArray.shift(); // remove current stage from stages array
            
                this.onChangeStage(this.currentStage);
                if(this.router)
                    this.nextStage.changeStage(params); // start again without current stage
            }
        }
    });
});
