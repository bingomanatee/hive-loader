var loader = require('./../../index');
var Loader = loader.loader;
var Handler = loader.handler;
var _ = require('underscore');


var _mixins = {
	name:    'dir_hander',
	respond: function (params) {
		var latch = params.gate.latch();
		var ds =  dir_scanner = require('./../loaders/dir_scanner')({}, {target: this, name_filter: this.get_config('name_filter')});
		ds.core(params.core);
		ds.load(latch, params.file_path);
	}
};

module.exports = function (mixins, config, cb) {
	config.dir = true;

	return Handler([mixins, _mixins], [config, {name_filter: /.*/}], cb);
}