var $               = require('jquery');
var _               = require('underscore');
var customSelectTpl = require('templates/overall/plugins/custom_select.tpl');

var SetActiveStateAtList = function(wrapper, param){
	var self = this;
	this.wrapper  = $(wrapper),
	this.input = this.wrapper.find('input');
	this.param = param;

	this.wrapper.on('click', '.list-item', function () {
		self.input.val($(this).data(self.param)).change();
		self.highlight();
	});
};

SetActiveStateAtList.prototype.highlight = function() {
    this.wrapper.
	    find('[data-' + this.param + '="' + this.input.val() + '"]').
	    addClass('active').
	    siblings().
	    removeClass('active');
};



var SetActiveStateAtTable = function(wrapper, param){
	var self = this;
	this.wrapper  = $(wrapper),
	this.input = this.wrapper.find('input');
	this.param = param;

	this.column = this.input.val();
	this.order = undefined;
	this.wrapper.on('click', '.list-item', function () {
		self.input.val($(this).data(self.param)).change();
		self.highlight();
	});
};

SetActiveStateAtTable.prototype.highlight = function() {
//	var thisColumn = $(this).data(self.param);
	var item = this.wrapper.find('[data-' + this.param + '="' + this.input.val() + '"]');
	var thisColumn = item.data(this.param);

	// Check if the column has changed
	if (thisColumn == this.column) {
	    // column has not changed
	    if (this.order == "asc") {
	        this.order = "desc";
	    } else {
	        this.order = "asc";
	    }
	} else {
	    // column has changed
	    this.column = thisColumn;
	    this.order = "desc";
	}
	console.log(this.order);
	item.siblings().removeAttr('data-active');
	item.attr('data-active', this.order);
};




var customSelectArray = [];

$.fn.customSelect = function(method) {

	var method = method;

    return this.each(function() {
        var wrapper = $(this),
            select = wrapper.find('select'),
            items = [],
            data = wrapper.data();


        if(method == 'refresh'){
        //	console.log('refresh');
        	//set current value or placeholder
        	//console.log(select.val());
        	wrapper.find('.custom-select-value').text(select.val() || data.placeholder);
        }

        if(!method){    	
      //  	console.log('init');
	       // customSelectArray.push(wrapper);
	        select.hide();

	        select.find('option').each(function() {
	            items.push(this.value);
	        });

	        var tpl = _.template(customSelectTpl)({
	            value: select.val(),
	            items: items,
	            name: select.data('name'),
	            search: data.search || false
	        });
	        wrapper.append(tpl);

	        //set current value or placeholder
	        wrapper.find('.custom-select-value').text(select.val() || data.placeholder);

	        wrapper.on('click', function() {
	            // customSelectArray.each(function(i, item){
	            // 	item.find('.custom-select-dropdown').toggle();
	            // });
	            wrapper.find('.custom-select-dropdown').toggle();
	        });

	        wrapper.on('click', '.custom-select-dropdown li', function() {
	            wrapper.find('.custom-select-value').text($(this).text());
	            select.val($(this).text()).change();
	        });
        }

    });
};



var Plugins = {
	setActiveStateAtList : SetActiveStateAtList,
	setActiveStateAtTable: SetActiveStateAtTable
};

module.exports = Plugins;