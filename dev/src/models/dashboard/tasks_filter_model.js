var Backbone = require('backbone');

var TaskFilterModel = Backbone.Model.extend({
	defaults: {
		filter: 'all',
	 	sort: 'title',
	 	page: '1'
	}
});

module.exports = TaskFilterModel;