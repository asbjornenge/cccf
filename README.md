# Common Container Configuration Format

The Common Container Configuration Format (cccf) is an attempt at creating a standard container configuration format, in JSON. 

It describes containers, their properties and the relationship between them. This repository will include a JSON schema validator for the cccf.

The format is extensible so other modules can expand it's capabilities and semantics.

**DISCLAIMER** WORK IN PROGRESS

# Example

    {
        "id"      : "app",               // Container Id
        "image"   : "megacorp/webapp",   // Image path
        "cmd"     : "python server.py",  // Command to run        (optional)
        "ports"   : ["80:80"],           // List of port mappings (optional)
        "env"     : ["FOO=BAR"],         // Environment variables (optional)
        "volumes" : ["/tmp:/tmp"],       // Container volumes     (optional)
        "expose"  : ["8000","3000"]      // Exposed ports         (optional)
    }

## Id

The id, **app** in the example, is the container identifier. It can be any arbitrary string. No spaces.

## Image

The image, **megacorp/webapp** in the example, is URI to the container image. It can be any valid URI, relative or full.

## Cmd

The cmd, **python server.py** in the example, is the command to execute when running the container. It can be an arbitrary string.

## Ports

The ports, **["80:80"]** in the example, is a list of port mappings. A port mapping is defined using a string with two ports separated by a colon: **"host-port:container-port"** where ***host-port*** references a port on the host running the container, and the ***container-port*** references a port inside the running container.

## Env

The env, **["FOO=BAR"]** in the example, is a list of environment variables. An evironment variable is defined using a string with a key and a value separated by a equals sign: **"key=value"**.

## Volumes

The volumes, **["/tmp:/tmp"]** in the example, is a list of volumes to mount inside the container. There are 3 different ways to specify a volume:

    "/host/path:/container/path"  // Mounts a specified path on the host to the specified path in the container
    "/host/path"                  // Mounts a specified path on the host to the same path in the container

## Expose

Expose, **["8000","3000"]** in the example, is a list of ports the container exposes.

# HELP WANTED

Is this a good idea at all? What is missing? Typos? Messed up semantics? Please file issues!

Stuff I would like to see:

* Docker cccf extension (adding links, volumes_from, etc.)
* A cluster module that adds grouping and scale
* A resource module that adds required resources (CPU, MEM, DISK, etc.)
* A [fig](http://www.fig.sh/yml.html) (yml) parser module.
