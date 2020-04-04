# Documentation

## Core
### `dom`
- **Input**: `String`
- **Output**: `[DomObject]`

Parse an html string and get data with a CSS selector like jQuery.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | CSS/jquery selector string. | true |
| attr | `String`/`Array` | Get attribute value. | optional (default:`false`) |
### `regex`
- **Input**: `String`
- **Output**: `[Object]`

Exec regex passed by value parameter and return matches and index.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Regex` | Regex to execute. | true |
| only | `String` | If set return only selected element instead of Object, Accept: `'full'`, `'matches'`, `'indexes'`. | optional (default:`false`) |
| group | `Integer` | Get only selected group. | optional (default:`false`) |
### `log`
- **Input**: `Any`
- **Output**: `Any`

Pass the value to `console.log` and return it without changes.

### `custom`
- **Input**: `Any`
- **Output**: `Any`

Run a custom function and return data.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | A function that has input data as first parameter and return output data. | true |
### `break`
- **Input**: `Any`
- **Output**: `Any`

Break is a conditional block thats used to exit from an Array of module. it can return a custom value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| condition | `Function` | If function return true the poliparser exit and return input data, or a custom value if specified, first parameter of function is the input data. | true |
| return | `Any` | Custom value that return if condition is true, if undefined the module return the input data. | optional (default:`undefined`) |

---

## String
### `str_base64`
- **Input**: `String`
- **Output**: `String`

Encode or decode base64 string

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | `'encode'` or `'decode'` | true |
### `str_split`
- **Input**: `String`
- **Output**: `Array`

Split a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value |  (`String`/`RegExp`)  | Specifies the string which denotes the points at which each split should occur. | true |
### `str_charAt`
- **Input**: `String`
- **Output**: `String`

Returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Integer` | The offset of char you want. An integer between 0 and 1-less-than the length of the string. | optional (default:`0`) |
### `str_replace`
- **Input**: `String`
- **Output**: `String`

Returns a new string with some or all matches of a pattern replaced by a replacement. The replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value |  (`String`/`RegExp`)  | A value that is to be replaced by newValue. | true |
| newValue |  (`String`/`Function`)  | The String that replaces the substring/regex specified by the value parameter. | true |
### `str_trim`
- **Input**: `String`
- **Output**: `String`

Returns a new String with whitespace (or custom values) removed from start, end or both of a string.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Array` | Array of values you want to trim. | optional (default:`[' ', '\t', '\r', '\n']`) |
| start | `Boolean` | If set `false` don't trim start of string. | optional (default:`true`) |
| end | `Boolean` | If set `false` don't trim start of string. | optional (default:`true`) |
### `str_between`
- **Input**: `String`
- **Output**: `String`

Returns the part of the string between `from` parameter and `to` parameter.

| Parameter | Type | Description | Required |
| - | - | - | - |
| from | `String` | The start of substring (excluded). | true |
| to | `String` | The end of substring (excluded). | true |
### `str_reverse`
- **Input**: `String`
- **Output**: `String`

Returns a new string where char are reversed. The first char becomes the last, and the last char becomes the first.


---

## Array
### `array_min`
- **Input**: `Array`
- **Output**: `Number`

Returns the lowest value of the array.

### `array_max`
- **Input**: `Array`
- **Output**: `Number`

Returns the highest value of the array.

### `array_indexMin`
- **Input**: `Array`
- **Output**: `Integer`

Returns the index of lowest value of the array.

### `array_indexMax`
- **Input**: `Array`
- **Output**: `Integer`

Returns the index of highest value of the array.

### `array_count`
- **Input**: `Array`
- **Output**: `Number`

Returns the number of values of the array.

### `array_sum`
- **Input**: `Array`
- **Output**: `Number`

Returns the sum of values of the array.

### `array_uniq`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array without duplicate values.

### `array_flat`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

| Parameter | Type | Description | Required |
| - | - | - | - |
| deep | `Integer` | The depth level specifying how deep a nested array structure should be flattened. If negative start from the deepest array. | optional (default:`Infinity`) |
### `array_map`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array with the results of calling a provided function on every element in the calling array.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | Function that produces an element of the new Array. Taking three arguments: `( currentValue, <index>, <array> )`. | true |
### `array_filter`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array with all elements that pass the test implemented by the provided function.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise.  Taking three arguments: `( currentValue, <index>, <array> )`. | true |
### `array_reduce`
- **Input**: `Array`
- **Output**: `Any`

Executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | A function to execute on each element in the array (except for the first, if no start is supplied), taking four arguments: `( accumulator, currentValue, <index>, <array> )`. | true |
| start | `Any` | First value of accumulator. | optional (default:first value of array) |
### `array_join`
- **Input**: `Array`
- **Output**: `String`

Returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String` | Specifies a string to separate each pair of adjacent elements of the array. | optional (default:`','`) |
### `array_indexOf`
- **Input**: `Array`
- **Output**: `Integer`

Returns the first index at which a given element can be found in the array, or -1 if it is not present.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Any` | Element to locate in the array. | true |
| position | `Integer` | The index to start the search at. If negative, it is taken as the offset from the end of the array. | optional (default:0) |
### `array_lastIndexOf`
- **Input**: `Array`
- **Output**: `Integer`

Returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at position value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Any` | Element to locate in the array. | true |
| position | `Integer` | The index at which to start searching backwards. If negative, it is taken as the offset from the end of the array. | optional (default:arr.length - 1) |
### `array_slice`
- **Input**: `Array`
- **Output**: `Array`

Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array.

| Parameter | Type | Description | Required |
| - | - | - | - |
| start | `Integer` | Zero-based index at which to begin extraction. If negative, indicating an offset from the end of the sequence. | optional (default:0) |
| end | `Integer` | Zero-based index before which to end extraction. slice extracts up to but not including end. A negative index can be used, indicating an offset from the end of the sequence. | optional (default:arr.length) |
### `array_pop`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array without last element.

