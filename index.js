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
		if (!(typeof config == 'object')) config = JSON.parse(config)
		if (config instanceof Array) return env.validate('cccf-multiple', config)
		else return env.validate('cccf', config)
	}
}