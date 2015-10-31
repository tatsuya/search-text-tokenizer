# search-text-tokenizer

[![Build Status](https://travis-ci.org/tatsuyaoiw/search-text-tokenizer.svg?branch=master)](https://travis-ci.org/tatsuyaoiw/search-text-tokenizer)

A search query tokeniser inspired by Google.

- Split a space-delimitered query string into an array of terms
- Treat quoted terms as phrases
- Support tagged terms (tag:term)

## Examples

```js
var tokenizer = require( 'search-text-tokenizer' );

console.log( tokenizer( 'red bull' ) );
// [ 'red', 'bull' ]

var result = console.log( tokenizer( '"red bull" "gives you wings"' ) );
// [ 'red bull', 'gives you wings' ]
// result[0].phrase === true

result = console.log( tokenizer( 'author:tolkien' ) );
// [ 'tolkien' ]
// result[0].tag === 'author'
```

## Installation

```
$ npm install search-text-tokenizer
```

## Running test

To run the test suite first invoke the following commands in the project directory.

```
$ npm install
$ npm test
```

## License

MIT © Tatsuya Oiwa, Dannii Willis
