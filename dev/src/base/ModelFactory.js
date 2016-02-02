'use strict';

import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';
import $http from 'base/HttpAdapter';

const methods = [{
    method: 'get',
    alias: 'get'
},{
    method: 'put',
    alias: 'update'
},{
    method: 'post',
    alias: 'create'
},{
    method: 'delete',
    alias: 'delete'
}]; 

let ModelFactory = {
    getModel: function (response) {
        class Model extends Backbone.Model {
            constructor(srcObj, options) {
                // attributes set
                super(_.extend(srcObj.data, options));

                // methods set
                if (srcObj.links) {
                    srcObj.links.map(link => {
                        methods.forEach(item=> {
                            if(link.href){
                                this[item.alias + '_' + link.id] = (args) => this.makeRequest(item.method, link.href, args)
                            }
                        });
                    });
                }
            }
        }

        return new Model(response);
    },
    getCollection: function (response) {
        class Collection extends Backbone.Collection {
            constructor(srcObj, options) {
                // attributes set
                super([], options);

                // methods set
                if (srcObj.links) {
                    srcObj.links.map(link => {
                        if(link.href){
                            this['get_' + link.id] = (args) => this.makeRequest('get', link.href, args)
                        }
                    });
                }

                if(srcObj['extra-data']){
                    this.get_extra_data = srcObj['extra-data'];
                }
            }
        }
        return new Collection(response);
    },
    makeRequest: function (method, url, args = {}) {
        let success = response => {
            if (response.data instanceof Array) {
                let collection = this.getCollection(response);

                response.data.map(model => {
                    collection.add(this.getModel(model));
                });
                return collection;
            } else if (typeof response.data == 'object') {
                return this.getModel(response);
            }
        };

        let error = response => console.log(response);

        return $http(url)[method](args).then(success, error).catch(error);
    }
};

_.extend(Backbone.Model.prototype, ModelFactory);
_.extend(Backbone.Collection.prototype, ModelFactory);

export default ModelFactory;