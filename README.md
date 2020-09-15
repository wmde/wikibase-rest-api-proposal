# Wikibase REST API Proposal

Prototype of the schema of the future Wikibase REST API.

## Scope

The REST API is meant to provide the functionality currently offer by Wikibase "Action API".
The scope of the schema is limited to Wikibase core Action API functionality, i.e. Wikibase's additions to MediaWiki's own API actions are intentionally not covered.

### Work in progress

The following elements are not yet defined:
* Response schema
* Complete definition of filtering parameters
* ....

### Not covered

The following elements are considered non essential for the design decisions and are intentionally excluded from the prototype schema:
* TBD

## Preview

REST API schema can be previewed using https://wmde.github.io/wikibase-rest-api-proposal.

## Development

This project is using a Javascript tool chain to build an openapi specification and a user interface to show it.

You can use docker to quickly get started developing.

### Project setup

```
# ensure the node user uses your user id, so you own generated files
docker-compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g) node
docker-compose run --rm node npm install
```

### View build result (incl. hot reloading)

```
docker-compose up ui
```

### Build to disk

```
docker-compose run --rm node npm run build
```
