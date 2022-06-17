---
to: contexts/<%= name %>/index.js
---
export { default } from "./<%= h.inflection.titleize(name) %>Context"
export { default as <%= h.inflection.titleize(name) %>Provider, provide<%= h.inflection.titleize(name) %>Context } from "./<%= h.inflection.titleize(name) %>Provider"


