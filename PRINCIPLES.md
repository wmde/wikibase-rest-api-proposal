# Principles

The Wikibase REST API proposal inherits many traits from the [MediaWiki core REST API design principles](https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles).

These principles are not algorithmic, and some may conflict.

Any extra or modified principles are included below.

## Schedule

- **Existing mass used API functionality before less used features before new functionality.**
- **Core Wikibase entities before supplementary infomation before extended entities.**

We need to get the basic stuff covered early, and then we can elaborate to more specific activity. Having the base functionality done first is going to get us the most input from developers.

## Identifiers

### Path \<type> clarifications

`<type>` at the top level of endpoint paths can include multiple types for seperation.

Example: `entities/items` or `entities/properties`

### Plurality

We have seen inconsistencies in previous APIs that can lead to confusion or wrong assumptions. "Consistency is valuable" and thus we will use plurals in all path parts.

Example: `entities/items/<id>/statements/<id>/qualifiers/<hash>`

## Operations

### PATCH

In addition to the Mediawiki core principles we will also use `PATCH`.

`PATCH` operations will make use of [JSON-Patch (RFC6902)](https://tools.ietf.org/html/rfc6902) which defines a structure for expressing a sequence of operations to apply to JSON objects.

## Headers

In addition to the Mediawiki core principles , the Wikibase API also supports headers for [conditional requests](https://www.mediawiki.org/wiki/API:REST_API/Conditional_requests) to optimize client side caching.

## Response bodies upon changes

When resources are returned upon creation or change we do **not** include meta information, like edit tags or the summary. The resource as it is returned may be the result of a merge between what was submitted and server state, so there is no direct connection between the resource state and the submitted payload.
