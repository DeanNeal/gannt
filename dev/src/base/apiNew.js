'use strict';

const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');

function $http(url){
 
  // A small example of object
  let core = {

    // Method that performs the ajax request
    ajax : function (method, url, args) {

      // Creating a promise
      let promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args /*&& (method === 'POST' || method === 'PUT' || method === 'GET')*/) {
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
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get' : function(args) {
      return core.ajax('GET', url, args);
    },
    'post' : function(args) {
      return core.ajax('POST', url, args);
    },
    'put' : function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete' : function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
};

class ModelFactory extends Backbone.Model {
    constructor () {
        super();
        //this.url = 'qweqw';
    }

    static parse() {
        console.log(1);
    }

    test() {
        console.log('test');
    }
}

/*var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
var payload = {
  'topic' : 'js',
  'q'     : 'Promise'
};

var callback = {
  success : function(data){
     console.log(1, 'success', JSON.parse(data));
  },
  error : function(data){
     console.log(2, 'error', JSON.parse(data));
  }
};*/

// Executes the method call but an alternative way (1) to handle Promise Reject case 
/*$http(mdnAPI) 
  .get(payload) 
  .then(callback.success, callback.error);
*/

export default ModelFactory;