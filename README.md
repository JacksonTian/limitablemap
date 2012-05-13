Limitable Map
==================

The limitable map, for avoid memory leak issue.

## 模块起源
模块的起源来自于我发现JavaScript开发者喜欢利用JSON对象的键值对做缓存对象。

```
var map = {};

var get = function (key) {
  return map[key];
};

var set = function (key, value) {
  map[key] = value;
};

// 检查缓存
if (!get(key)) {
  // 从数据库或别的地方获取了对象后，放进缓存中
  set(key, value);
}
```

以上的代码会经常出现在前后端的开发中。这段代码是有潜在风险的。如果对于key不做任何限制，这个缓存对象将可能变得极大。因为将其当作缓存来使用，所以这个对象一直无法回收，当量达到一定的时候，那些不再使用的key，又不能得到回收，就可能造成内存泄漏。  
对于字符串或者可以序列化为字符串的对象，通常利用外部缓存工具来完成，比如`memcached`或者`redis`来搞定。这些工具具有良好的内存大小控制和过期设置，无需担心内存占用和回收。  
但是对于那些无法通过`redis`来缓存的对象，比如`Buffer`（为了节省字符串转换的开销），依然需要存放在内存中。这时候这个`limitablemap`将会帮助你做简单的限制，实现内存回收。  
## 原理
`limitable`模块的实现原理十分简单，就是在内部维护一个键的数组（队列），当数组的大小到达限制(默认为10)后，将第一个键和键对应元素删除掉。

## 安装
```
npm install limitablemap
```

## 使用方式

```
var LimitableMap = require('limitablemap');

var map = new LimitableMap();

map.set("key1", "key1");
map.get("key1");
```

使用的时候与普通map对象没有差别，只有两个API接口：`set`/`get`。

## 注意
在使用时，注意评估有效键的数量，如果设置过小，缓存的作用太小；设置过大，可能会浪费内存。设置限制值的方式如下：

```
var map = new LimitableMap(100);
```