### `array_shift`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array without first element.

### `array_sort`
- **Input**: `Array`
- **Output**: `Array`

Sorts the elements of an array in place and returns the sorted array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `Function` | A function that defines the sort order. | optional (default:javascript sort) |
### `array_reverse`
- **Input**: `Array`
- **Output**: `Array`

Returns a new array where value are reversed. The first array element becomes the last, and the last array element becomes the first.


---

## Object
### `obj_keys`
- **Input**: `Object`
- **Output**: `Array`

Returns an array of a given object's own enumerable property names, in the same order as we get with a normal loop.

### `obj_getKey`
- **Input**: `Object`
- **Output**: `Any`

Returns a single key from an Object, or a subObject if specify more then one key.

| Parameter | Type | Description | Required |
| - | - | - | - |
| value | `String`/`Array` | Name of the key you want return, use `Array` if you want more keys. | true |
### `obj_values`
- **Input**: `Object`
- **Output**: `Array`

Returns an array of a given object's own enumerable property values, in the same order as that provided by a `for...in` loop.

### `obj_entries`
- **Input**: `Object`
- **Output**: `Array`

Returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a `for...in` loop.

### `obj_fromEntries`
- **Input**: `Array`
- **Output**: `Object`

Turn a list of key-value pairs into an object.


---

## Json
### `json_parse`
- **Input**: `String`
- **Output**: `Object`

Parse a JSON string to an object.

### `json_stringify`
- **Input**: `Object`
- **Output**: `String`

Generate a JSON string from an object.

| Parameter | Type | Description | Required |
| - | - | - | - |
| pretty | `Boolean` | Set `true` for pretty stringify. | optional (default:`false`) |
| space | `Integer` | Space length for pretty stringify. | optional (default:`4`) |
### `json_toCsv`
- **Input**: `String`
- **Output**: `String`

Create a CSV from a JSON.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator. | optional (default:`','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator. | optional (default:`false`) |
### `json_fromCsv`
- **Input**: `String`
- **Output**: `String`

Create a JSON from a CSV.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator. | optional (default:`','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator. | optional (default:`false`) |
| pretty | `Boolean` | Set `true` for pretty JSON. | optional (default:`false`) |
| space | `Integer` | JSON space length, used if pretty = `true`. | optional (default:`4`) |

---

## Crypto
### `crypto_md5`
- **Input**: `String`
- **Output**: `String`

Create MD5 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | Hash digest. | optional (default:`'hex'`) |
| secret | `String` | Hash secret. | optional (default:`false`) |
### `crypto_sha1`
- **Input**: `String`
- **Output**: `String`

Create SHA1 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | Hash digest. | optional (default:`'hex'`) |
| secret | `String` | Hash secret. | optional (default:`false`) |
### `crypto_sha256`
- **Input**: `String`
- **Output**: `String`

Create SHA256 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | Hash digest. | optional (default:`'hex'`) |
| secret | `String` | Hash secret. | optional (default:`false`) |
### `crypto_sha512`
- **Input**: `String`
- **Output**: `String`

Create SHA512 hash of given value.

| Parameter | Type | Description | Required |
| - | - | - | - |
| digest | `String` | Hash digest. | optional (default:`'hex'`) |
| secret | `String` | Hash secret. | optional (default:`false`) |
### `crypto_encrypt`
- **Input**: `String`
- **Output**: `String`

Generate an encrypted string using the algorithm you have chosen with salt and password, return a string composed of salt, iv and ciphertext separated by the separator.

| Parameter | Type | Description | Required |
| - | - | - | - |
| password | `String` | The password used to encrypt text. | true |
| salt | `String` | The salt for the password. | optional (default:`random Buffer`) |
| separator | `String` | The separator of the output string. | optional (default:`'$'`) |
| mode | `String` | The algorithm used for encryption, see [Here](https://github.com/colgatto/Poliparser/blob/master/parse_modules/library/crypto.js#L11) for a complete list. | optional (default:`'aes-256-cbc'`) |
### `crypto_decrypt`
- **Input**: `String`
- **Output**: `String`

Decode an encrypted string generated with crypto_encrypt module, the string must contains salt, iv and ciphertext separated by the separator.

| Parameter | Type | Description | Required |
| - | - | - | - |
| password | `String` | The password used to encrypt the original text. | true |
| separator | `String` | The separator of the input string. | optional (default:`'$'`) |
| mode | `String` | The algorithm to use for decryption. | optional (default:`'aes-256-cbc'`) |

---

## CSV
### `csv_parse`
- **Input**: `String`
- **Output**: `Array`

Create a new Array of Object from CSV String.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator. | optional (default:`','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator. | optional (default:`false`) |
### `csv_stringify`
- **Input**: `Object`
- **Output**: `String`

Create a CSV from an array of object.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator. | optional (default:`','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator. | optional (default:`false`) |
### `csv_toJson`
- **Input**: `String`
- **Output**: `String`

Create a JSON from a CSV.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator | optional (default:`','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator. | optional (default:`false`) |
| pretty | `Boolean` | Set `true` for pretty JSON. | optional (default:`false`) |
| space | `Integer` | JSON space length, used if pretty = `true`. | optional (default:`4`) |
### `csv_fromJson`
- **Input**: `String`
- **Output**: `String`

Create a CSV from a JSON.

| Parameter | Type | Description | Required |
| - | - | - | - |
| separator | `String` | CSV value separator. | optional (default:`','`) |
| stringSeparator | `String` | CSV string separator, if false don't use string separator. | optional (default:`false`) |
