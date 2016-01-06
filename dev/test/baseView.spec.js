var BaseView = require('../src/views/baseview.js');

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(BaseView.prototype.testCase.call(null)).toBeTruthy();
    });
});