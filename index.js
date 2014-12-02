var env = require('jjv')()
var schema = require('./schema.json')

env.addSchema('cccf', schema)

module.exports = {
	schema : schema,
	validate : function(config) { return env.validate('cccf', typeof config == 'object' ? config : JSON.parse(config)) }
}