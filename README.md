# Container Configuration Format

This is an attempt at creating a standard container configuration format. 

It describes containers and the relationship between then. The common format will be a JSON representation of this configuration. This repository will include a JSON schema validator to validate container configuration.

The format is extendable with any key not listed here. Use this for expanding the capabilities of this format.
This repository does not include a parser for this format. Either write your configuration as JSON or publish a separated parser module.


	{
		"app" : {	  	                     // Container Identifier 
			"image"   : "megacorp/webapp",   // Image
			"cmd"     : "python server.py",  // Command to run        (optional)
			"ports"   : "80:80",             // List of port mappings (optional)
			"env"     : ["FOO=BAR"],         // Environment variables (optional)
			"links"   : ["$redis"],          // Container links       (optional)
			"volumes" : ["/tmp:/tmp","$db"], // Container volumes     (optional)
			"expose"  : ["8000","3000"]      // Exposed ports         (optional)
		}
	}



**WANTED** A [fig](http://www.fig.sh/yml.html) (yml) parser module.