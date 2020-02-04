# Block type

## Basic

### `custom`

- **Input**: `Any`
- **Output**: `Any`

Run a custom function and return data

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | a function that has input data as first parameter and return output data. | required |

### `dom`

- **Input**: `String`
- **Output**: `[DomObject]`

Parse an html string and get data with a CSS selector like jQuery.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | CSS/jquery selector string | required |
| attr | `String` / `Array` | get attribute value | optional (default: `false`) |

### `json`

- **Input**: ( `String`, `Object` )
- **Output**: ( `Object`, `String` )

Generate a JSON string from an object and parse a JSON string to an object

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | JSON mode (`'stringify'`,`'parse'`) | optional (default: `'stringify'`) |
| pretty | `Boolean` | set `true` for pretty stringify | optional (default: `false`) |
| space | `Integer` | space length for pretty stringify | optional (default: `4`) |

### `log`

- **Input**: `Any`
- **Output**: `Any`

`console.log` the value and return it without changing it


### `regex`

- **Input**: `String`
- **Output**: `[Object]`

Generate a json string from an object and parse a json string to an object

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Regex` | regex to execute | required |
| only | `String` | if set return only selected element instead of Object, Accept: `'full'`, `'matches'`, `'indexes'`. | optional (default: `false`) |
| group | `Integer` | get only selected group | optional (default: `false`) |


---

## String

### `str_base64`

- **Input**: `String`
- **Output**: `String`

encode or decode base64 string

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | `'encode'` or `'decode'` | required |

### `str_between`

- **Input**: `String`
- **Output**: `String`

return the part of the string between `from` parameter and `to` parameter

| Parameter | Type | Description | Required |
| - | - | - | - |
| from | `String` | the start of substring (excluded) | required |
| to | `String` | the end of substring (excluded) | required |

### `str_charAt`

- **Input**: `String`
- **Output**: `String`

 returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Integer` | The offset of char you want. An integer between 0 and 1-less-than the length of the string. | optional (default: `0`) |

### `str_replace`

- **Input**: `String`
- **Output**: `String`

returns a new string with some or all matches of a pattern replaced by a replacement. The replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value |  ( `String` / `RegExp` )  | A value that is to be replaced by newSubStr. | required |
| newValue |  ( `String` / `Function` )  | The String that replaces the substring/regex specified by the value parameter. | required |

### `str_reverse`

- **Input**: `String`
- **Output**: `String`

return a new string where char are reversed. The first char becomes the last, and the last char becomes the first.


### `str_split`

- **Input**: `String`
- **Output**: `Array`

splits a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value |  ( `String` / `RegExp` )  | Specifies the string which denotes the points at which each split should occur. | required |

### `str_trim`

- **Input**: `String`
- **Output**: `String`

return a new String with whitespace (or custom values) removed from start, end or both of a string.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Array` | array of values you want to trim. | optional (default: `[' ', '\t', '\r', '\n']`) |
| start | `Boolean` | if set `false` don't trim start of string. | optional (default: `true`) |
| end | `Boolean` | if set `false` don't trim start of string. | optional (default: `true`) |


---

## Array

### `array_count`

- **Input**: `Array`
- **Output**: `Number`

return the number of values of the array


### `array_filter`

- **Input**: `Array`
- **Output**: `Array`

returns a new array with all elements that pass the test implemented by the provided function.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise.  Taking three arguments: `( currentValue, <index>, <array> )` | required |

### `array_flat`

- **Input**: `Array`
- **Output**: `Array`

returns a new array without duplicate values


### `array_flat`

- **Input**: `Array`
- **Output**: `Array`

returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

| Parameter | Type | Description | Required |
| - | - | - | - |
| deep | `Integer` | The depth level specifying how deep a nested array structure should be flattened. If negative start from the deepest array. | optional (default: `Infinity`) |

### `array_indexMax`

- **Input**: `Array`
- **Output**: `Integer`

return the index of highest value of the array


### `array_indexMin`

- **Input**: `Array`
- **Output**: `Integer`

return the index of lowest value of the array


### `array_indexOf`

- **Input**: `Array`
- **Output**: `Integer`

returns the first index at which a given element can be found in the array, or -1 if it is not present.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Any` | Element to locate in the array. | required |
| position | `Integer` | The index to start the search at. If negative, it is taken as the offset from the end of the array. | optional (default: 0) |

### `array_join`

- **Input**: `Array`
- **Output**: `String`

returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | Specifies a string to separate each pair of adjacent elements of the array. | optional (default: `','`) |

### `array_lastIndexOf`

- **Input**: `Array`
- **Output**: `Integer`

returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at position value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Any` | Element to locate in the array. | required |
| position | `Integer` | The index at which to start searching backwards. If negative, it is taken as the offset from the end of the array. | optional (default: arr.length - 1) |

### `array_map`

- **Input**: `Array`
- **Output**: `Array`

returns a new array with the results of calling a provided function on every element in the calling array.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | Function that produces an element of the new Array. Taking three arguments: `( currentValue, <index>, <array> )` | required |

### `array_max`

- **Input**: `Array`
- **Output**: `Number`

return the highest value of the array


### `array_min`

- **Input**: `Array`
- **Output**: `Number`

return the lowest value of the array


### `array_pop`

- **Input**: `Array`
- **Output**: `Array`

returns a new array without last element


### `array_reduce`

- **Input**: `Array`
- **Output**: `Any`

executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | A function to execute on each element in the array (except for the first, if no start is supplied), taking four arguments: `( accumulator, currentValue, <index>, <array> )` | required |
| start | `Any` | first value of accumulator | optional (default: first value of array) |

### `array_reverse`

- **Input**: `Array`
- **Output**: `Array`

return a new array where value are reversed. The first array element becomes the last, and the last array element becomes the first.


### `array_shift`

- **Input**: `Array`
- **Output**: `Array`

returns a new array without first element


### `array_slice`

- **Input**: `Array`
- **Output**: `Array`

returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array.

| Parameter | Type | Description | Required |
| - | - | - | - |
| start | `Integer` | Zero-based index at which to begin extraction. If negative, indicating an offset from the end of the sequence. | optional (default: 0) |
| end | `Integer` | Zero-based index before which to end extraction. slice extracts up to but not including end. A negative index can be used, indicating an offset from the end of the sequence. | optional (default: arr.length) |

### `array_sort`

- **Input**: `Array`
- **Output**: `Array`

 sorts the elements of an array in place and returns the sorted array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | a function that defines the sort order. | optional (default: javascript sort) |

### `array_sum`

- **Input**: `Array`
- **Output**: `Number`

returns the sum of values of the array



---

## Object

### `obj_entries`

- **Input**: `Object`
- **Output**: `Array`

returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a `for...in` loop.


### `obj_fromEntries`

- **Input**: `Array`
- **Output**: `Object`

transforms a list of key-value pairs into an object.


### `obj_getKey`

- **Input**: `Object`
- **Output**: `Any`

return a single key from an Object, or a subObject if specify more then one key.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` / `Array` | name of the key you want return, use `Array` if you want more keys. | required |

### `obj_keys`

- **Input**: `Object`
- **Output**: `Array`

returns an array of a given object's own enumerable property names, in the same order as we get with a normal loop.


### `obj_values`

- **Input**: `Object`
- **Output**: `Array`

 returns an array of a given object's own enumerable property values, in the same order as that provided by a `for...in` loop.



---

## Crypto

### `crypto_md5`

- **Input**: `String`
- **Output**: `String`

create MD5 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | hash digest | optional (default: `'hex'`) |
| secret | `String` | hash secret | optional (default: `false`) |

### `crypto_sha1`

- **Input**: `String`
- **Output**: `String`

create SHA1 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | hash digest | optional (default: `'hex'`) |
| secret | `String` | hash secret | optional (default: `false`) |

### `crypto_sha256`

- **Input**: `String`
- **Output**: `String`

create SHA256 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | hash digest | optional (default: `'hex'`) |
| secret | `String` | hash secret | optional (default: `false`) |

### `crypto_sha512`

- **Input**: `String`
- **Output**: `String`

create SHA512 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | hash digest | optional (default: `'hex'`) |
| secret | `String` | hash secret | optional (default: `false`) |


---

## CSV

### `csv_fromJson`

- **Input**: `String`
- **Output**: `String`

create a CSV from a JSON.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator | optional (default: `','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator | optional (default: `false`) |

### `csv_parse`

- **Input**: `String`
- **Output**: `Array`

create a new Array of Object from CSV String.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator | optional (default: `','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator | optional (default: `false`) |

### `csv_stringify`

- **Input**: `Object`
- **Output**: `String`

create a CSV from an array of object.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator | optional (default: `','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator | optional (default: `false`) |

### `csv_toJson`

- **Input**: `String`
- **Output**: `String`

create a JSON from a CSV.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator | optional (default: `','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator | optional (default: `false`) |
| pretty | `Boolean` | set `true` for pretty JSON | optional (default: `false`) |
| space | `Integer` | JSON space length, used if pretty = `true` | optional (default: `4`) |


---
