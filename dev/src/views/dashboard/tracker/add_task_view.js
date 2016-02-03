var Backbone             = require('backbone'),
    BaseView             = require('views/baseview'),
    tpl                  = require('templates/dashboard/tracker/add_task.tpl'),
    $                    = require('jquery'),
    datepicker           = require('datepicker'),
    NewTaskModel         = require('models/dashboard/new_task_model');

var ContentView = BaseView.extend({
	className: 'task-create panel',
	template: tpl,
	events: {
		'click .btn-apply' : 'saveTask'
	},
	onInitialize: function (params) {
		BaseView.prototype.onInitialize.call(this, params);
		this.model = new NewTaskModel();
		this.modelBinder = new Backbone.ModelBinder();
		Backbone.on('global:click', this.onGlobalClick, this);
	},
	onRender: function(){
		var self = this;
		this.modelBinder.bind(this.model, this.el);
		this.getElement('#task-date-start').datepicker({
		    dateFormat: "yy-mm-dd",
		    maxDate: new Date(this.model.get('date-finish')),
		    onSelect: function(selected) {
		        $(this).change(); 
		        self.getElement('#task-date-finish').datepicker("option","minDate", selected)
		    }

		});
		this.getElement('#task-date-finish').datepicker({
		    dateFormat: "yy-mm-dd",
		    minDate: this.model.get('date-start'),
		    onSelect: function(selected) {
		        $(this).change(); 
		        self.getElement('#task-date-start').datepicker("option","maxDate", selected)
		    }
		});

		this.getElement('.custom-select').customSelect({
		    url: this.api.catalog.get_list_task_priority,
		    template: 'customSelectListPriority'
		});

		this.getElement('.custom-select-status').customSelect({
		    url: this.api.catalog.get_processing,
		    template: 'customSelectListPriority'
		});

	},
	onGlobalClick: function(e) {
		var currentEl = $(e.target);
 		if(currentEl.hasClass('btn-add-new') || currentEl.hasClass('icon-add'))
 			return;

		if(!currentEl.parents().hasClass('task-create'))
		  	this.parent.trigger('createView:close');
	},
	saveTask: function() {
		// MUST BE CREATE_TASK METHOD
		var model = new Backbone.Model({
			'create': "2014-04-24 14:59:25",
			'date-finish': "2014-04-09 00:00:00",
			'date-start': "2014-04-09 00:00:00",
			'description': "",
			'id': "34",
			'milestonedatefinish': "2014-07-08",
			'milestonename': "New Milestone",
			'modulerelation-milestonetask': "20",
			'modulerelation-taskmaintag': "8",
			'modulerelation-taskuser': 'null',
			'modulerelation-taskusercreator': 'null',
			'name': "",
			'priority': "0",
			'priority-name': "low",
			'processing': "0",
			'processing-name': "new",
			'taskmaintagname': "BPM",
			'tasktagname': 'null',
			'taskusername': 'null',
			'timestamp': "2014-04-24 14:59:25"
		});
		model.set(this.model.attributes);

		this.parent.trigger('task:add', model);
	},
	remove: function(){
		Backbone.off('global:click', this.onGlobalClick, this);
		this.modelBinder.unbind();

		this.getElement('#task-date-start').datepicker("destroy");
		this.getElement('#task-date-finish').datepicker("destroy");
		BaseView.prototype.remove.call(this);
	}
});

module.exports = ContentView;