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

const testPath = 'http://134.249.143.42:84';
//const testPath = 'http://195.138.79.46';

class PromiseHandler {
    constructor(options) {
        this.options = options;
        this.resolve = response => console.log(response);
        this.reject = response => console.log(response);
    }

    generateUri() {
        let args = this.options.args;

        /* @if NODE_ENV='dev' */
        let uri = testPath + this.options.url;
        /* @endif */

        /* @if NODE_ENV='prod' */
        let uri = this.options.url;
        /* @endif */

        if (this.options.method == "GET"){

            if (args && typeof args === "object" && Object.keys(args).length) {
                uri += uri.indexOf('?') > 0 ? '&' : '?';
               // uri += '?';
                let argCount = 0;
                for (let key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (argCount++) {
                            uri += '&';
                        }
                        uri += `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`;
                    }
                }
            } else if (typeof args === "string") {
                uri += uri.indexOf('?') > 0 ? '&' : '?';
                uri += `by-id[id]=${args}`;
            }
        }

        return uri;
    }

    generateParams() {
        let args = this.options.args;
        let argCount = 0;
        let params = '';
        for (let key in args) { 
            if (args.hasOwnProperty(key)) {
                if (argCount++) {
                    params += '&';
                }
                params += `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`;
            }
        }
        return params;
    }

    onResolve(self) {
        if (self.status >= 200 && self.status < 300) {
            let response = self.response ? JSON.parse(self.response) : {};

            if (!response.length && !response.result) {
                this.reject(response.error_message);
            } else {
                // Performs the function "resolve" when self.status is equal to 2xx
                this.resolve(response);
            }
        } else {
            // Performs the function "reject" when self.status is different than 2xx
            this.onReject(self.statusText);
        }

        //TODO: Создать switch по состояниям self.status на проверку различных исключений
    }

    onReject(msg) {
        this.reject(msg);
    }

    client(resolve, reject) {
        if (typeof resolve !== 'function') {
            throw new TypeError(`Resolver must be a function but it is ${typeof resolve}`);
        } else {
            this.resolve = resolve;
        } 

        if (typeof reject !== 'function') {
            throw new TypeError(`Rejecter must be a function but it is ${typeof reject}`);
        } else {
            this.reject = reject;
        }

        let self = this;

        // Instantiates the XMLHttpRequest
        let xhr = new XMLHttpRequest();

        xhr.withCredentials = true;

        xhr.open(this.options.method, this.generateUri(), true);
        if (this.options.method == "GET")
            xhr.send();
        else 
            xhr.send(this.generateParams());

        xhr.onload = function () {
            self.onResolve(this);
        };

        xhr.onerror = function () {
            self.onReject(this.statusText);
        };

        return xhr;
    }
}

export default function (url) {

    // A small example of object
    let core = {

        // Method that performs the ajax promise request
        promise: function (method, url, args = {}) {
            let xhr = new PromiseHandler(_.extend({}, {method: method, url: url, args: args}));

            // Creating a promise
            return new Promise((resolve, reject) => xhr.client(resolve, reject));
        }
    };

    // Adapter pattern
    return {
        'get': args => core.promise('GET', url, args),
        'post': args => core.promise('POST', url, args),
        'put': args => core.promise('PUT', url, args),
        'delete': args => core.promise('DELETE', url, args)
    };
}