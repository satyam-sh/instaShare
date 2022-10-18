import React from 'react'

const Context = React.createContext({
  searchStatus: false,
  searchFunction: () => {},
  sQuery: '',
  revert: () => {},
})

export default Context
