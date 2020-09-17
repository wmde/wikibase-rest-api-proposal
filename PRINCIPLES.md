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

### Path \<type> clarifications

`<type>` at the top level of endpoint paths can include multiple types for seperation.

Example: `entities/items` or `entities/properties`

### Plurality

We have seen inconsistencies in previous APIs that can lead to confusion or wrong assumptions. "Consistency is valuable" and thus we will use plurals in all path parts.

Example: `entities/items/<id>/statements/<id>/qualifiers/<hash>`

## Operations

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Operations

### PATCH

Additional to the Mediawiki core principles we will also use `PATCH`.

`PATCH` operations will make use of [JSON-Patch (RFC6902)](https://tools.ietf.org/html/rfc6902) which defines a structure for expressing a sequence of operations to apply to JSON objects.

## Data types

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Data_types

## Headers

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Headers

In addition to the principles mentioned above, the Wikibase API also supports headers for [conditional requests](https://www.mediawiki.org/wiki/API:REST_API/Conditional_requests) to optimize client side caching.

## Errors

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Errors