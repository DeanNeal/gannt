import $http from 'base/HttpAdapter';

let reaction = {
    success: (response) => console.log(response),
    error: (error) => console.log(error)
};

function getPromise(callbacks, config) {
    $http(config.url).get().then(callbacks.success, callbacks.error);
}

function getClient(callbacks, config) {
    $http(config.url).client('GET').then(callbacks.success, callbacks.error);
}

describe("Ajax Tests", function() {
    let configuration = {url: "ProductData.json"};

    it("should make an Ajax request to the correct URL", function() {
        spyOn($http(configuration.url), "get");
        let client = getClient(undefined, configuration);
        expect(client).toEqual(configuration.url);
    });
});