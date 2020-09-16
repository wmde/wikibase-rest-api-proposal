# Wikibase REST API Proposal

Prototype schema for the future Wikibase REST API.

The schema can be previewed at https://wmde.github.io/wikibase-rest-api-proposal

The specification follows some [general API design principles](PRINCIPLES.md). Some existing Wikibase APIs have not been included in purpose. You can read more in the [scope document](SCOPE.md).

## Development

This project is using a Javascript tool chain to build an openapi specification and a user interface to show it.

### Prerequisites

Make sure you have [Node](https://nodejs.org/en/download/package-manager/) v10 or up installed. Alternatively, all commands can be run inside of a docker container (e.g. `docker run --rm -v ${PWD}:/app -w /app node:10 npm install`).

All documented commands should be run from the root directory of the cloned repository.

### Install Dependencies

```bash
npm install
```

### Start development server

```bash
npm run watch
```

### Build for deployment

```bash
npm run build
```
