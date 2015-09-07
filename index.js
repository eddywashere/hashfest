var Readable = require('stream').Readable;
var glob = require('glob');

function withoutHash(filename) {
	return filename.replace(/(.*)(\.[^.]+)(\..*)$/, '$1$3');
}

module.exports = function hashfest(dir, filePattern, publicPath) {
	var rs = new Readable();
	rs._read = function () {};

	glob(filePattern, { cwd: dir }, function onGlobResult(err, files) {
		if (err) {
			return rs.emit('error', err);
		}
		var result = {
			publicPath: publicPath || ''
		};

		var assets = files.reduce(function(manifest, filename) {
			manifest[withoutHash(filename)] = filename;
			return manifest;
		}, {});

		result.assets = assets;

		rs.push(JSON.stringify(result));
		rs.push(null);
	});

	return rs;
};