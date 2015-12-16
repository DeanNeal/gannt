var $ = require('jquery'),
    _ = require('underscore');

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

	$.get(this.entryPoint, function (data) {
		this.catalog = data;
		deferred.resolve(data);
	}.bind(this));
	return deferred.promise();
};

Api.prototype.getResousceFromCatalog = function (resourceName) {
	var url      = _.findWhere(this.catalog.links, {id: resourceName}).href,
	    deferred = $.Deferred();

	$.get(url, function (data) {
		deferred.resolve(data);
	}.bind(this));

	return deferred.promise();
};

Api.prototype.getResource = function (resourceName, parentResource) {
	var url      = _.findWhere(parentResource.links, {id: resourceName}).href,
	    deferred = $.Deferred();

	$.get(url, function (data) {
		deferred.resolve(data);
	}.bind(this));

	return deferred.promise();
};

Api.prototype.getResourceFromUrl = function(collection, id){
    var url = _.findWhere(collection, {id: id}).links[0].href,
        deffered = $.Deferred();

	debugger

    $.get(url, function(data){
        deffered.resolve(data);
    }.bind(this));

    return deffered.promise();
};


module.exports = Api;