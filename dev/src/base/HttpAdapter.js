import "babel-polyfill";

export default function $http(url) {

    // A small example of object
    let core = {

        // Method that performs the ajax request
        ajax: function (method, url, args) {

            // Creating a promise
            return new Promise(function (resolve, reject) {

                // Instantiates the XMLHttpRequest
                var client = new XMLHttpRequest();
                var uri = url;

                if (args) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
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
            });
        }
    };

    // Adapter pattern
    return {
        'get': function (args) {
            return core.ajax('GET', url, args);
        },
        'post': function (args) {
            return core.ajax('POST', url, args);
        },
        'put': function (args) {
            return core.ajax('PUT', url, args);
        },
        'delete': function (args) {
            return core.ajax('DELETE', url, args);
        }
    };
}