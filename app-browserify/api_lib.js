var $ = require('jquery');

var Api = {
    getCatalog: function(){
        return $.ajax({
            url: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent('linkin') + '&callback=JSONPCallback',
            type: 'GET',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(data){

            }
        })
    }, 
    getUser: function(id) {
        return $.ajax({
            url: 'http://example.com/<<SECURITY_TOKEN>>/user/123345',
            type: 'GET',
            contentType: "application/json",
            success: function(data){

            }
        })
    }
};

module.exports = Api;