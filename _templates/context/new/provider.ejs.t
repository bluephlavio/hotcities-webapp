---
to: contexts/<%= name %>/<%= h.inflection.titleize(name) %>Provider.js
---
import React from "react"
import <%= h.inflection.titleize(name) %>Context from "./<%= h.inflection.titleize(name) %>Context"

const <%= h.inflection.titleize(name) %>Provider = ({ children }) => {

    return (
        <<%= h.inflection.titleize(name) %>Context.Provider value={{}}>{children}</<%= h.inflection.titleize(name) %>Context.Provider>
    )
}

export const provide<%= h.inflection.titleize(name) %>Context = (Component) =>
  ({ ...props }) =>
    (
      <<%= h.inflection.titleize(name) %>Provider>
        <Component {...props} />
      </<%= h.inflection.titleize(name) %>Provider>
    );

export default <%= h.inflection.titleize(name) %>Provider