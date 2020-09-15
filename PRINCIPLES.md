# Principles

The Wikibase REST API proposal inherits many traits from the [MediaWiki core REST API design principles](https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles).

These principles are not algorithmic, and some may conflict.

## Conceptual

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Conceptual

## Schedule

- **Existing mass used API functionality before less used features before new functionality.**
- **Core Wikibase entities before supplementary infomation before extended entities.**

We need to get the basic stuff covered early, and then we can elaborate to more specific activity. Having the base functionality done first is going to get us the most input from developers.

## Identifiers

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Identifiers

Additional clarification:

- `<type>` at the top level of endpoint paths can include multiple types for seperation.
  - Example: `entity/item` or `entity/property`
  
## Operations

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Operations

### PATCH

Additional to the Mediawiki core principles we will also use `PATCH`.

`PATCH` operations will make use of [JSON-Patch (RFC6902)](https://tools.ietf.org/html/rfc6902) which defines a structure for expressing a sequence of operations to apply to JSON objects.

## Data types

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Data_types

## Headers

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Headers

## Errors

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Errors