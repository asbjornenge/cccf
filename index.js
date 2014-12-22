var env = require('jjv')()
var schema = require('./schema.json')

var CCCFException = function(message, trace) {
	this.message  = message
	this.trace    = trace
	this.toString = function() {
		return this.message + '. Details in e.trace.'
	}
}

env.addSchema('cccf', schema)
env.addSchema('cccf-multiple', {
	type  : 'array',
	items : {
		'$ref' : "#/definitions/cccf"
	},
	definitions : {
		"cccf" : schema
	}
})

module.exports = {
	schema : schema,
	validate : function(config) {
		if (!(typeof config == 'object')) config = JSON.parse(config)
		var _config = (config instanceof Array) ? config : [config]
		var err = env.validate('cccf-multiple', _config)
		if (err) throw new CCCFException('Invalid config', err)
		return config
	},
	exception : CCCFException
}