# Common Container Configuration Format

[![NPM](https://nodei.co/npm/cccf.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cccf/)

The Common Container Configuration Format (cccf) is an attempt at creating a standard container configuration format, in JSON. 

It describes containers, their properties and the relationship between them. This repository will include a JSON schema validator for the cccf.

The format is extensible so other modules can expand it's capabilities and semantics.

**DISCLAIMER** WORK IN PROGRESS

## Example

    {
        "id"      : "app",                 // Container Id
        "image"   : "megacorp/webapp",     // Image path
        "cmd"     : "python server.py",    // Command to run        (optional)
        "ports"   : ["80:80","53:53/udp"], // List of port mappings (optional)
        "env"     : ["FOO=BAR"],           // Environment variables (optional)
        "volumes" : ["/tmp:/tmp"],         // Container volumes     (optional)
    }

### Id

The id, **app** in the example, is the container identifier. It can be any arbitrary string. No spaces.

### Image

The image, **megacorp/webapp** in the example, is URI to the container image. It can be any valid URI, relative or full.

### Cmd

The cmd, **python server.py** in the example, is the command to execute when running the container. It can be an arbitrary string.

### Ports

The ports, **["80:80"]** in the example, is a list of port mappings. A port mapping is defined using a string with two ports separated by a colon: **"host-port:container-port"** where ***host-port*** references a port on the host running the container, and the ***container-port*** references a port inside the running container. Since version 3.2.0 cccf also support specifying the protocol; **["53:53/udp"]**. The two supported protocols are *tcp* and *udp*. 

### Env

The env, **["FOO=BAR"]** in the example, is a list of environment variables. An evironment variable is defined using a string with a key and a value separated by a equals sign: **"key=value"**.

### Volumes

The volumes, **["/tmp:/tmp"]** in the example, is a list of volumes to mount inside the container. There are two different ways to specify a volume:

    "/host/path:/container/path"  // Mounts a specified path on the host to the specified path in the container
    "/host/path"                  // Mounts a specified path on the host to the same path in the container

## Install the module

    npm install cccf 

## API

#### `validate(containers)`

The main use-case for this module is to validate container configs. 

```js
var cccf       = require('cccf')
var container  = require('./container.json')
var containers = require('./containers.json')

try {
  cccf.validate(container)
  cccf.validate(containers)
} catch(e) {
  console.log(e instanceof cccf.exception, e.trace)
}
```

#### `random(num, opts)`

Generate random container configs. Useful for testing etc.

```js
var cccf = require('cccf')
var containers = cccf.random(5, { host: { hostname: 'yolo' }})
```

#### `schema`

The cccf json schema.

#### `exception`

The cccf exception throws if bad config.

## Ecosystem

Some modules using cccf

* [cccf-scale](https://github.com/asbjornenge/cccf-scale) - Scale up a cccf config
* [cccf-diff](https://github.com/asbjornenge/cccf-diff) - Diff two cccf configs
* [cccf-scheduler](https://github.com/asbjornenge/cccf-scheduler) - Schedule containers 
* [cccf-docker-instructions](https://github.com/asbjornenge/cccf-docker-instructions) - cccf and cccf-docker -> docker cli instructions

## Changelog

### 3.3.0

* Added support for generating random containers

### 3.2.0

* Support for port protocols tcp and udp
* Removed docs for expose (planning to remove it in next major)

### 3.1.0

* Loosened the regex for env. I'm gonna need some help with the regexes :-P Feel free to HALP!

### 3.0.0

* Throwing exceptions instead of returning err. Makes for better composition. If no err, *validate* returns the passed config (in input format).

### 2.1.0

* Added cccf/example.json and cccf/example-multiple.json for easier example require from other modules

### 2.0.0

* Removed the validateMultiple API and rather do a quick *instanceof Array* verification for validate

### 1.0.1

**NB!** Moved from *common-container-configuration-format* to *cccf*.

* Updates for package move

### 1.0.0

* Initial release
