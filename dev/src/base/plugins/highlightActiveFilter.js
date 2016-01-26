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

        this.wrapper.on('click', '.list-item', function () {
            let oldStr = $(this).data(self.param);

            if (self.param == 'sort') {
                oldStr = (oldStr[0] == '-') ? oldStr.substr(1) : `-${oldStr}`;
                $(this).data(self.param, oldStr);
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
        let str = (oldStr[0] == '-') ? oldStr.substr(1) : oldStr;
        this.wrapper.find(`[data-${this.param}='${str}']`).attr('data-active', `${(oldStr[0] != '-')}`).siblings().removeAttr('data-active');
    }
}

export {SetActiveStateAtList, SetActiveStateAtTable};