var assert = require('assert')
var cccf   = require('../index')
var config = require('./config.json')

var clone  = function(config) { return JSON.parse(JSON.stringify(config)) }

describe('Common Container Configuration Format', function() {

	it('can validate a valid javascript object', function() {
		assert(cccf.validate(config) == null)
	})

	it('can validate a valid json string', function() {
		assert(cccf.validate(JSON.stringify(config)) == null)
	})

	it('will not validate ids with invalid chars', function() {
		var _config = clone(config)
		_config.id  = "yo lo"
		assert(cccf.validate(_config) != null)
		_config.id  = "☃"
		assert(cccf.validate(_config) != null)
	})

	it('will not validate cmd as anything but a string', function() {
		var _config = clone(config)
		_config.cmd = 2
		var res     = cccf.validate(_config)
		assert(res != null)
		assert(res.validation.cmd.type == 'string')
	})

	it('will not validate ports as anything but an array', function() {
		var _config   = clone(config)
		_config.ports = false
		var res       = cccf.validate(_config)
		assert(res != null)
		assert(res.validation.ports.type == 'array')
	})

	it('will not validate badly formatted portmappings', function() {
		
	})

})