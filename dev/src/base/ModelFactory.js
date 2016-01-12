'use strict';

import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';
import $http from 'base/HttpAdapter';

let ModelFactory = {
    getModel: function (response) {
        class Model extends Backbone.Model {
            constructor(srcObj, options) {
                // attributes set
                super(Object.assign(srcObj.data, options));

                // methods set
                srcObj.links.map(link => {
                    this['get_' + link.id] = () => this.getResource(link.href)
                });
            }
        }

        return new Model(response);
    },
    getCollection: function (response) {
        class Collection extends Backbone.Collection {
            constructor (srcObj, options) {
                // attributes set
                super(options);

                // methods set
                srcObj.links.map(link => {
                    this['get_' + link.id] = () => this.getResource(link.href)
                });
            }
        }
        return new Collection(response);
    },
    getResource: function (url) {
        let self = this;
        let success = function(response) {
            if (response.data instanceof Array) {
                let collection = self.getCollection(response);
                response.data.map(model => {
                    collection.add(this.getModel(model));
                });
                return collection;
            } else if (typeof response.data == 'object') {
                return self.getModel(response);
            }
        };

        return $http(url).get().then(success, function(e) {
            console.log(e);
        });
    }
};

Object.assign(Backbone.Model.prototype, ModelFactory);