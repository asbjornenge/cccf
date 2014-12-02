var assert   = require('assert')
var cccf     = require('../index')
var config   = require('./config.json')
var multiple = require('./multiple.json')

var clone  = function(config) { return JSON.parse(JSON.stringify(config)) }

describe('Common Container Configuration Format', function() {

	it('can validate a valid javascript object', function() {
		assert(cccf.validate(config) == null)
	})

	it('can validate a valid json string', function() {
		assert(cccf.validate(JSON.stringify(config)) == null)
	})

	it('can validate multiple', function() {
		assert(cccf.validateMultiple(multiple) == null)
		assert(cccf.validateMultiple(JSON.stringify(multiple)) == null)
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
		var _config   = clone(config)
		_config.ports = ["80:meh"]
		var res       = cccf.validate(_config)
		assert(res != null)
	})

	it('will not validate env as anything but an array', function() {
		var _config   = clone(config)
		_config.env   = 2
		var res       = cccf.validate(_config)
		assert(res != null)
		assert(res.validation.env.type == 'array')		
	})

	it('will not validate badly formatted envs', function() {
		var _config   = clone(config)
		_config.env   = ["FOO:BAR"]
		var res       = cccf.validate(_config)
		assert(res != null)
	})

	it('will not validate volumes as anything but an array', function() {
		var _config     = clone(config)
		_config.volumes = 2
		var res         = cccf.validate(_config)
		assert(res != null)
		assert(res.validation.volumes.type == 'array')		
	})

	it('will not validate badly formatted volumes', function() {
		var _config     = clone(config)
		_config.volumes = ["chili"]
		var res         = cccf.validate(_config)
		assert(res != null)
		_config.volumes = ["tmp:tmp"]
		var res         = cccf.validate(_config)
		assert(res != null)
		_config.volumes = ["./tmp:/tmp"]
		var res         = cccf.validate(_config)
		assert(res == null)
	})

	it('will not validate expose as anything but an array', function() {
		var _config     = clone(config)
		_config.expose  = 2
		var res         = cccf.validate(_config)
		assert(res != null)
		assert(res.validation.expose.type == 'array')		
	})

	it('will not validate badly formatted expose', function() {
		var _config    = clone(config)
		_config.expose = ["FOO"]
		var res        = cccf.validate(_config)
		assert(res != null)
	})

	it('uses the same schema for mulitple', function() {
		var _multiple       = clone(multiple)
		_multiple[0].expose = ["FOO"]
		var res             = cccf.validateMultiple(_multiple)
		assert(res != null)
	})

})