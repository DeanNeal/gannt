/**
 * Created by user7 on 29.01.2016.
 */

import $ from 'jquery';

export default function jQueryPluginDefinition(...args) {

    let [ pluginName, dataName, ClassName, shorthand=false ] = args,
        old = $.fn[pluginName];

    $.fn[pluginName] = function (options = {}) {

        return this.each((i, el) => {

            let $this = $(el),
                data  = $this.data(dataName);

            if (typeof options === "object") {
                if (!data) $this.data(dataName, new ClassName($this, options));
            } else {
                if (data && data[options]) return data[options].apply(data);
            }
        });
    };

    // SHORTHAND
    if (shorthand) $[pluginName] = (options) => $({})[pluginName](options);

    // NO CONFLICT
    $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}