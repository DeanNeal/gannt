var $ = require('jquery');
var _ = require('underscore');
var Api = require('base/api');
var Helpers = require('base/helpers');
var customSelectTpl = require('templates/overall/plugins/custom_select.tpl');

var templates = {
	customSelectListTpl: require('templates/overall/plugins/custom_select_list.tpl'),
	customSelectListPriority: require('templates/overall/plugins/custom_select_list_priority.tpl')
};

var api = Api.getInstance('/api/v1/system/catalog');

//require('custom-scrollbar');

class SetActiveState {
	constructor(wrapper, param) {
		let self = this;
		this.wrapper = $(wrapper);
		this.input = this.wrapper.find('input');
		this.param = param;

		this.wrapper.on('click', '.list-item', function () {
			let oldStr = $(this).data(self.param);
			let string = (oldStr[0] == '-') ? oldStr.substr(1) : `-${oldStr}`;
			$(this).data(self.param, string);

			self.input.val(string).change();
		});
	}

	highLight() {}
}

class SetActiveStateAtList extends SetActiveState {
	highLight() {
		this.wrapper.
		find('[data-' + this.param + '="' + this.input.val() + '"]').
		    addClass('active').
		    siblings().
		    removeClass('active');
	}
}

class SetActiveStateAtTable extends SetActiveState {
	highLight() {
		var item = this.wrapper.find('[data-' + this.param + '="' + this.input.val() + '"]');

		item.siblings().removeAttr('data-active');
		item.attr('data-active', true);
	}
}


var customSelectArray = [];


$.fn.customSelect = function (options) {

	// var method = method;

	if (typeof options === 'object')
		options = options;
	if (typeof options === 'string') {
		options = {
			method: options
		};
	}

	var settings = $.extend(true, {}, $.fn.customSelect.defaults, options);

	return this.each(function () {
		var $wrapper = $(this),
		    $input   = $wrapper.find('.custom-select-input'),
		    $value   = $wrapper.find('.custom-select-value'),
		    items    = [],
		    data     = $wrapper.data(),
		    placeholder = $input.attr('placeholder') ? $input.attr('placeholder').toLowerCase() : '';

		//set current value or placeholder
		if (settings.method == 'refresh') {

			if($input.val()){		
				//$wrapper.attr('data-selected', $input.val());
				$value.text($value.text() || $input.val());
			}
			else
				$value.text(placeholder);
		}
 
		if (settings.method == 'hide') {
			customSelectArray.forEach(function (dropdown, i) {
				if(dropdown.is($wrapper))
					$wrapper.removeClass('custom-select-open');
			});
		}
		//clear custom selects and destroy them
		if (settings.method == 'destroy') {
			customSelectArray.forEach(function (dropdown, i) {
				if(dropdown.is($wrapper))
					customSelectArray.splice(i, 1);
			});
		}

		if (!settings.method) {
			customSelectArray.push($wrapper);

			var tpl = _.template(customSelectTpl)({
				value: $input.val(),
				items: items,
				name: $input.data('name'),
				search: $wrapper[0].hasAttribute('data-search') || false,
				placeholder: placeholder
			});

			$wrapper.append(tpl);

			var $list      = $wrapper.find('.custom-select-dropdown-list'),
			    $dropdown  = $wrapper.find('.custom-select-dropdown'),
			    $container = $wrapper.find('.custom-select-container'),
			    $search    = $wrapper.find('.custom-select-dropdown-search');

			if($input.val()){
			 	$wrapper.attr('data-selected', $input.val());
			 	$value.text($input.val());
			}

			$wrapper.on('click', '.custom-select-value', function () {
				customSelectArray.forEach(function (item) {
					if (!$wrapper.is(item))
						item.removeClass('custom-select-open');
				});
				
				$wrapper.toggleClass('custom-select-open');

				if ($dropdown.is(':visible')) {
					settings.url().then(function (collection) {
						var tpl = _.template(templates[settings.template])(collection);
						$list.append(tpl);
						//$list.mCustomScrollbar();

						//LAZY LOAD
						$list.on('scroll', function(){
							if(collection.get_next){
								if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
									collection.get_next().then(function(nextCollection){
										collection = nextCollection;
										var tpl = _.template(templates[settings.template])(nextCollection);
										$list.append(tpl);
									});
								}
							}
						});
					});
				}
			});

			$wrapper.on('click', '.custom-select-dropdown li', function () {

				$input
					.val($(this).data('id'))
					.attr('title', $(this).data('id'))
					.change();

				$value.text($(this).data('text'));
				$wrapper.attr('data-selected', $(this).data('text'));

				$list.empty();
				//hide all
				customSelectArray.forEach(function (item) {
					item.removeClass('custom-select-open');
				});
			});

			$search.on('keyup', function () {
				var searchstr = $(this).val().toLowerCase();
				Helpers.searchEngine(searchstr, $list, 2);
			});

		}

	});
};


$.fn.customSelect.defaults = {
	url: ''
};

export {SetActiveStateAtList, SetActiveStateAtTable};