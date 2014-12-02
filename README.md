# Container Configuration Format

This is an attempt at creating a standard container configuration format. 

It describes containers and the relationship between then only. The common format will be a JSON representation of this configuration. This repository will include a JSON schema validator to validate container configuration.

The format is extendable with any key not listed here. Use this for expanding the capabilities of this format.
This repository does not include a parser for this format. Either write your configuration as JSON or publish a separated parser module.


	{
		"app" : {	  	                     // Container Identifier 
			"image"   : "megacorp/webapp",   // Image path
			"cmd"     : "python server.py",  // Command to run        (optional)
			"ports"   : ["80:80"],           // List of port mappings (optional)
			"env"     : ["FOO=BAR"],         // Environment variables (optional)
			"links"   : ["$redis"],          // Container links       (optional)
			"volumes" : ["/tmp:/tmp","$db"], // Container volumes     (optional)
			"expose"  : ["8000","3000"]      // Exposed ports         (optional)
		}
	}

## Id

The id, ***app*** in the example, can be any arbitrary string. No spaces.

## Image

The image, ***megacorp/webapp*** in the example, can be any valid uri (?)

## Cmd

The cmd, ***python server.py*** in the example, can be an arbitrary string.

## Ports

The ports, ***["80:80"]*** in the example, is a list of port mappings. A port mapping is defined using a string with two ports separated by a colon: **"host-port:container-port"** where ***host-port*** references a port on the host running the container, and the ***container-port*** references a port inside the running container.

## Env

The env, ***["FOO=BAR"]*** in the example, is a list of environment variables. An evironment variable is defined using a string with a key and a value separated by a equals sign: **"key=value"**.



**WANTED** A [fig](http://www.fig.sh/yml.html) (yml) parser module.