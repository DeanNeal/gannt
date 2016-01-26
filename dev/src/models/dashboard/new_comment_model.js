var Backbone = require('backbone');

var CommentModel = Backbone.Model.extend({
	defaults: {
		'name'         : 'No name',
		'content'      : 'No Project',
		'avatar'       : 'low',
		'date'   : '0000-00-00'
	}
});

module.exports = CommentModel;