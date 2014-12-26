var assert   = require('assert')

var cccf     = require('../index')
var config   = require('../example.json')
var multiple = require('../example-multiple.json')

var clone  = function(config) { return JSON.parse(JSON.stringify(config)) }

describe('Common Container Configuration Format', function() {

	it('can validate a valid javascript object', function() {
		assert(cccf.validate(config) == config)
	})

	it('can validate a valid json string', function() {
		assert(typeof cccf.validate(JSON.stringify(config)) == 'object')
	})

	it('can validate multiple', function() {
		assert(cccf.validate(multiple) == multiple)
		assert(typeof cccf.validate(JSON.stringify(multiple)) == 'object')
	})

	it('will not validate ids with invalid chars', function() {
		var _config = clone(config)
		_config.id  = "yo lo"
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
		_config.id  = "☃"
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
	})

	it('will not validate cmd as anything but a string', function() {
		var _config = clone(config)
		_config.cmd = 2
		try { cccf.validate(_config) } catch(e) { 
			assert(e instanceof cccf.exception) 
			assert(e.trace.validation[0].schema.cmd.type == 'string')
		}
	})

	it('will not validate ports as anything but an array', function() {
		var _config   = clone(config)
		_config.ports = false
		try { cccf.validate(_config) } catch(e) {
			assert(e instanceof cccf.exception) 
			assert(e.trace.validation[0].schema.ports.type == 'array')
		}
	})

	it('will not validate badly formatted portmappings', function() {
		var _config   = clone(config)
		_config.ports = ["80:meh"]
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
	})

	it('will not validate env as anything but an array', function() {
		var _config   = clone(config)
		_config.env   = 2
		try { cccf.validate(_config) } catch(e) {
			assert(e instanceof cccf.exception) 
			assert(e.trace.validation[0].schema.env.type == 'array')
		}
	})

	it('will not validate badly formatted envs', function() {
		var _config   = clone(config)
		_config.env   = ["FOO:BAR"]
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
	})

    it('will validate numbers and dots in env', function() {
        var _config = clone(config)
        _config.env = ["FOO=192.168.1.2"]
        try { cccf.validate(_config) } catch(e) { assert(false) }
        assert(true)
    })

	it('will not validate volumes as anything but an array', function() {
		var _config     = clone(config)
		_config.volumes = 2
		try { cccf.validate(_config) } catch(e) {
			assert(e instanceof cccf.exception) 
			assert(e.trace.validation[0].schema.volumes.type == 'array')
		}
	})

	it('will not validate badly formatted volumes', function() {
		var _config     = clone(config)
		_config.volumes = ["chili"]
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
		_config.volumes = ["tmp:tmp"]
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
		_config.volumes = ["./tmp:/tmp"]
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
	})

	it('will not validate expose as anything but an array', function() {
		var _config     = clone(config)
		_config.expose  = 2
		try { cccf.validate(_config) } catch(e) {
			assert(e instanceof cccf.exception) 
			assert(e.trace.validation[0].schema.expose.type == 'array')
		}
	})

	it('will not validate badly formatted expose', function() {
		var _config    = clone(config)
		_config.expose = ["FOO"]
		try { cccf.validate(_config) } catch(e) { assert(e instanceof cccf.exception) }
	})

	it('uses the same schema for mulitple', function() {
		var _multiple       = clone(multiple)
		_multiple[0].expose = ["FOO"]
		try { cccf.validate(_multiple) } catch(e) { assert(e instanceof cccf.exception) }
	})

})
