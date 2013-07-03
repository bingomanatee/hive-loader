var loader = require('./../../index');
var Handler = loader.handler;
var _ = require('underscore');


module.exports = function (mixins, config, cb) {
	var file_name_filter = config.file_name_filter;

	var _mixins = {
		name:    'dir_handler',
		respond: function (params) {
			var dir_scanner = require('./../loaders/dir_scanner');
			var latch = params.gate.latch();
			var ds =  dir_scanner({}, {name_filter: file_name_filter});
			ds.core(params.core);
			ds.load(latch, params.file_path);
		}
	};
	return Handler([mixins, _mixins], [{dir: true}, config, {name_filter: /.*/}], cb);
};