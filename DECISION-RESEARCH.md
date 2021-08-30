<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Trailblaze (September 2020)](#trailblaze-september-2020)
- [Prototyping (July 2020)](#prototyping-july-2020)
  - [/entity/item/Q42 vs /entity/Q42](#entityitemq42-vs-entityq42)
  - [Consistent "default edit parameters"](#consistent-default-edit-parameters)
  - [Pagination](#pagination)
  - [Filtering rows](#filtering-rows)
  - [Updating resources](#updating-resources)
  - [Entities + Statements](#entities--statements)
  - [RevisionIds (Path? Query?)](#revisionids-path-query)
  - [Conditional Requests](#conditional-requests)
  - [Resources in Plural vs Singular](#resources-in-plural-vs-singular)
  - [Indexed collections](#indexed-collections)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Trailblaze (September 2020)

## Title / Revision info in response bodies

**Decision:Leave this meta infomation out of the response bodies for the first iteration.**

- `lastrevid` & `modified`
  - We already get an ETag with the revision ID, and a usable timestamp, that may cover the usage of this meta data
- `title` & `pageid`
  - Used to jump from Wikibase entities to titles for use with the MediaWiki core APIs (deletion & protection etc)
    - Deletion is now provided in our REST API
    - We could provide further APIs for other functionality such as protection, undeletion etc.
  - Could be used for linking, but `Special:EntityPage` is also an option there
- `ns`
  - Will be easily available via the WikibaseManifest REST API in the future.
  - The ID itself is probably not that useful anyway

# Prototyping (July 2020)

Research and decision record from the July 2020 prototyping week.

## /entities/items/Q42 vs /entities/Q42

**Decision: /entities/items/Q42**

This allows us to:

- Easily separate the payload and response examples and schema for different entity types in the spec.
- Allow a world in which Entity IDs may not have their entity types coded into them in some way.
- Allow for clear seperation between entity endpoints and other endpoints (such as statements, badges and anything to come in the future.)

---

## Consistent "default edit parameters"

**Decision: New edit endpoints should all equally implement certain “default edit parameters” (e.g. bot, baserevid, summary, tags).**

In the past various editing interfaces were introduced without a full parameter set.
Parameters were often then immediately requested but then not added promptly due to other commitments.
To avoid this, the basic editing parameter set will always be added to edit endpoints.

---

## Pagination

**Decision: Offset parameters (in the Wordpress style) will be used (page, per_page, offset).**

### How others do it

#### Wordpress

- ?page=: page number of results to return
- ?per_page=: number of records to return in one request, Int(1-100)
- ?offset=: arbitrary offset at which to start retrieving posts

#### MediaWiki action API

- ?limit and ?continue
- Different words for combined quieries ?XXlimit ?XXcontinue
- The word is formed of an abbreviation of the property + ‘limit’ or ‘continue’, 
- i.e. prop=duplicatefiles (df) params: dflimit, dfcontinue

### Best practices

#### Offset

Retrieves the 20 rows starting with the 100th row

`GET /items?limit=20&offset=100`

Simplest form of paging. Became popular with apps using SQL DBs (LIMIT and OFFSET are part of the SQL SELECT Syntax.

##### Pros

- Easiest to implement, almost no coding required other than passing parameters directly to SQL query.
- Stateless on the server.
- Works regardless of custom sort_by parameters

##### Cons

- Not performant for large offset values. The DB needs to scan and count rows starting with 0, and will skip $offset rows.
- Not consistent when new items are inserted to the table (i.e. Page drift) 
especially noticeable when ordering items by newest first

#### Keyset

Retrieves the 20 most recent items

`GET /items?limit=20`

Next page, client finds the minimum created date of 2018-01-20T00:00:00 from previously returned results.

`GET /items?limit=20&created:lte:2018-01-20T00:00:00`

##### Pros

- Works with existing filters without additional backend logic. 
  - Only additional limit parameters needed
- Consistent ordering even when newer items are inserted into the table. Works well when sorting by most recent first.
- Consistent performance even with large offsets.

##### Cons

- Tight coupling of paging mechanism to filters and sorting. Forces API users to add filters even if no filters are intended.
- Does not work for low cardinality fields such as enum strings.
- Complicated for API users when using custom sort_by fields as the client needs to adjust the filter based on the field used for sorting.

---

## Filtering rows

**Status Quo: This fell out of the [SCOPE](./SCOPE.md) of the spec, thus no decision was really made.**

### Research intro

- URL parameters
- For exact matches: /items?state=active
- For non-exact matches:
  - Filters are composed by:
    - The property or field name
    - The operator such as eq, lte, gte
    - The filter value

Sources: 

- https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
- https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter

### LHS Brackets

Retrieves all the items where the price is greater than or equal to 10, but less than or equal to 100

`GET /items?price[gte]=10&price[lte]=100`

#### Pros

- Ease of use for clients. Many query string parsing libraries available to encode nested JSON objects into square brackets
- Simple to parse on server side. The URL parameter key contains both the field name and operator. Easy to GROUP BY (property name, operator) without looking at the URL parameter values.
- No need to escape special characters in the filter value when operator is taken as a literal filter term. 

#### Cons

- More work on server side to parse and group the filters. Custom URL parameter binder or parser to split the query string key into two components (field name, operator) may be needed
- Special characters in variable names can be awkward. Custom binder to split the query string key into two components may be needed
- Hard to manage custom combinational filters since there is an implicit AND among filters. How to manage OR filters?

### RHS Colon

Retrieves all the items where the price is greater than or equal to 10, but less than or equal to 100

`GET /items??price=gte:10&price=lte:100`

#### Pros

- Easiest to parse on server side especially if duplicate filters are not supported. 
  - No custom binders needed. 
  - Many API frameworks already handle URL parameter arrays. 
  - Multiple price filters will be under the same variable ‘price’ which may be a Sequence or Map. 

#### Cons

Literal values need special handling.

Retrieve all items where the user_id is greater than 100. 

`GET /items?user_id=gt:100 `

However, if `gt:100` was a valid id, we could not find the items where the `user_id` equals `gt:100`

### Search query param

Retrieves all the items containing the terms red chair and the price is greater than or equal to 10 and less than or equal to 100

`GET /items?q=title:red chair AND price:[10 TO 100]`

- Adding filters and ranges with the search parameter
  - Lucene syntax or ElasticSearch Simple Query Strings would be easy to support directly - if needed.

#### Pros

- Most flexible queries for API users
- Almost no parsing required on backend, can pass directly to search engine or database

#### Cons

- Harder for beginners (Lucene syntax)
- Full-text search doesn’t make sense for all resources. E.g. Fuzziness and term boosting doesn’t make sense for time series metric data.
- Requires URL percent encoding i.e. use of cURL or Postman becomes more complicated.

---

## Updating resources

**Decision: Use PATCH and json-patch**

### Patch

When deciding on the update strategy of resources in our API we took into consideration two different proposals for sending updates: Payload comparison

The key reasons were:

- Wikidata works with large JSON objects
- json-patch Allows appending to arrays

Payload comparison: https://www.notion.so/Payload-Examples-1cbe38a24f8044fba18d107d390b97fb

#### RFC 6902 (json-patch+json)

- More php tooling and support (not extremely popular or regularly updated but it is an old RFC):
  - github.com/mikemccabe/json-patch-php
  - github.com/swaggest/json-diff 
- Explicit approach with predefined available actions
- Allows appending to arrays
- Multiple operations are performed by sending an array of “operation” objects

#### RFC 7396 (merge-patch+json)

- Straightforward, minimal verbosity
- Removal is “implicit”
  - i.e. by sending a key with a `null` value
- No support for extending array values 
  - i.e. arrays must be fully replaced
- PHP tooling seems to be scarce and mostly abandoned
- Multiple operations are performed by sending one “update” object

---

## Entities + Statements

**Decision: Statements would be exposed both within an entity and also at the top level**

Considered options:

- For the statements with a GUID:
  - Should we address those always through entities?
    - longer path
    - the entity id is already in the path and the prefix is redundant
- Or individually, through a /statements path? 

Usefulness (end users) Vs. cost of ownership (devs)

### Notes

The current Action API allows you to get a statement with only the GUID (without the entity id prefix) with no extra work

Not having a top level statement endpoint would mean that “extra work” would be needed by the client in order to access a statement (splitting the statement ID)

Taking this into account we can cover all of our existing APIs with REST APIs only if we do have statements as a top level api module.

---

## RevisionIds (Path? Query?)

**Decision: We will not worry about revisionids in paths, as the current API doesn't expose them and per core behaviour this should probably be left for the revisions endpoint**

Both choices seem to be okay according to stackoverflow https://stackoverflow.com/a/12737540/4746236

Mediawiki core REST API only has revisionid when looking specifically at revisions (not pages) https://www.mediawiki.org/wiki/API:REST_API

- In the query:
  - Drupal https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/revisions
- In the Path:
  - Wikimedia (RestBase) https://en.wikipedia.org/api/rest_v1/#/Page%20content/getFormatRevision
  - Wordpress https://developer.wordpress.org/rest-api/reference/page-revisions/#retrieve-a-page-revision

---

## Conditional Requests

**Decision: We will initially implement conditional requests for GETs (consistent with MediaWiki core). We are undecided around conditional requests for edits and for now and have aligned with MediaWiki core not using headers for edit requests, instead returning a revision id in the payload.**

- TL;DR use HTTP spec to prevent the “lost update problem”
- MediaWiki core REST API makes use of conditional requests for GETs.
- ETag + HTTP 409 CONFLICT
- Preconditions in headers
  - If-Match
  - If-Unmodified-Since
- Should happen for all sub-paths of entities (which all rely on entity state)
- (Possibly even require it via HTTP 428 PRECONDITION REQUIRED)

Sources:

- https://api.wikimedia.org/wiki/Documentation/Best_practices/Conditional_requests
- https://dzone.com/articles/concurrency-control-in-rest-api-with-spring-framew
- https://www.novatec-gmbh.de/en/blog/managing-concurrency-in-a-distributed-restful-environment-with-spring-boot-and-angular2/

---

## Resources in Plural vs Singular

**Decision: Plural for everything. For consistency's sake.**

We want to [prevent a dispute](./PRINCIPLES.md#Plurality) where there does not seem to be a "right" or "wrong". A topic into which energy would be better invested is the [linking between resources in responses](./SCOPE.md#response-links) which is related in that it would absolve the clients from "thinking about" and processing the URIs for the most part.

- “Plurals denote collection resources.”
- “Neither way is right or wrong, go with what you like best.” 
- MediaWiki core REST API doesn’t appear to use plurals everywhere, `/page/{title}/links/language`
- Wikimedia (“restbase”) API has a mix
  - `/page/html/{title}/{revision}`
  - `/page/segments/{title}/{revision}`

Sources:

- https://restfulapi.net/rest-api-design-tutorial-with-example/
- https://restapitutorial.com/lessons/restquicktips.html
- https://stackoverflow.com/questions/6845772/rest-uri-convention-singular-or-plural-name-of-resource-while-creating-it/6846057#6846057

## Indexed collections

In the wikibase action API, e.g. `wbgetentities`, the returned entity collection is structured as a map, indexed by entity ids. This can speed up retrieval of specific, known entities.

We considered this behavior for this API entity collection end points as well. However, the argument was brought forward that this could conflict with the need of ordered results on these end points (see [Filtering rows](#filtering-rows)). We deferred further discussions at this point with a note that requests for specific entities best should be performed against the individual resource, with a reference to the possibility to mitigate possibly resulting performance concerns (a notorious reason to group requests against certain know entities into one request) [on other layers](https://developers.google.com/web/fundamentals/performance/http2#request_and_response_multiplexing).
