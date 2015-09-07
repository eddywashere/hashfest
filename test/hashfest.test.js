var assert = require('assert');
var Readable = require('stream').Readable;

var expectedJsManifest = {
	"publicPath": "",
	"assets": {
		"fixtures/common.js":"fixtures/common.e4137d8d.js"
	}
};

describe('npm module', function() {

	var hashfest = require('..');

	it('should expose a function', function() {
		assert.equal(typeof(hashfest), 'function');
	});

	it('should return a readable stream', function() {
		var stream = hashfest('test', 'fixtures/*.js');
		assert(stream instanceof Readable);
	});

	it('should push stringified JSON manifest into returned stream', function(done) {
		hashfest('test', 'fixtures/*.js').on('data', function(manifestChunk) {
			var manifest = manifestChunk.toString();
			assert.equal(manifest, JSON.stringify(expectedJsManifest));
			done();
		});
	});

	it('should be able to create manifest for all kinds of files', function(done) {
		var expectedCssManifest = {
			"publicPath": "",
			"assets": {
				"fixtures/main.css":"fixtures/main.ef0e6cf5.css"
			}
		};

		hashfest('test', 'fixtures/*.css').on('data', function(manifestChunk) {
			var manifest = manifestChunk.toString();
			assert.equal(manifest, JSON.stringify(expectedCssManifest));
			done();
		});
	});

});

describe('cli', function() {

	var exec = require('child_process').exec;

	it('should give syntax hints into stderr when runned wrong number of parameters', function(done) {
		exec('bin/hashfest', function(err, stdout, stderr) {
			assert.notEqual(stderr.indexOf('syntax'), -1);
			done();
		});
	});

	it('should write JSON manifest into stdout', function(done) {
		exec('bin/hashfest test fixtures/*.js', function(err, stdout, stderr) {
			assert.equal(stdout, JSON.stringify(expectedJsManifest));
			done();
		});
	});

});