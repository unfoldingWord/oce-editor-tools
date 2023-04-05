import React, {
  createContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { Proskomma } from 'proskomma-core'

import { unique } from 'shorthash'

export const LocalPkCacheContext = createContext({})

export default function PkCacheProvider({ children }) {
  const [pkCache,setPkCache] = useState({})
  const [epCache,setEpCache] = useState({})
  // eslint-disable-next-line 
  const [pk,setProskomma] = useState(new Proskomma([
    {
      name: "repoIdStr",
      type: "string",
      regex: /^[^\s\\]+$/
    }
  ]))

  const getRepoUID = (repoIdStr,langIdStr) => {
    // add some random characters in order to work also for empty props
    return unique(`${repoIdStr}${langIdStr}eOIruhAO!#Sdif`)
  }

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
      getRepoUID
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
