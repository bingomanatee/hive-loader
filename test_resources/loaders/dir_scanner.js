var loader = require('./../../index');
var Loader = loader.loader;
var Handler = loader.handler;
var _ = require('underscore');
var path = require('path');



function File_Loader(mixins, config, cb) {

	var dir_handler = require('./../handlers/dir_file');
	var file_handler = require('./../handlers/txt_file');

	var fh = file_handler({}, {name_filter: config.name_filter});
	var dh = dir_handler({}, {});

	var _mixins = { files: [] };

	mixins = _.clone(mixins);
	_.defaults(mixins, _mixins);

	config = _.clone(config);
	_.defaults(config, {handlers: [fh, dh],  name: 'txt_loader'});

	return Loader(mixins, config, cb);
}

module.exports = File_Loader;
