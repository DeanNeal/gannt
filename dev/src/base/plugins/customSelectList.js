import $ from 'jquery';
import _ from 'underscore';
import pluginify from 'base/plugins/pluginify';

const customSelectTpl = require('templates/overall/plugins/custom_select.tpl');
const templates = {
    customSelectListTpl: require('templates/overall/plugins/custom_select_list.tpl'),
    customSelectListPriority: require('templates/overall/plugins/custom_select_list_priority.tpl')
};

let customSelectArray = [];

export class CustomSelect {
    constructor(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;

        this.ui = {
            wrapper: this.$elem,
            input: this.$elem.find('.custom-select-input'),
            name: this.$elem.find('.custom-select-input-name'),
            value: this.$elem.find('.custom-select-value'),
            data: this.$elem.data()
        };

        this.init();
    }

    init() {
        customSelectArray.push(this.$elem);
        this.ui.placeholder = this.ui.input.attr('placeholder') ? this.ui.input.attr('placeholder').toLowerCase() : '';

        this.refresh();

        this.$elem.on('click', '.custom-select-value', this, this.showCustomList);
        this.$elem.on('click', '.custom-select-dropdown li', this, this.selectCustomValue);

        return this;
    };

    showCustomList(event) {
        let self = event.data;
        self.hide();

        let tpl = _.template(customSelectTpl)({
            value: self.ui.input.val(),
            name: self.ui.input.data('name'),
            search: self.$elem[0].hasAttribute('data-search') || false,
            placeholder: self.ui.placeholder
        });

        self.$elem.append(tpl);

        let $list     = self.$elem.find('.custom-select-dropdown-list'),
            $dropdown = self.$elem.find('.custom-select-dropdown'),
            $search   = self.$elem.find('.custom-select-dropdown-search');

        self.$elem.toggleClass('custom-select-open');

        $list.off('scroll');

        if ($dropdown.is(':visible')) {
            $list.scrollTop(0).empty();
            self.options.url().then(function (collection) {
                $list.html(_.template(templates[self.options.template])(collection));

                //LAZY LOAD

                $list.on('scroll', function () {
                    if (collection.get_next) {
                        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                            collection.get_next().then((nextCollection) => {
                                collection = nextCollection;
                                $list.append(_.template(templates[self.options.template])(nextCollection));
                            });
                        }
                    }
                });
            });
        }
    }

    selectCustomValue(event) {
        let self = event.data;

        self.ui.input
            .val($(self).data('id'))
            .change();

        self.ui.value.text($(self).data('text'));
        self.$elem.attr('data-selected', $(self).data('text'));

        //hide all
        self.hide(true);
    }

    hide(closeSelf) {
        let self = this;
        customSelectArray.forEach(function (item, i) {
            if (!item.is(self.$elem) || closeSelf) {
                item.removeClass('custom-select-open');
                item.find('.custom-select-container').remove();
            }
        });
    };

    refresh() {
        let self = this;

        if (this.ui.input.val()) {
            if (this.options.initialState) {
                this.options.url(this.ui.input.val()).then(function (response) {
                    let model = response.at(0);
                    self.refreshValue(model.get('name'));
                });
            } else {
                this.refreshValue(this.ui.name.val());
            }
        } else {
            this.refreshValue(this.ui.placeholder);
        }
    };

    refreshValue(value) {
        this.$elem.attr('data-selected', value);
        this.ui.value.text(value);
    };

    destroy() {
        let self = this;

        customSelectArray.forEach(function (item, i) {
            if (item.is(self.$elem))
                customSelectArray.splice(i, 1);
        });
    };
}

pluginify('customSelect', 'customSelectData', CustomSelect, true);