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

### Merging Items & Redirects

A `wbmergeitems` and `wbcreateredirect` equivalent have not been included in the specification.

These will be investigated in the future and the funcionality will likely be implemented, but perhaps not in a directly comparable way.

### Badges

A `wbavailablebadges` equivalent has not been included in the specification.

The badges API distracts from the main focus and complexity of the proposed specification (getting and interacting with entities).

It's likely that badges, or some way of retrieving lists of entities would be included as a separate endpoint.

### Response links

Many REST APIs link to endpoints around them. Unfortunately, for the time being, this kind of linking falls out of scope for the initial specification of this API. However, we do intend to investigate this topic for future iterations of this spec, in accordance with recommendations from the Mediawiki Core Platform Team.

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

## Acknowledged (possible) need for follow-ups

### Authentication

This proposal envisages authentication through the use of HTTP headers. Clients must be crafted in a way that they are in possession of a token and actively send it as part of the requests they perform.

Authentication through cookies is not supported in this proposal and client software can not passively rely on a user agent to maintain login state across requests. This renders [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks impossible and eliminates the need for "CSRF tokens" to be embedded into request bodies.

This proposal does not elaborate how clients can reach possession of such a token and a decision if an exclusive binding to [OAuth](https://www.mediawiki.org/wiki/OAuth/For_Developers) is desired or feasible in the current state has not been reached.
