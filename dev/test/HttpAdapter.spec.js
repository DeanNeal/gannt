import { $http, client } from 'base/HttpAdapter';
import * as _ from 'underscore';

let reaction = {
    success: (response) => console.log(response),
    error: (error) => console.log(error)
};

function getPromise(callbacks, config) {
    $http(config.url).get().then(callbacks.success, callbacks.error);
}

describe("Ajax Tests", function () {
    let configuration = {url: "ProductData.json"};

    it("should make an Ajax request to the correct URL", function () {
        let client = client(_.extend({}, configuration, {method: 'GET'}));
        expect(client).toEqual(configuration.url);
    });
});