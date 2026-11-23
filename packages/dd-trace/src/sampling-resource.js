'use strict'

// Web spans only get `resource.name` when they finish, but a trace's sampling decision can be made earlier,
// the first time its context is propagated (outbound requests, DBM comments). The web plugin registers a
// provider here so resource-based sampling rules can still see the resource the request is going to get.
// Kept as a leaf module so sampling code does not depend on plugin code.

/** @typedef {import('./opentracing/span')} DatadogSpan */

/** @type {((span: DatadogSpan) => string | undefined) | undefined} */
let provider

/**
 * @param {(span: DatadogSpan) => string | undefined} fn
 */
function setPendingResourceProvider (fn) {
  provider = fn
}

/**
 * @param {DatadogSpan} span
 */
function getPendingResource (span) {
  return provider?.(span)
}

module.exports = { getPendingResource, setPendingResourceProvider }
