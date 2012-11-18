var Component = require('hive-component');
var _mixins = require('./mixins');
var _ = require('underscore');

module.exports = function(mixins, config, cb){
	_.defaults(mixins, _mixins);
	return Component(mixins, config, cb);
}