# search-text-tokenizer

search-text-tokenizer is a text tokenizer for Google-like search query supporting double quoted phrase.

    var tokenizer = require('search-text-tokenizer');

    console.log(tokenizer('red bull'));  // ['red', 'bull']
    console.log(tokenizer('"red bull" "gives you wings"'));  // ['"red bull"', '"gives you wings"'] 
 
## Installation

    $ npm install search-text-tokenizer

## Running test

To run the test suite first invoke the following command within the repo, installing the development dependencies:
 
    $ npm install

then run the tests:

    $ make test