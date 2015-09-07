# hashfest [![Build Status](https://api.travis-ci.org/eddywashere/hashfest.png)](http://travis-ci.org/eddywashere/hashfest)

Create a JSON manifest of static asset files which has filenames with hash in their filenames. A fork of https://github.com/finn-no/json-manifest.

## Goal

***Given file tree***

    |- public
    `-- js
      | - common.b369de85.js
      ` - vendor.e4137d8d.js

***Should result in manifest.json***

```json
{
	"js/common.js": "js/common.b369de85.js",
	"js/vendor.js": "js/vendor.e4137d8d.js"
}
```

## Usage

### hashfest(directory, filePattern, publicPath): readable stream

```js
var fs = require('fs');
var hashfest = require('hashfest');

var destFile = fs.createWriteStream('manifest.json');

hashfest('./build', '*', 'https://example.com')
	.on('error', function(err){
		console.error('Error while creating manifest :(', err.stack);
	})
	.pipe(destFile);
```

### Command line

```bash
$ npm install -g hashfest
$ hashfest public "*" http://example.com > manifest.json
```

## License

(The MIT License)

Copyright (c) 2015 FINN.no AS<br>
              2015 Eddy Hernandez

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.