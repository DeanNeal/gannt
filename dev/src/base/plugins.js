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

// function hideDropdown($wrapper, current) {
//     customSelectArray.forEach(function (item, i) {
//         if (!current && !item.is($wrapper)){
//             item.removeClass('custom-select-open');
//             item.find('.custom-select-container').remove();
//         }
//         if(current && item.is($wrapper)){
//             item.removeClass('custom-select-open');
//             item.find('.custom-select-container').remove();
//         }
//     });
// }

// function destroyDropdown($wrapper) {
//     customSelectArray.forEach(function (item, i) {
//         if (item.is($wrapper))
//             customSelectArray.splice(i, 1);
//     });
// }

// function refreshDropdown($wrapper, value, $value) {
//     $wrapper.attr('data-selected', value);
//     $value.text(value);
// }

// $.fn.customSelect = function (options) {

//     if (typeof options === 'object') {
//         options = options;
//     }
//     if (typeof options === 'string') {
//         options = {
//             method: options
//         };
//     }

//     var settings = $.extend(true, {}, $.fn.customSelect.defaults, options);

//     return this.each(function () {
//         var self = this;
//         if (options.url)
//             this.url = options.url;
//         if (options.initialState)
//             this.initialState = options.initialState;
 
//         var $wrapper    = $(this),
//             $input      = $wrapper.find('.custom-select-input'),
//             $value      = $wrapper.find('.custom-select-value'),
//             data        = $wrapper.data(),
//             placeholder = $input.attr('placeholder') ? $input.attr('placeholder').toLowerCase() : '';

//         //set current value or placeholder
//         if (settings.method == 'refresh') {
//             //update value and data-selected when model has changed
//             if ($input.val()) {
//                 if (!this.initialState) {
//                     // $wrapper.attr('data-selected', $input.val());
//                     // $value.text($input.val());
//                     refreshDropdown($wrapper, $input.val(), $value);
//                 } else {
//                     this.url($input.val()).then(function (response) {
//                         var model = response.at(0);
//                         // $wrapper.attr('data-selected', model.get('name'));
//                         // $value.text(model.get('name'));
//                         refreshDropdown($wrapper, model.get('name'), $value);
//                     });
//                 }
//             } else {
//                 $wrapper.removeAttr('data-selected');
//                 $value.text(placeholder);
//             }
//         }
//         //hide current dropdown
//         if (settings.method == 'hide') {
//             hideDropdown($wrapper, true); 
//         }
//         //clear custom selects and destroy them
//         if (settings.method == 'destroy') {
//             destroyDropdown($wrapper);
//         }

//         //initialization
//         if (!settings.method) {
//             customSelectArray.push($wrapper);


//             if (!settings.initialState) {
//                 // $wrapper.attr('data-selected', $input.val());
//                 // $value.text($input.val());
//                 refreshDropdown($wrapper, $input.val(), $value);
//             }

//             $wrapper.on('click', '.custom-select-value', function () {
//                 hideDropdown($wrapper);

//                 var tpl = _.template(customSelectTpl)({
//                     value: $input.val(),
//                     name: $input.data('name'),
//                     search: $wrapper[0].hasAttribute('data-search') || false,
//                     placeholder: placeholder
//                 });

//                 $wrapper.append(tpl);

//                 var $list      = $wrapper.find('.custom-select-dropdown-list'),
//                     $dropdown  = $wrapper.find('.custom-select-dropdown'),
//                     $search    = $wrapper.find('.custom-select-dropdown-search');


//                 $wrapper.toggleClass('custom-select-open');

//                 $list.off('scroll');
//                 if ($dropdown.is(':visible')) {
//                     $list.scrollTop(0).empty();
//                     self.url().then(function (collection) {
//                         var tpl = _.template(templates[settings.template])(collection);
//                         $list.html(tpl);

//                         //LAZY LOAD

//                         $list.on('scroll', function () {
//                             if (collection.get_next) {
//                                 if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
//                                     collection.get_next().then(function (nextCollection) {
//                                         collection = nextCollection;
//                                         var tpl = _.template(templates[settings.template])(nextCollection);
//                                         $list.append(tpl);
//                                     });
//                                 }
//                             }
//                         });
//                     });
//                 }
//             });

