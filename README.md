# **Poliparser**
[![Build Status](https://travis-ci.org/colgatto/Poliparser.svg?branch=master)](https://travis-ci.org/colgatto/Poliparser)
[![Coverage Status](https://coveralls.io/repos/github/colgatto/Poliparser/badge.svg?branch=master)](https://coveralls.io/github/colgatto/Poliparser?branch=master)
![npm](https://badgen.net/npm/dt/poliparser)
[![license](https://badgen.net/npm/license/poliparser)](https://github.com/colgatto/RWTFPL)
![size](https://badgen.net/packagephobia/publish/poliparser)
[![npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://www.npmjs.com/package/poliparser)

Poliparse allows you to extract end parse data from strings, files, urls and many other object in a simple and fast way.

You can use the default modules or easily add your custom one ( see all modules on the [Examples](https://github.com/colgatto/Poliparser/tree/master/Examples) page ).

## **Install**

```
npm install --save poliparser 
```

## **Usage**

Import and Instantiate Poliparser

```js
const Poliparser = require('poliparser');

let p = new Poliparser();
```

set a parser template,
In this example is used the module `between` from `str` library.

```js
p.setParser({
	m: 'str_between',
	from: '<title>',
	to: '</title>'
});
```

```js
let data = `<title>hello</title>
	<div class=".container">
		<a href="link1.html">link1</a>
	</div>`;

let output = p.parse(data);

console.log(output);
```
**output**
```js
hello
```

---

>ps. The fastest way is to pass it in the declaration like this

```js
let p = new Poliparser({
	m: 'between',
	from: '<title>',
	to: '</title>'
});
```
## **Documentation**

**See [Here](https://github.com/colgatto/Poliparser/tree/master/Examples) for complete modules documentation**

### Add Module

You can use `setModule()` and `requireModule()` to add custom modules.

```js
let p = new Poliparser();

p.setModule('my_parse_module', (data, block) => {
	return data.map(x => x * block.value);
});

p.setParser({
	m: 'my_parse_module',
	value: 3
});

let out = p.parse([1,2,3]);

console.log(out);
```

same as

```js
let p = new Poliparser();

p.requireModule('my_parse_module', 'myModule.js');

p.setParser({
	m: 'my_parse_module',
	value: 3
});

let out = p.parse([1,2,3]);

console.log(out);
```

```js
//myModule.js
module.exports = (data, block) => {
	return data.map(x => x * block.value);
};
```

**output**
```js
[ 3, 6, 9 ]
```

### Add Library

You can add a new library with the setLibrary or requireLibrary method.

```js
let p = new Poliparser();

p.setLibrary('myLib', {
	mul: (data, block) => {
		return data * block.value;
	},
	sum: (data, block) => {
		return data + block.value;
	}
});

p.setParser([{
	m: 'myLib_mul',
	value: 3
},{
	m: 'myLib_sum',
	value: 2
}]);

let out = p.parse(10);

console.log(out);
```

same as

```js
let p = new Poliparser();

p.requireLibrary('myLib', 'myLib.js');

p.setParser([{
	m: 'myLib_mul',
	value: 3
},{
	m: 'myLib_sum',
	value: 2
]);

let out = p.parse(10);

console.log(out);
```

```js
//myLib.js
module.exports = {
	mul: (data, block) => {
		return data * block.value;
	},
	sum: (data, block) => {
		return data + block.value;
	}
}
```

**output**

```js
32
```