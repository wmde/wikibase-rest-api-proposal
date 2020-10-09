# Gotchas

Known quirks which may cause confusion and which we may have to iterate on.

## Qualifier and Reference hashes

Qualifiers and References bear a hash computed from their properties. This hash is, in line with current common practice in wikibase, also used to identify the respective resource (e.g. `/statements/{statement_id}/qualifiers/{qualifier_hash}`). This poses a challenge upon data update - the hash changes which in turn renders the previous URI invalid.
