# Principles

The Wikibase REST API proposal inherits many traits from the [MediaWiki core REST API design principles](https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles).

These principles are not algorithmic, and some may conflict.

## Conceptual

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Conceptual

## Schedule

- **Get the minimum done first.** We're focusing on the CRU part of CRUD for the standard Wikibase datamodel entities.
- **Existing mass used API functionality before less used features before new functionality.** We need to get the basic stuff covered early, and then we can elaborate to more specific activity. Having the base functionality done first is going to get us the most input from developers.

## Identifiers

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Identifiers

Additional clarification:

- `<type>` at the top level of endpoint paths can include multiple types for seperation.
  - Example: `entity/item` or `entity/property`
  
## Operations

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Operations

Additional clarification:

- **DELETE** will not be covered initially. See [SCOPE.md](SCOPE.md).

## Data types

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Data_types

## Headers

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Headers

## Errors

https://www.mediawiki.org/wiki/Core_Platform_Team/Initiative/Core_REST_API_in_Mediawiki/Design_principles#Errors