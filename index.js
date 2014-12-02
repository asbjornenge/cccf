var env = require('jjv')()
var schema = require('./schema.json')

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
		return env.validate('cccf', typeof config == 'object' ? config : JSON.parse(config)) 
	},
	validateMultiple : function(config) {
		return env.validate('cccf-multiple', typeof config == 'object' ? config : JSON.parse(config))
	}
}