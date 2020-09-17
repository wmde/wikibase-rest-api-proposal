# Scope

The REST API specification is meant to provide the main functionality currently offered by the Wikibase "Action API".

You can read more about the principles covering the schedule of work [here](PRINCIPLES.md#Schedule)

## Intentionally not implemented

The following elements are considered non essential for the design decisions and are intentionally excluded from the prototype schema:

### Alternate lookups

Some features of `wbgetentities` are not included in the specification, such as lookup by `site` and `title`. This also applies to other occurrences of “filtering results” by properties other than the primary keys in the paths.

Investigations will be carried out to determine if such functionality may make sense to be included as part of the primary entity retrieval / listing endpoint, or if search and lookup should remain a separate topic.

### Queries restricting response size

Some API end points provide the capability to reduce the size of the response by applying restrictions to what is returned. One example is the languages in which `wbgetentities` labels/descriptions/aliases are returned. This functionality is not currently part of this specification.

### Queries augmenting responses

Some API end points provide the capability to augment responses by additional information. One example is the fallback languages for `wbgetentities` labels/descriptions/aliases. This functionality is not currently part of this specification.

### Search

A `wbsearchentities` equivalent has not been included in the specification.

Investigations will be carried out to determine if such functionality may make sense to be included as part of the primary entity retrieval / listing endpoint, or if search and lookup should remain a separate topic.

### Badges

A `wbavailablebadges` equivalent has not been included in the specification.

The badges API distracts from the main focus and complexity of the proposed specification (getting and interacting with entities).

It's likely that badges, or some way of retrieving lists of entities would be included as a separate endpoint.

### UI focused modules

The existing modules serve mainly as part of the Wikibase UI editing and display workflow and are not deemed to be used much externally.

- `wbformatentities`
- `wbformatvalue`
- `wbparsevalue`

### Wikibase Client modules

- `wbsearch`
- `wbsubscribers`
- `wbcontentlanguages`
- `entityterms`

### Extensions

Wikibase extensions will be able to make sure of the primary layer of Wikibase API endpoints where appropriate. For example you will be able to interact with statement on Lexemes or MediaInfo entities using the statement related endpoints.

Any additional development though would be done within the extension itself. Such development would draw from the learnings in the Wikibase API, but the endpoints would be a separate project.

- MediaInfo
- PropertySuggester: `wbsgetsuggestions`
- QualityConstraints: `wbcheckconstraints`, `wbcheckconstraintparameters`
- Lexeme: `wblmergelexemes`, `wbladdform`,  `wbladdsense` `wbleditformelements`, `wbleditsenseelements`, `wblremoveform`, `wblremovesense`

### Modules that combine with other action modules

If not already explicitly included above, any existing action API modules that are intended for use with other action API modules, such as those provided by MediaWiki core, are excluded from the scope of this specification.

For example the `entityterms` module which can be combined with other MediaWiki page lookups to retrieve terms of a connected entity from something like pageid or category list.
