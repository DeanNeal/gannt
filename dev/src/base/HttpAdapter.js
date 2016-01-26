/**
 * HttpAdapter
 * send ajax to passed url and return a promise
 *
 * @parameter {String} url
 *
 * @example
 *
 * let reaction = {
 *     success: (response) => console.log(response),
 *     error: (error) => console.log(error)
 * };
 *
 * $http(url).get().then(reaction.success, reaction.error);
 *
 * @return {Object} core crud methods
 * */

import * as _ from 'underscore';

let testPath = 'http://195.138.79.46';

export default function (url) {

    function client(options, resolve, reject) {

        // Instantiates the XMLHttpRequest
        let client = new XMLHttpRequest();

        /* @if NODE_ENV='dev' */
        let uri = testPath + options.url;
        /* @endif */

        /* @if NODE_ENV='prod' */
        let uri = options.url;
        /* @endif */

        if (options.args && typeof options.args === "object") {
            uri += '?';
            let argCount = 0;
            for (let key in options.args) {
                if (options.args.hasOwnProperty(key)) {
                    if (argCount++) {
                        uri += '&';
                    }
                    uri += encodeURIComponent(key) + '=' + encodeURIComponent(options.args[key]);
                }
            }
        } else if (typeof options.args === "string") {
            uri += '&by-id[id]=' + options.args;
        }

        client.withCredentials = true;

        client.open(options.method, uri, true);
        client.send();

        client.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                // Performs the function "resolve" when this.status is equal to 2xx
                resolve(JSON.parse(this.response));
            } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText);
            }
        };

        client.onerror = function () {
            reject(this.statusText);
        };

        return client;
    }

    // A small example of object
    let core = {

        // Method that performs the ajax promise request
        client: function (method, url, args = {}, callbacks) {
            let options = _.extend({}, {method: method, url: url, args: args});

            return client(options, resolve, reject);
        },

        // Method that performs the ajax promise request
        promise: function (method, url, args = {}) {

            let options = _.extend({}, {method: method, url: url, args: args});

            // Creating a promise
            return new Promise((resolve, reject) => client(options, resolve, reject));
        }
    };

    // Adapter pattern
    return {
        'get': function (args) {
            return core.promise('GET', url, args);
        },
        'post': function (args) {
            return core.promise('POST', url, args);
        },
        'put': function (args) {
            return core.promise('PUT', url, args);
        },
        'delete': function (args) {
            return core.promise('DELETE', url, args);
        },
        client: function (method, args, callbacks = {}) {
            return core.client(method, url, args, callbacks)
        }
    };
}