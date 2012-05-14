var LimitableMap = function (limit) {
  this.limit = limit || 10;
  this.map = {};
  this.keys = [];
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

LimitableMap.prototype.set = function (key, value) {
  var map = this.map;
  var keys = this.keys;
  if (!hasOwnProperty.call(map, key)) {
    if (keys.length === this.limit) {
      var firstKey = keys.shift();
      delete map[firstKey];
    }
    keys.push(key);
  }
  map[key] = value;
};

LimitableMap.prototype.get = function (key) {
  return this.map[key];
};

module.exports = LimitableMap;
