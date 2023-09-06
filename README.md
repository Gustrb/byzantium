# Byzantium
## _The last config file_

Are you tired of having multiple config files inside one JavaScript project?
Byzantium is a tool that centralizes all the configuration files using only one file. 

## Features

- It currently only supports prettier and eslint, but I am working to make so more configs can be centralized.

## Installation

You can start using byzantium only by downloading the repository and using

```sh
cd byzantium
node src/main <filename>
# or
node src/main
```
Calling src/main will look for the file named `byzantium.json` inside the current directory.
