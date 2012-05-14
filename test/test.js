var LimitableMap = require('../limitablemap.js');

describe("Limitable Map", function () {
  var cache = new LimitableMap(5);

  it('should increase normally', function () {
    Object.keys(cache.map).should.have.length(0);
    cache.set("key1", "key1");
    Object.keys(cache.map).should.have.length(1);
    cache.set("key2", "key2");
    Object.keys(cache.map).should.have.length(2);
    cache.set("key3", "key3");
    Object.keys(cache.map).should.have.length(3);
    cache.set("key4", "key4");
    Object.keys(cache.map).should.have.length(4);
    cache.set("key5", "key5");
    Object.keys(cache.map).should.have.length(5);
  });

  it('should increase limited', function () {
    cache.get("key1").should.be.equal("key1");
    cache.set("key6", "key6");
    Object.keys(cache.map).should.have.length(5);
    (cache.get("key1") === undefined).should.be.ok;
    cache.set("key7", "key7");
    Object.keys(cache.map).should.have.length(5);
    (cache.get("key2") === undefined).should.be.ok;
    cache.set("key8", "key8");
    Object.keys(cache.map).should.have.length(5);
    (cache.get("key3") === undefined).should.be.ok;
    cache.set("key9", "key9");
    Object.keys(cache.map).should.have.length(5);
    (cache.get("key4") === undefined).should.be.ok;
    cache.set("key10", "key10");
    Object.keys(cache.map).should.have.length(5);
    (cache.get("key5") === undefined).should.be.ok;
  });

  it('should set correctly when set hasOwnProperty', function () {
    cache.set("hasOwnProperty", "hasOwnProperty");
    (function(){
      cache.set("whatever", "whatever");
    }).should.not.throw();
  });
});