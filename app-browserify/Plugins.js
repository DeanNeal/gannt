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



var customSelectArray = [];

$.fn.customSelect = function() {
    return this.each(function() {
        var wrapper = $(this),
            select = wrapper.find('select'),
            items = [],
            data = wrapper.data();

        customSelectArray.push(wrapper);
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

    });
};



var Plugins = {
	setActiveStateAtList: SetActiveStateAtList
};

module.exports = Plugins;