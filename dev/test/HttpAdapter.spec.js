import $http from 'base/HttpAdapter';

let reaction = {
    success: (response) => console.log(response),
    error: (error) => console.log(error)
};

function sendRequest(callbacks, config) {
    $http(config.url).get().then(callbacks.success, callbacks.error);
}

function ()

describe("Ajax Tests", function() {
    let configuration = {url: "ProductData.json"};

    it("should make an Ajax request to the correct URL", function() {
        spyOn($http, "client");
        sendRequest(undefined, configuration);
        expect($.ajax.mostRecentCall.args[0]["url"]).toEqual(configuration.url);
    });
});