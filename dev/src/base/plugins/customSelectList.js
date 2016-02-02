import $ from 'jquery';
import _ from 'underscore';
import pluginify from 'base/plugins/pluginify';

const customSelectTpl = require('templates/overall/plugins/custom_select.tpl');
const templates = {
    customSelectListTpl: require('templates/overall/plugins/custom_select_list.tpl'),
    customSelectListPriority: require('templates/overall/plugins/custom_select_list_priority.tpl'),
    customSelectListDefault: require('templates/overall/plugins/custom_select_list_default.tpl')
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
            data: this.$elem.data(),
            placeholder: this.$elem.attr('placeholder') ? this.$elem.attr('placeholder').toLowerCase() : ''
        };

        this.init();
    }

    init() {
        customSelectArray.push(this.$elem);

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
            $search   = self.$elem.find('.custom-select-dropdown-search'),
            $initialList = self.$elem.find('.initial-list');

        self.$elem.toggleClass('custom-select-open');

        $list.off('scroll');

        if ($dropdown.is(':visible')) {
            $list.scrollTop(0).empty();
            let $contentLoadTriggered = false;

            if(self.options.url){            
                self.options.url().then(function (collection) {
                    $list.html(_.template(templates[self.options.template])(collection));

                    //LAZY LOAD

                    $list.on('scroll', function () {
                        if (collection.get_next) {
                            let innerHeight = $(this).innerHeight();
                            if ($(this).scrollTop() + (innerHeight + innerHeight * 1.2) >= $(this)[0].scrollHeight && $contentLoadTriggered == false) {
                                $contentLoadTriggered = true;
                                collection.get_next().then((nextCollection) => {
                                    collection = nextCollection;
                                    $list.append(_.template(templates[self.options.template])(nextCollection));
                                    $contentLoadTriggered = false;
                                });
                            }
                        }
                    });
                });
            } else { 
                $list.html(_.template(templates[self.options.template])({items: self.options.items}));
                $list.find(`[data-id='${self.ui.input.val()}']`).addClass('active'); 
            }
        }
    }

    selectCustomValue(event) {
        let self = event.data;


        if(self.$elem[0].hasAttribute('data-multiselect')){
            $(this).toggleClass('active');

           var multipleArray =  self.$elem.find('li.active').map(function(i, item){ 
                return $(item).data('id');
           }).toArray();
           self.ui.input
               .val(multipleArray)
               .change();

        }

        if(!self.$elem[0].hasAttribute('data-multiselect')){        
            self.ui.input
                .val($(this).data('id'))
                .change();

            self.ui.value.text($(this).data('text'));
            self.$elem.attr('data-selected', $(this).data('text'));

            //hide all
            self.hide(true);
        }
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
                    if(response.length){                    
                        let model = response.at(0);
                        self.refreshValue(model.get('name'));
                    }
                });
            } else {
                if(this.options.items)
                    this.refreshValue( _.findWhere(this.options.items, {id: this.ui.input.val()}).name );
                else {
                    if(this.ui.name.length)
                        this.refreshValue(this.ui.name.val() );
                    else
                        this.refreshValue(this.ui.input.val() );
                }
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