var Backbone = require('backbone');

var CommentModel = Backbone.Model.extend({
	defaults: {
		'postcreator-name'         : 'No name',
		'content'                  : 'No Project',
		'avatar'                   : '',
		'create'                   : ''
	}
});

module.exports = CommentModel;