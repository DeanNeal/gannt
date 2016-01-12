'use strict';

import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';

function $http(url) {

	// A small example of object
	let core = {

		// Method that performs the ajax request
		ajax: function (method, url, args) {

			// Creating a promise
			return new Promise(function (resolve, reject) {

				// Instantiates the XMLHttpRequest
				var client = new XMLHttpRequest();
				var uri = url;

				if (args /*&& (method === 'POST' || method === 'PUT' || method === 'GET')*/) {
					uri += '?';
					var argcount = 0;
					for (var key in args) {
						if (args.hasOwnProperty(key)) {
							if (argcount++) {
								uri += '&';
							}
							uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
						}
					}
				}

				client.open(method, uri);
				client.send();

				client.onload = function () {
					if (this.status >= 200 && this.status < 300) {
						// Performs the function "resolve" when this.status is equal to 2xx
						resolve(this.response);
					} else {
						// Performs the function "reject" when this.status is different than 2xx
						reject(this.statusText);
					}
				};
				client.onerror = function () {
					reject(this.statusText);
				};
			});
		}
	};

	// Adapter pattern
	return {
		'get': function (args) {
			return core.ajax('GET', url, args);
		},
		'post': function (args) {
			return core.ajax('POST', url, args);
		},
		'put': function (args) {
			return core.ajax('PUT', url, args);
		},
		'delete': function (args) {
			return core.ajax('DELETE', url, args);
		}
	};
}

//function generateLinkedMethods(options) {
//	/*links.forEach(method)*/
//}
//
//export default class LinkedModel extends Backbone.Model {
//	constructor() {
//		super();
//	}
//
//	/*post*/
//	/*put*/
//	/*delete*/
//
//	/*generateLinkedMethods*/
//}
//
//export default class LinkedCollection extends Backbone.Collection {
//	constructor() {
//		super();
//	}
//
//	/*post*/
//	/*delete*/
//
//	/*generateLinkedMethods*/
//}
//
//export default class ModelFactory {
//	constructor (url) {
//		/*this.type = model || collection*/
//	}
//
//	getResourceType (options) {
//		let resourceType = null;
//
//		if (this.type === 'model') {
//			resourceType = LinkedModel
//		} else if (this.type === 'collection') {
//			resourceType = LinkedCollection
//		}
//
//		return new resoresourceType(options);
//	}
//}

var ModelFactory = {
	getModel : function (response) {
		var Model = Backbone.Model.extend({
			constructor : function (srcObj, options) {
				// attributes set
				Backbone.Model.prototype.constructor.call(this, srcObj.data, options);
				// methods set
				_.each(srcObj.links, function (link) {
					// add additional methods
					this['get_' + link.id] = function () {
						return this.getResource(link.href);
					}
				}.bind(this));
			}
		});
		return new Model(response);
	},
	getCollection : function (response) {
		var Collection = Backbone.Collection.extend({
			constructor : function (srcObj, options) {
				Backbone.Collection.prototype.constructor.call(this, null, options);
				// methods set
				_.each(srcObj.links, function (link) {
					// add additional methods
					this['get_' + link.id] = function () {
						return this.getResource(link.href);
					}
				}.bind(this));
			}
		});
		return new Collection(response);
	},
	getResource : function (url) {
		var deferred = $.Deferred();
		$.ajax(url, {
			method: 'GET',
			success : function (response) {
				if(response.data instanceof Array) {
					var collection = this.getCollection(response);
					_.each(response.data, function (model) {
						collection.add(this.getModel(model));
					}.bind(this));
					deferred.resolve(collection);
				} else if (typeof response.data == 'object'){
					deferred.resolve(this.getModel(response));
				}
			}.bind(this)
		});
		return deferred.promise();
	}
};

_.extend(Backbone.Model.prototype, ModelFactory);

var startModel = new Backbone.Model();

// model example
startModel.getResource('json/person1.json').then(function(person) {
	console.log(person);
	return person.get_address();
}).then(function(address){
	//console.log(address);
});

// collection example
startModel.getResource('json/personsCollection.json').then(function(persons) {
	console.log(persons);
	return persons.get(1).get_address();
}).then(function(address){
	//console.log(address);
});

//let taskModel = new ModelFactory()
//taskModel.getResourceType -- model || collection


/*var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
 var payload = {
 'topic' : 'js',
 'q'     : 'Promise'
 };

 var callback = {
 success : function(data){
 console.log(1, 'success', JSON.parse(data));
 },
 error : function(data){
 console.log(2, 'error', JSON.parse(data));
 }
 };*/

// Executes the method call but an alternative way (1) to handle Promise Reject case 
/*$http(mdnAPI) 
 .get(payload)
 .then(callback.success, callback.error);
 */