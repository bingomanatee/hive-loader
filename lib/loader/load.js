var _ = require('underscore');
var Gate = require('gate');
var fs = require('fs');
var path = require('path');
var _DEBUG = false;
var util = require('util');

module.exports = function (cb, root, handlers) {

	var my_handlers = this.get_config('handlers');
	if (handlers) {
		handlers = handlers.concat(my_handlers);
	} else {
		handlers = my_handlers;
	}

	if (!root) {
		root = this.get_config('root');
	}

	this.removeAllListeners('file');
	this.removeAllListeners('dir');
	var loader = this;

	if (_DEBUG) console.log('handlers: %s', util.inspect(handlers));
	if (this.config().has('target')){
		var target = this.get_config('target');
	} else {
		var target = loader;
	}
	//	console.log('self is %s', this.name);
	_.each(handlers, function (handler) {
		if (_DEBUG)     console.log('adding handler %s', handler.name);

		function _handle(params) {
			if (_DEBUG)     console.log(' testing %s with handler %s(%s)', params.file, handler.name, handler.get_config('name_filter'));
			if (handler.handles( params, loader)) {
				handler.respond.call(target, params);
			}
		}

		if (handler.get_config('dir')) {
			if (_DEBUG)     console.log('emitting dir');
			loader.on('dir', _handle);
		} else {
			if (_DEBUG)     console.log('emitting file');
			loader.on('file', _handle);
		}
	});

	var gate = Gate.create();
	fs.readdir(root, function (err, files) {
		_.each(files, function (file) {
			var file_path = path.resolve(root, file);
			var params = {
				file:      file,
				root:      root,
				gate:      gate,
				file_path: file_path
			}
			var stat = fs.statSync(file_path);
			if (stat.isFile()) {
				if (_DEBUG)    console.log('emitting file %s', file_path);
				loader.emit('file', params);
			} else {
				if (_DEBUG)  	console.log('%s is not file', file_path);
			}

			if (stat.isDirectory()) {
				loader.emit('dir', params);
			} else {
				if (_DEBUG)  console.log('%s is not dir', file_path);
			}

		})
		gate.await(cb);
	})
}