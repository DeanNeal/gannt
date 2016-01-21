var Backbone = require('backbone');

var TaskFilterModel = Backbone.Model.extend({
	defaults: {
		'taskmaintagname' : 'No Project',
		'priority-name'   : 'major',
		'processing-name' : 'new',
		'taskusername'    : 'Assign to me',
		'type'            : 'Task',
		'milestonename'   : '+ Select Milestone',
		'date-start'      : '0000-00-00',
		'date-finish'     : '0000-00-00'
	}
});

module.exports = TaskFilterModel;