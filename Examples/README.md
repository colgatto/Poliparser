
# Block type

## Basic

### `dom`

- **Input**: `String`
- **Output**: `[DomObject]`
- **Recursive Parse Array**: `true`

Parse an html string and get data with a CSS selector like jQuery.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | CSS selector string | required |
| attr | `String` / `Array` | get attribute value | optional (default `false`) |

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

### `regex`

- **Input**: `String`
- **Output**: `[Object]`
- **Recursive Parse Array**: `true`

Exec RegEx on the input data.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Regex` | regex to run | required |
| only | `String` | if set return only selected element instead of Object, Accept: `'full'`, `'matches'`, `'indexes'`. | optional (default `false`) |
| group | `Integer` | get only selected group | optional (default `false`) |


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

### `custom`

- **Input**: `Any`
- **Output**: `Any`
- **Recursive Parse Array**: `false`

Run a custom function and return data

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `function` | a function that has input data as first parameter and return output data | required |

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

---

### `json`

- **Input**: ( `String`, `Object` )
- **Output**: ( `Object`, `String` )
- **Recursive Parse Array**: `true`

Generate a json string from an object and parse a json string to an object

| Parameter | Type | Description | Required |
| - | - | - | - |
| value  | `String`  | set json mode (`'stringify'`,`'parse'`)       | optional (default  `'stringify'` ) |
| pretty | `Boolean` | set `true` for pretty stringify               | optional (default  `false` ) |
| space | `Integer` | set indentation's length for pretty stringify | optional (default  `4` ) |

---

### `reverse`

- **Input**: ( `String`, `Array` )
- **Output**: ( `String`, `Array` )
- **Recursive Parse Array**: `false`

Reverse a string or an array

---

### `base64`

- **Input**: `String`
- **Output**: `String`
- **Recursive Parse Array**: `false`

encode or decode base64 string

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | `'encode'` or `'decode'` | required |

---

### `key`

- **Input**: `Object`
- **Output**: `Any`
- **Recursive Parse Array**: `false`

return a single key from an Object

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` / `Array` | name of the key you want return, use `Array` if you want more keys | required |

---

### `log`

- **Input**: `Any`
- **Output**: `Any`
- **Recursive Parse Array**: `false`

`console.log` the value and return it without changing it

---

- base64
- between
- trim

- json
- key

### Array

- array_min
- array_max
- array_indexMin
- array_indexMax
- array_count
- array_sum
- array_uniq
- array_flat
- array_map
- array_filter
- array_reduce
- array_join
- array_indexOf
- array_lastIndexOf
- array_slice
- array_pop
- array_shift
---

---


---
