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

	},
	onGlobalClick: function(e) {
		var currentEl = $(e.target);
 		if(currentEl.hasClass('btn-add-new') || currentEl.hasClass('icon-add'))
 			return;

 		if(!currentEl.parents().hasClass('custom-select'))
 		    this.getElement('.custom-select').customSelect('hide');
 		
		if(!currentEl.parents().hasClass('task-create'))
		  	this.parent.trigger('createView:close');
	},
	saveTask: function() {
		this.collection;
	},
	remove: function(){
		Backbone.off('global:click', this.onGlobalClick, this);
		BaseView.prototype.remove.call(this);
	}
});

module.exports = ContentView;