//             $wrapper.on('click', '.custom-select-dropdown li', function () {

//                 $input
//                     .val($(this).data('id'))
//                     .change();

//                 $value.text($(this).data('text'));
//                 $wrapper.attr('data-selected', $(this).data('text'));

//                 //hide all
//                 hideDropdown();
//             });

//             // $search.on('keyup', function () {
//             //     var searchStr = $(this).val().toLowerCase();
//             //     Helpers.searchEngine(searchStr, $list, 2);
//             // });

//         }

//     });
// };

// $.fn.customSelect.defaults = {
//     url: ''
// };


 



var CustomSelect = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
};

CustomSelect.prototype.init = function() {
    var self = this;

    this.ui = {
        wrapper: this.$elem,
        input: this.$elem.find('.custom-select-input'),
        value: this.$elem.find('.custom-select-value'),
        data: this.$elem.data(),
        placeholder: this.$elem.find('.custom-select-input').attr('placeholder') ? this.$elem.find('.custom-select-input').attr('placeholder').toLowerCase() : ''
    };

    customSelectArray.push(this.$elem);

    if (!this.options.initialState)
        this.refresh(); 

    this.$elem.on('click', '.custom-select-value', function() {
        self.hide(this.$elem);

        var tpl = _.template(customSelectTpl)({
            value: self.ui.input.val(),
            name: self.ui.input.data('name'),
            search: self.$elem[0].hasAttribute('data-search') || false,
            placeholder: self.ui.placeholder
        });

        self.$elem.append(tpl);

        var $list = self.$elem.find('.custom-select-dropdown-list'),
            $dropdown = self.$elem.find('.custom-select-dropdown'),
            $search = self.$elem.find('.custom-select-dropdown-search');


        self.$elem.toggleClass('custom-select-open');

        $list.off('scroll');
        if ($dropdown.is(':visible')) {
            $list.scrollTop(0).empty();
            self.options.url().then(function(collection) {
                var tpl = _.template(templates[self.options.template])(collection);
                $list.html(tpl);

                //LAZY LOAD

                $list.on('scroll', function() {
                    if (collection.get_next) {
                        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                            collection.get_next().then(function(nextCollection) {
                                collection = nextCollection;
                                var tpl = _.template(templates[self.options.template])(nextCollection);
                                $list.append(tpl);
                            });
                        }
                    }
                });
            });
        }
    });

    this.$elem.on('click', '.custom-select-dropdown li', function() {

        self.ui.input
            .val($(this).data('id'))
            .change();

        self.ui.value.text($(this).data('text'));
        self.$elem.attr('data-selected', $(this).data('text'));

        //hide all
        self.hide();
    });

    return this;
};

CustomSelect.prototype.hide = function(current) {
    var self = this;
    customSelectArray.forEach(function(item, i) { 
        if (!item.is(self.$elem)) {
            item.removeClass('custom-select-open');
            item.find('.custom-select-container').remove();
        }
        if (item.is(self.$elem)) {
            item.removeClass('custom-select-open');
            item.find('.custom-select-container').remove();
        }
    });
};
 
CustomSelect.prototype.refresh = function() {
    var self = this;

    if (this.ui.input.val()) {
        if (this.options.initialState) {
            this.options.url(this.ui.input.val()).then(function (response) {
                var model = response.at(0);
                self.refreshValue(model.get('name'));
            });
        } else {
            this.refreshValue(this.ui.input.val());
        }
    } else {
        this.refreshValue(this.ui.placeholder);
    }
};

CustomSelect.prototype.refreshValue = function(value) {
    this.$elem.attr('data-selected', value);
    this.ui.value.text(value);
};


// CustomSelect.prototype.destroy = function () {
//     customSelectArray.forEach(function (item, i) {
//         if (item.is(this.$elem))
//             customSelectArray.splice(i, 1);
//     });
// };

$.fn.customSelect = function(option) {
    var options = typeof option == "object" && option;
    return this.each(function() {
        var $this = $(this);
        var $plugin = $this.data("plugin");

        if(!$plugin) {
            $plugin = new CustomSelect(this, options).init();
            $this.data("plugin", $plugin);
        }

        if (typeof option  == 'string') {
           $plugin[option]();
        } 

    });
};
