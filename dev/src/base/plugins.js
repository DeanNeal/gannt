var Backbone = require('backbone');
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

var customSelectArray = [];

$.fn.customSelect = function (options) {

    if (typeof options === 'object') {
        options = options;
    }
    if (typeof options === 'string') {
        options = {
            method: options
        };
    }

    var settings = $.extend(true, {}, $.fn.customSelect.defaults, options);

    return this.each(function () {
        var self = this;
        if (options.url)
            this.url = options.url;
        if (options.initialState)
            this.initialState = options.initialState;

        var $wrapper    = $(this),
            $input      = $wrapper.find('.custom-select-input'),
            $value      = $wrapper.find('.custom-select-value'),
            data        = $wrapper.data(),
            placeholder = $input.attr('placeholder') ? $input.attr('placeholder').toLowerCase() : '';

        //set current value or placeholder
        if (settings.method == 'refresh') {
            //update value and data-selected when model has changed
            if ($input.val()) {
                if (!this.initialState) {
                    $wrapper.attr('data-selected', $input.val());
                    $value.text($input.val());
                } else {
                    this.url($input.val()).then(function (response) {
                        var model = response.at(0);
                        $wrapper.attr('data-selected', model.get('name'));
                        $value.text(model.get('name'));
                    });
                }
            } else {
                $wrapper.removeAttr('data-selected');
                $value.text(placeholder);
            }
        }
        //hide current dropdown
        if (settings.method == 'hide') {
            customSelectArray.forEach(function (dropdown, i) {
                if (dropdown.is($wrapper))
                    $wrapper.removeClass('custom-select-open');
            });
        }
        //clear custom selects and destroy them
        if (settings.method == 'destroy') {
            customSelectArray.forEach(function (dropdown, i) {
                if (dropdown.is($wrapper))
                    customSelectArray.splice(i, 1);
            });
        }

        //initialization
        if (!settings.method) {
            customSelectArray.push($wrapper);

            var tpl = _.template(customSelectTpl)({
                value: $input.val(),
                name: $input.data('name'),
                search: $wrapper[0].hasAttribute('data-search') || false,
                placeholder: placeholder
            });

            $wrapper.append(tpl);

            var $list      = $wrapper.find('.custom-select-dropdown-list'),
                $dropdown  = $wrapper.find('.custom-select-dropdown'),
                $container = $wrapper.find('.custom-select-container'),
                $search    = $wrapper.find('.custom-select-dropdown-search');

            if (!settings.initialState) {
                $wrapper.attr('data-selected', $input.val());
                $value.text($input.val());
            }

            $wrapper.on('click', '.custom-select-value', function () {
                customSelectArray.forEach(function (item) {
                    if (!$wrapper.is(item))
                        item.removeClass('custom-select-open');
                });

                $wrapper.toggleClass('custom-select-open');

                $list.off('scroll');
                if ($dropdown.is(':visible')) {
                    $list.scrollTop(0).empty();
                    self.url().then(function (collection) {
                        var tpl = _.template(templates[settings.template])(collection);
                        var lastAnimation = 0;
                        $list.html(tpl);

                        //LAZY LOAD

                        $list.on('mousewheel DOMMouseScroll', function (event) {
                            var timeNow = new Date().getTime();
                            var innerHeight = $(this).innerHeight();
                            // Cancel scroll if currently animating or within quiet period
                            if (timeNow - lastAnimation < 100) {
                                event.preventDefault();
                                return;
                            }

                            if (collection.get_next) {
                                if ($(this).scrollTop() + (innerHeight + innerHeight * 1.2) >= $(this)[0].scrollHeight) {
                                    collection.get_next().then(function (nextCollection) {
                                        collection = nextCollection;
                                        var tpl = _.template(templates[settings.template])(nextCollection);
                                        $list.append(tpl);
                                    });
                                }
                            }

                            lastAnimation = timeNow;
                        });
                    });
                }
            });

            $wrapper.on('click', '.custom-select-dropdown li', function () {

                $input
                    .val($(this).data('id'))
                    .change();

                $value.text($(this).data('text'));
                $wrapper.attr('data-selected', $(this).data('text'));

                //hide all
                customSelectArray.forEach(function (item) {
                    item.removeClass('custom-select-open');
                });
            });

            $search.on('keyup', function () {
                var searchStr = $(this).val().toLowerCase();
                Helpers.searchEngine(searchStr, $list, 2);
            });

        }

    });
};

$.fn.customSelect.defaults = {
    url: ''
};