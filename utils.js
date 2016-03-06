var randomString = require('random-string')
var randomNumber = require('random-number')

function randomInt(min, max) {
  return randomNumber({
    min: min,
    max: max,
    integer: true
  })
}

function randomSemver() {
  return randomInt(1,10)+"."+randomInt(1,10)+"."+randomInt(1,10)
}

function randomExampleContainer(opts) {
  var port = randomNumber({ min: 1000, max: 5000, integer: true })
  var path = randomString()
  return {
    "id"      : randomString(),
    "image"   : randomString()+"/"+randomString()+":"+randomSemver(),
    "cmd"     : randomString({ length: 20 }),
    "ports"   : [port+":"+port],
    "env"     : [randomString()+"="+randomString()],
    "volumes" : ["/"+path+":/"+path]
  }
}

module.exports = {
  randomExampleContainer : randomExampleContainer
}
