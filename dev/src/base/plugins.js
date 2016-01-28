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



var CustomSelect = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
};

CustomSelect.prototype.init = function() {
    var self = this;

    customSelectArray.push(this.$elem);

    this.ui = {
        wrapper: this.$elem,
        input: this.$elem.find('.custom-select-input'),
        name: this.$elem.find('.custom-select-input-name'),
        value: this.$elem.find('.custom-select-value'),
        data: this.$elem.data()
    };

    this.ui.placeholder = this.ui.input.attr('placeholder') ? this.ui.input.attr('placeholder').toLowerCase() : '';

    this.refresh(); 

    this.$elem.on('click', '.custom-select-value', function() {
        self.hide();

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
        self.hide(true); 
    });

    return this;
};

CustomSelect.prototype.hide = function(closeSelf) {
    var self = this;
    customSelectArray.forEach(function(item, i) { 
        if (!item.is(self.$elem) || closeSelf) {
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
            this.refreshValue(this.ui.name.val());
        }
    } else {
        this.refreshValue(this.ui.placeholder);
    }
};

CustomSelect.prototype.refreshValue = function(value) {
    this.$elem.attr('data-selected', value);
    this.ui.value.text(value);
};


CustomSelect.prototype.destroy = function () {
    var self = this;

    customSelectArray.forEach(function (item, i) {
        if (item.is(self.$elem))
            customSelectArray.splice(i, 1);
    });
};

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
