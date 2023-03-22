import React, {
  createContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { Proskomma } from 'proskomma-core'

export const LocalPkCacheContext = createContext({})

export default function PkCacheProvider({ children }) {
  const [pkCache,setPkCache] = useState({})
  const [epCache,setEpCache] = useState({})
  // eslint-disable-next-line 
  const [pk,setProskomma] = useState(new Proskomma([
    {
      name: "org",
      type: "string",
      regex: "^[^\\s]+$"
    },
    {
      name: "lang",
      type: "string",
      regex: "^[^\\s]+$"
    },
    {
      name: "abbr",
      type: "string",
      regex: "^[^\\s]+$"
    },
  ]))

  // create the value for the context provider
  const context = {
    state: {
      pkCache,
      epCache,
      pk,
    },
    actions: {
      setPkCache,
      setEpCache,
    },
  }

  return (
    <LocalPkCacheContext.Provider value={context}>
      {children}
    </LocalPkCacheContext.Provider>
  )
}

PkCacheProvider.propTypes = {
  /** Children to render inside of Provider */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
