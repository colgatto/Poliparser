# **Poliparser**
[![Build Status](https://travis-ci.org/colgatto/Poliparser.svg?branch=master)](https://travis-ci.org/colgatto/Poliparser) [![Coverage Status](https://coveralls.io/repos/github/colgatto/Poliparser/badge.svg?branch=master)](https://coveralls.io/github/colgatto/Poliparser?branch=master)

This module allows you to extract data from strings in a simple and fast way.

You can use the default parser or easily add your custom one.

## **Install**

```
$ npm install poliparser 
```

## **Usage**

Import and Instantiate Poliparser

```js
const Poliparser = require('poliparser');

let p = new Poliparser();
```

set a parser template

```js
p.setParser({
	title:{
		f: 'between',
		from: '<title>',
		to: '</title>'
	},
	link_ext: [{
		f: 'dom',
		value: '.container a',
		attr: 'href'
	},{
		f: 'regex',
		value: /.+\.([a-zA-Z0-9]+)/
	}]
});
```

Note that the template is an `Object` with many parse keys.

The data is parsed independently for each template key, **with the parse block's executed sequentially in the order of its array**.

The output of each block will become the input for the next one. In the case of `link_ext`, it will execute the `dom` block on the main input, the output will be passed to the `regex` block, and then it will be assigned to the `link_ext` key of the returned `Object`.

Run

```js
let data = `<title>hello</title>
	<div class=".container">
		<a href="link1.html">link1</a>
		<a href="link2.html">link2</a>
		<a href="link3.html">link3</a>
	</div>`;

let output = p.run(data);

console.log(output);
```

## **Documentation**

*See [Examples](https://github.com/colgatto/Poliparser/tree/master/Examples) for all block types.*

### Add Module

You can add a new parser module with: the second parameter of the constructor, the setModule method, the requireModule method.
```js
//by constructor
let p = new Poliparser({
	val: {
		f: 'my_parse_module',
		value: 3
	}
},{
	my_parse_module: (data, block) => {
		return data.map(x => x * block.value);
	}
});

let out = p.run([1,2,3]);

console.log(out.val);
```

same as

```js
//by setModule
let p = new Poliparser({
	val: {
		f: 'my_parse_module',
		value: 3
	}
});

p.setModule('my_parse_module', (data, block) => {
	return data.map(x => x * block.value);
});

let out = p.run([1,2,3]);

console.log(out.val);
```

same as

```js
//by requireModule
let p = new Poliparser({
	val: {
		f: 'my_parse_module',
		value: 3
	}
});

//add by require method
p.requireModule('my_parse_module', 'myModule.js');

let out = p.run([1,2,3]);

console.log(out.val);
```

**myModule.js**
```js
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
//by setLibrary
let p = new Poliparser({
	val_mul: {
		f: 'myLib_mul',
		value: 3
	},
	val_sum: {
		f: 'myLib_sum',
		value: 2
	},
});

p.setLibrary('myLib', {

	mul: (data, block) => {
		return data * block.value;
	},

	sum: (data, block) => {
		return data + block.value;
	}

});

let out = p.run(10);

console.log(out);
```

same as

```js
//by requireLibrary
let p = new Poliparser({
	val_mul: {
		f: 'myLib_mul',
		value: 3
	},
	val_sum: {
		f: 'myLib_sum',
		value: 2
	},
});

p.requireLibrary('myLib', 'myLib.js');

let out = p.run(10);

console.log(out);
```

**myLib.js**
```js
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
{
	val_mul: 30,
	val_sum: 12
}
```
## **Examples**

**Example_dom.js**
```js
let Poliparser = require('poliparser');

let data = `
	<html>
		<head>
			<title>prova</title>
		</head>
		<body>
			<a href="link1.html" class="hiper">hello</a> world<br>
			<a href="link2.html" class="hiper" data-label="byebye">bye</a> world<br>
			<a href="link3.html" class="hiper" data-label="adios">ciao</a> world<br>
		</body>
	</html>`;

let p = new Poliparser({
	link: {
		//get attribute href from all tag <a> with class "hiper"
		f: 'dom',
		value: 'a.hiper',
		attr: 'href'
	},
	link_and_label: {
		//get attribute href and data-label from all tag <a> with class "hiper"
		f: 'dom',
		value: 'a.hiper',
		attr: ['href' , 'data-label']
	}
});

let output = p.run(data);

console.log(output);
```

**output**
```js
{
	link: [
		'link1.html',
		'link2.html'
	],
	link_and_label: [
		{ href: 'link1.html', 'data-label': undefined },
		{ href: 'link2.html', 'data-label': 'byebye' },
		{ href: 'link3.html', 'data-label': 'adios' }
	]
}
```

---

**Example_regex.js**
```js
let Poliparser = require('poliparser');

let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;

let p = new Poliparser({
	name: {
		f: 'regex',
		value: /Headquarter ([a-zA-Z0-9 ]+\.) .*/,
		only: 'matches'
	},
	phone: {
		f: 'regex',
		value: /[0-9]{3}-[0-9]{8}/g,
		only: 'full'
	}
});

let output = p.run(data);

console.log(output);
```

**output**
```js
{
	name: [ 'Industry Inc.' ],
	phone: [ '011-11122111', '011-22211222' ]
}
```

---

**Example_custom.js**
```js
let Poliparser = require('poliparser');

let data = [
	{ val: 'data1' },
	{ val: 'data2' },
	{ val: 'data3' }
];

let p = new Poliparser({
	val: {
		f: 'custom',
		value: (d) => d.map( x => x.val)
	}
});

let output = p.run(data);

console.log(output.val);
```

**output**
```js
[ 'data1', 'data2', 'data3' ]
```