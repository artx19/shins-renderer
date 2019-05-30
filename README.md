# tendershins

Wrapper for shins generators:

* [Widdershins](https://github.com/Mermade/widdershins)
* [Shins](https://github.com/Mermade/shins)

Generates HTML documentation from OpenAPI / Swagger / AsyncAPI / Semoasa definition.

## To install

Clone the git repository, or use npm install
```
npm install tendershins --save
```

## Usage

To generate documentation create a specification file in the supported format and run tendershins:

```
npx tendershins <spec_file> <targe_path> [logo_path]
```

Examples of specification files see in [OpenAPI repository](https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v3.0). 

