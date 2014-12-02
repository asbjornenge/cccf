# Common Container Configuration Format

The Common Container Configuration Format (cccf) is an attempt at creating a standard container configuration format, in JSON. 

It describes containers, their properties and the relationship between them. This repository will include a JSON schema validator of the cccf.

The format is extensible to allow other modules expand it's capabilities and semantics.

# Example

    {
        "app" : {                            // Container Id 
            "image"   : "megacorp/webapp",   // Image path
            "name"    : "app1"               // Name of the container (optional)
            "cmd"     : "python server.py",  // Command to run        (optional)
            "ports"   : ["80:80"],           // List of port mappings (optional)
            "env"     : ["FOO=BAR"],         // Environment variables (optional)
            "links"   : ["$redis"],          // Container links       (optional)
            "volumes" : ["/tmp:/tmp","$db"], // Container volumes     (optional)
            "expose"  : ["8000","3000"]      // Exposed ports         (optional)
        }
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

## Links

The links, **["$redis"]** in the example, is a list of linked containers. A containers link is defined using a string, a **$** sign and the **id** of the container: **"$id"**.

## Volumes

The volumes, **["/tmp:/tmp","$db"]** in the example, is a list of volumes to mount inside the container. There are 3 different ways to specify a volume:

    "/host/path:/container/path"  // Mounts a specified path on the host to the specified path in the container
    "/host/path"                  // Mounts a specified path on the host to the same path in the container
    "$container"                  // Mounts the same volumes as another container

## Expose

Expose, **["8000","3000"]** in the example, is a list of ports the container exposes.

# HELP WANTED

Is this a good idea at all? What is missing? Typos? Messed up semantics? Please file issues!

Stuff I would like to see:

* A cluster module that adds grouping and scale
* A [fig](http://www.fig.sh/yml.html) (yml) parser module.
