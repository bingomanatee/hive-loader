var loader = require('./../../index');
var Loader = loader.loader;
var Handler = loader.handler;
var _ = require('underscore');
var path = require('path');
var util = require('util')

var dir_handler = require('./../handlers/dir_file');
var file_handler = require('./../handlers/txt_file');

function File_Loader(mixins, config, cb) {

	console.log('name_filter: %s', config.name_filter);

	var fh = file_handler({}, {name_filter: config.name_filter, target: loader});
	var dh = dir_handler({}, {target: loader, name_filter: /.*/, file_name_filter: config.name_filter} );

	return Loader(
		[
			mixins,
			{ files: [] ,
				name:     'dir_scanner'}
		],
		[
			{
				handlers: [fh, dh],
				name_filter: /.*/
			},
			config
		], cb);
}

module.exports = File_Loader;
