DataLoader = new _DataLoader();

function _DataLoader() {

}

_DataLoader.prototype.load = function load(url) {
    return when($.ajax({url: url, dataType: "text"})
        .then(function (data) {
            return JSON.parse(stripJsonComments(data));
        }));
};

_DataLoader.prototype.loadEach = function loadEach(urlObject) {
    var self = this;
    return when.keys.map(urlObject, function (url) {
        return self.load(url);
    });
};
