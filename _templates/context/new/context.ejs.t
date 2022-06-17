---
to: contexts/<%= name %>/<%= h.inflection.titleize(name) %>Context.js
---
import React from "react"

const <%= h.inflection.titleize(name) %>Context = React.createContext()

export default <%= h.inflection.titleize(name) %>Context


