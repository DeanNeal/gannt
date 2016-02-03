var Backbone = require('backbone');

var TaskFilterModel = Backbone.Model.extend({
	defaults: {
		'taskmaintagname' : 'No Project',
		'priority'        : '0',
		'priority-name'   : 'low',
		'processing'      : '0',
		'processing-name' : 'new',
		'taskusername'    : 'Assign to me',
		'type'            : 'Task',
		'milestonename'   : '+ Select Milestone',
		'date-start'      : '0000-00-00',
		'date-finish'     : '0000-00-00',
		'tasktag-name'    : 'Tag1,Tag2'
	}
});

module.exports = TaskFilterModel;