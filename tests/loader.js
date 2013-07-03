var tap = require('tap');
var loader = require('./../index');
var Loader = loader.loader;
var Handler = loader.handler;
var path = require('path');
var util = require('util');
var _ = require('underscore');
var domain = require('domain');

var dir_scanner = require('./../test_resources/loaders/dir_scanner');

tap.test('dir scanner', function (t) {
	var scan_path = path.resolve(__dirname, '../test_resources/scan');

	dir_scanner({}, {root: scan_path, core: {}, name_filter: /(.*)\.txt$/i}, function (err, fl) {

		fl.load(function (err) {
			var files = fl.files;
			files = _.sortBy(files, _.identity);
			t.equals(files.length, 7, 'seven text files');
			t.deepEqual(files, ['alpha.txt', 'bar.txt', 'beta.txt', 'foo.txt', 'gamma.txt', 'zeta.txt', 'zoo.txt'])
			t.end();
		}, scan_path);
	})

});