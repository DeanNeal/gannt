var Rx = require('rx-dom');

var WikiRx = function ($input, $results) {
    this.ui = {
        input: $input,
        results: $results
    };

    this.keyups = Rx.Observable.fromEvent(this.ui.input, 'keyup').pluck('target', 'value')
    // .debounce(500 /* ms */)
    .filter(function (text) {
        if (text.length < 3) $results.empty();
        return text.length > 2;
    }).distinctUntilChanged();
};

WikiRx.prototype.initialize = function () {
    this.suggestions = this.keyups.flatMapLatest(this.searchWikipedia);
    this.suggestions.subscribe((function (data) {
        var resultsName = data.response[1],
            resultsLink = data.response[3];

        this.ui.results.empty();

        for (var i = 0; i < resultsName.length; i++) {
            this.ui.results.append('<li><a href="' + resultsLink[i] + '">' + resultsName[i] + '</a></li>');
        }
    }).bind(this), function (e) {
        clearSelector(resultList);
        this.ui.results.append(createLineItem('Error: ' + e));
    });
};

WikiRx.prototype.searchWikipedia = function (term) {
    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(term) + '&callback=JSONPCallback';
    return Rx.DOM.jsonpRequest(url);
};

module.exports = WikiRx;
//# sourceMappingURL=finance_rx.js.map
