var $              = require('jquery');
var _              = require('underscore');
var Backbone       = require('backbone');

var Api = function (entryPoint) {
	if (this.instance)
		throw new Error('You can not create more than one instance of API. Use Api.getInstance()');
	this.entryPoint = entryPoint;
	this.catalog = undefined;
};

Api.getInstance = function (entryPoint) {
	if (!Api.instance)
		Api.instance = new Api(entryPoint);
	return Api.instance;
};
Api.prototype.getCatalog = function () {
	var deferred = $.Deferred();

	var catalogModel = new Backbone.Model();
	catalogModel.getResource(this.entryPoint).then(function(catalog){
		this.catalog = catalog;
		deferred.resolve(catalog);
	}.bind(this));

	return deferred.promise();
};

module.exports = Api;