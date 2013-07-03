var loader = require('./../../index');
var Handler = loader.handler;
var _ = require('underscore');
var util = require('util');

var _mixins = {name: 'txt_handler', respond: function (params) {
	if (!params.core.files) params.core.files = [];
	if (!params.core.paths) params.core.paths = [];
	params.core.files.push(params.file);
	params.core.paths.push(params.file_path.substr(params.core.root.length));
//	console.log('core: %s', util.inspect(params.core, false, 1));
//	console.log('parapms: %s', util.inspect(params, false, 1));
}};

module.exports = function (mixins, config, cb) {

	return Handler(
		[
			mixins, _mixins
		],
		config
		, cb);
}