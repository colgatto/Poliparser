# **Multiparser**

This module allows you to extract data from strings in a simple and fast way.

You can use the default parser or easily add your costum one.

---

## **Install**

```
$ npm install multiparser 
```

---

## **Usage**

Import Multiparser module

```js
let Multiparser = require('multiparser');
```

Make your output Object template

```js
let template = {
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
};
```
Note that `template` is an `Object` with many parse keys.

The data is parsed independently for each template key, **with the functions executed sequentially in the order of its array**.

The output of each function will become the input for the next one. In the case of `link_ext`, it will execute the `dom` block on the main input, the output will be passed to the `regex` block, and then it will be assigned to the `link_ext` key of the returned `Object`.

Instantiate a Multiparser by passing it a template

```js
let m = new Multiparser(template);
```

Run

```js
let data = `<title>hello</title>
	<div class=".container">
		<a href="link1.html">link1</a>
		<a href="link2.html">link2</a>
		<a href="link3.html">link3</a>
	</div>`;

let output = m.run(data);

console.log(output);
```

*See [Examples](https://github.com/colgatto/Multiparser/tree/master/Examples) for all block type.*

---

## **Documentation**

## Type of parse object

## f: `dom`

Parse an html string and get data with a CSS selector like jQuery

- **Input**: `String`
- **Output**: `[DomObject]`
- **Recursive Parse Array**: `true`

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | CSS selector string | required |
| attr | `String` / `Array` |  | optional(`false`) |

**Example_dom.js**
```js
let Multiparser = require('multiparser');

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
</html>
`;

let m = new Multiparser({
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

let output = m.run(data);

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
		{ href: 'link1.html', 'data-label': null    },
		{ href: 'link2.html', 'data-label': 'byby'  },
		{ href: 'link3.html', 'data-label': 'adios' }
	]
}
```

---

## f: `regex`

- **Input**: `String`
- **Output**: `[Object]`
- **Recursive Parse Array**: `true`

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Regex` | regex to run | required |
| only | `String` | if set return only selected element instead of Object, Accept: `'full'`,`'matches'`,`'indexes'`. | optional (default `false`) |
| group | `Integer` | get only selected group | optional (default `false`) |


**Example_regex.js**
```js
let Multiparser = require('..');

let data = `Contact Admin 011-11122111 Headquarter Industry Inc. 011-22211222`;

let m = new Multiparser({
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

let output = m.run(data);

console.log(output);
```

**output**
```js
{
	name: [ 'Industry Inc.' ],
	phone: [ '011-11122111', '011-22211222' ]
}
```

## f: `json`

- **Input**: ( `String`, `Object` )
- **Output**: ( `Object`, `String` )
- **Recursive Parse Array**: `true`

Generate a json string from an object and parse a json string to an object

| Parameter | Type | Description | Required |
| - | - | - | - |
| value  | `String`  | set json mode (`'stringify'`,`'parse'`)       | optional (default  `'stringify'` ) |
| pretty | `Boolean` | set `true` for pretty stringify               | optional (default  `false` ) |
| spaces | `Integer` | set indentation's length for pretty stringify | optional (default  `4` ) |

## f: `reverse`

- **Input**: ( `String`, `Array` )
- **Output**: ( `Array`, `String` )
- **Recursive Parse Array**: `false`

Reverse a string or an array

## f: `log`


- **Input**: `Any`
- **Output**: `Any`
- **Recursive Parse Array**: `false`

`console.log` the value and return it without changing it

## f: `custom`

Run a custom function and return data

- **Input**: `Any`
- **Output**: `Any`
- **Recursive Parse Array**: `false`

| Parameter | Type | Description | Required |
| - | - | - | - | - |
| value | `function` | TODO  | required |


## More code

**data.html**
```html
<html>
	<head>
		<title>prova</title>
	</head>
	<body>
		<div class="prendimi"><a href="link1.html" class="cliccami">hi1</a> wei1</div>
		<div class="prendimi"><a href="link2.html" class="cliccami">by2</a> wei2</div>
		<div class="prendimi"><a href="link2.html" class="cliccami">hello2</a> wei2</div>
		<div class="prendimi"><a href="link3.html" class="cliccami">ciao3</a> wei3</div>
		<div class="prendimi"><a href="link3.html" class="cliccami">ciao3</a> wei3</div>
		<div class="prendi"><a href="link3.html" class="clicca">wela3</a> wei3</div>
	</body>
</html>
```
**Example.js**
```js
let fs = require('fs');
let Multiparser = require('multiparser');

let data = fs.readFileSync('data.html').toString();

let m = new Multiparser({
	a_text: [{
		//get all <a> with class "cliccami"
		f: 'dom',
		value: 'a.cliccami',
	},{
		//extract only innerHTML for every item founds
		f: 'custom',
		value: d => d.map(x => x.innerHTML)
	},{
		//uniq the array founded
		f: 'uniq'
	},{
		//run regex on every item inside array
		f: 'regex',
		value: /(\w+)(\d)/,
		onlyMatches: true
	}]
});

let output = m.run(data);

console.log(output);
```

**output**
```json
{
	a_text: [
		[ 'hi', '1' ],
		[ 'by', '2' ],
		[ 'hello', '2' ],
		[ 'ciao', '3' ]
	]
}
```