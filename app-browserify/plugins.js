var $                   = require('jquery');
var _                   = require('underscore');
var customSelectTpl     = require('templates/overall/plugins/custom_select.tpl');
var customSelectListTpl = require('templates/overall/plugins/custom_select_list.tpl');
var Api                 = require('api');

var api = Api.getInstance('build/api/catalog.json');

require('malihu-custom-scrollbar-plugin')($);



var SetActiveStateAtList = function(wrapper, param){
	var self = this;
	this.wrapper  = $(wrapper),
	this.input = this.wrapper.find('input');
	this.param = param;

	this.wrapper.on('click', '.list-item', function () {
		self.input.val($(this).data(self.param)).change();
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

	this.wrapper.on('click', '.list-item', function () {
		self.input.val($(this).data(self.param)).change();
	});
};


SetActiveStateAtTable.prototype.highlight = function() {
    var item = this.wrapper.find('[data-' + this.param + '="' + this.input.val()  + '"]');

    item.siblings().removeAttr('data-active');
    item.attr('data-active', true);
};




var customSelectArray = [];

$.fn.customSelect = function(method) {

	var method = method;

    return this.each(function() {
        var $wrapper = $(this),
            $select = $wrapper.find('select'),
            $input = $wrapper.find('input'),
            items = [],
            data = $wrapper.data();


        //set current value or placeholder
        if(method == 'refresh'){
        	$wrapper.find('.custom-select-value').text($input.data('text') || $input.val() || data.placeholder);
        }

        //clear custom selects and destroy them
        if(method == 'destroy'){
        	customSelectArray = [];
        }

        if(!method){
	        customSelectArray.push($wrapper);
	        $select.hide();

	        $select.find('option').each(function() {
	            items.push(this.value);
	        });

	        var tpl = _.template(customSelectTpl)({
	            value: $input.val(),
	            items: items,
	            name: $input.data('name'),
	            search: $wrapper[0].hasAttribute('data-search') || false,
	            placeholder: data.placeholder.toLowerCase()
	        });

	        $wrapper.append(tpl);

	        var $value =  $wrapper.find('.custom-select-value'),
	        	$dropdown = $wrapper.find('.custom-select-dropdown'),
	        	$container = $wrapper.find('.custom-select-container');

	        //set current value or placeholder
	        $value.text($input.val() || data.placeholder);

	        $wrapper.on('click', '.custom-select-value', function() {
	            customSelectArray.forEach(function(item) {
	                if (!$wrapper.is(item))
	                	item.removeClass('custom-select-open').find('.custom-select-dropdown').hide(); 
	            });

	            $dropdown.toggle();
	            $wrapper.toggleClass('custom-select-open');

	            if ($wrapper[0].hasAttribute('data-search') && $dropdown.is(':visible')) {
	                api.getResousceFromCatalog('tasks').then(function(response) {
	                	var tpl = _.template(customSelectListTpl)(response);
	                	$wrapper.find('ul').html(tpl);
	                	//$wrapper.find('ul').mCustomScrollbar();
	                });
	            }
	        });

	        $wrapper.on('click', '.custom-select-dropdown li', function() {
	            $input
		            .val($(this).data('id'))
		            .data('text', $(this).text())
		            .change();

		        if (!$wrapper[0].hasAttribute('data-search'))
		        	$container.attr('data-selected', $(this).text());

	            //hide all
	            customSelectArray.forEach(function(item) {
	               	item.removeClass('custom-select-open').find('.custom-select-dropdown').hide();
	            });
	        });
        }

    });
};



var Plugins = {
	setActiveStateAtList : SetActiveStateAtList,
	setActiveStateAtTable: SetActiveStateAtTable
};

module.exports = Plugins;