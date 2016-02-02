/**
 * Created by user7 on 26.01.2016.
 */

var $ = require('jquery');

class SetActiveState {
    constructor(wrapper, param) {
        let self = this;
        this.wrapper = $(wrapper);
        this.input = this.wrapper.find('input');
        this.param = param;

        if (this.param == 'sort') {
            let val = this.input.val();
            let str = (val[0] == '-') ? val.substr(1) : val;
            this.wrapper.find(`[data-${this.param}='${str}']`).attr(`data-${this.param}`, val);
        }

        this.wrapper.on('click', '.list-item', function () {
            let oldStr = $(this).attr(`data-${self.param}`);
            if (self.param == 'sort') {
                oldStr = (oldStr[0] == '-') ? oldStr.substr(1) : `-${oldStr}`;
                $(this).attr(`data-${self.param}`, oldStr);
            }

            self.input.val(oldStr).change();
        });
    }

    highLight() {
    }
}

class SetActiveStateAtList extends SetActiveState {
    highLight() {
        this.wrapper.find(`[data-${this.param}='${this.input.val()}']`).addClass('active').siblings().removeClass('active');
    }
}

class SetActiveStateAtTable extends SetActiveState {
    highLight() {
        let oldStr = this.input.val();
        this.wrapper.find(`[data-${this.param}='${oldStr}']`).attr('data-active', `${(oldStr[0] != '-')}`).siblings().removeAttr('data-active');
        if(!oldStr)
            this.wrapper.find(`[data-${this.param}]`).removeAttr('data-active');
    }
}

export {SetActiveStateAtList, SetActiveStateAtTable};