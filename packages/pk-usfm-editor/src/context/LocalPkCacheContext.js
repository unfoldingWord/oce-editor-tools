import React, {
  createContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'

import { useProskomma } from "proskomma-react-hooks";

export const LocalPkCacheContext = createContext({})

export default function PkCacheProvider({ children }) {
  const [pkCache,setPkCache] = useState({})
  const [epCache,setEpCache] = useState({})

  const pkHook = useProskomma({verbose: true})

  // create the value for the context provider
  const context = {
    state: {
      pkCache,
      epCache,
      pkHook,
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
};
