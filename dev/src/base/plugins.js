var $ = require('jquery');
var _ = require('underscore');
var Api = require('base/api');
var Helpers = require('base/helpers');
var customSelectTpl = require('templates/overall/plugins/custom_select.tpl');

var templates = {
	customSelectListTpl: require('templates/overall/plugins/custom_select_list.tpl'),
	customSelectListPriority: require('templates/overall/plugins/custom_select_list_priority.tpl')
};

var api = Api.getInstance('build/api/catalog.json');

//require('custom-scrollbar');

class SetActiveState {
	constructor(wrapper, param) {
		var self = this;
		this.wrapper = $(wrapper);
		this.input = this.wrapper.find('input');
		this.param = param;

		this.wrapper.on('click', '.list-item', function () {
			self.input.val($(this).data(self.param)).change();
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
		    $select  = $wrapper.find('select'),
		    $input   = $wrapper.find('input'),
		    items    = [],
		    data     = $wrapper.data();


		//set current value or placeholder
		if (settings.method == 'refresh') {
			$wrapper.find('.custom-select-value').text($input.data('text') || $input.val() || data.placeholder);
			if (!$wrapper[0].hasAttribute('data-search'))
				$wrapper.find('.custom-select-container').attr('data-selected', $input.val() || data.placeholder.toLowerCase());
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
			$select.hide();

			$select.find('option').each(function () {
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

			var $value     = $wrapper.find('.custom-select-value'),
			    $list      = $wrapper.find('.custom-select-dropdown-list'),
			    $dropdown  = $wrapper.find('.custom-select-dropdown'),
			    $container = $wrapper.find('.custom-select-container'),
			    $search    = $wrapper.find('.custom-select-dropdown-search');

			//set current value or placeholder
			$value.text($input.val() || data.placeholder);

			$wrapper.on('click', '.custom-select-value', function () {
				customSelectArray.forEach(function (item) {
					if (!$wrapper.is(item))
						item.removeClass('custom-select-open').find('.custom-select-dropdown').hide();
				});

				$dropdown.toggle();
				$wrapper.toggleClass('custom-select-open');

				if ($dropdown.is(':visible')) {
					api.getResourceByUrl(settings.url).then(function (response) {
						var tpl = _.template(templates[settings.template])(response);
						$list.html(tpl);
						//$list.mCustomScrollbar();
					});
				}
			});

			$wrapper.on('click', '.custom-select-dropdown li', function () {

				$input
					.val($(this).data('text'))
					.data('text', $(this).data('text'))
					.change();

				$value.text($(this).data('text'));

				if (!$wrapper[0].hasAttribute('data-search'))
					$container.attr('data-selected', $(this).data('text'));

				//hide all
				customSelectArray.forEach(function (item) {
					item.removeClass('custom-select-open').find('.custom-select-dropdown').hide();
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