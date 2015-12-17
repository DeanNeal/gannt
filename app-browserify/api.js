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

Api.prototype.getUrl = function (collection, id) {
	var model = _.findWhere(collection, {id: id});
	return (model) ? model.links[0].href : '';
};

function generateQuery(data) {
	var deferred = $.Deferred();

	$.ajax(data).done(function (data) {
		deferred.resolve(data);
	});

	return deferred.promise();
}

Api.prototype.getResourceByUrl = function (url) {
	return generateQuery({
		method: 'get',
		url: url
	});
};

Api.prototype.createResourceByUrl = function (url, data) {
	return generateQuery({
		method: 'post',
		url: url,
		data: data
	});
};

Api.prototype.updateResourceByUrl = function (url, data) {
	return generateQuery({
		method: 'put',
		url: url,
		data: data
	});
};

Api.prototype.deleteResourceByUrl = function (url) {
	return generateQuery({
		method: 'delete',
		url: url
	});
};

module.exports = Api;