// import { createContext, useContext, useState } from 'react'

// export const IfoContext = createContext(null)

// export function useConfig() {
//   return useContext(IfoContext)
// }

// export default function IfoProvider({ children }) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   return <IfoContext.Provider value={{ isExpanded, setIsExpanded }}>{children}</IfoContext.Provider>
// }

import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

export type IfoContextState = {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}
export const IfoContext = createContext<IfoContextState | null>(null)

export function useConfig() {
  const ctx = useContext(IfoContext)

  if (!ctx) {
    throw new Error('useConfig must be used within a IfoProvider')
  }

  return ctx
}

export default function IfoProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const providerValue = useMemo(() => ({ isExpanded, setIsExpanded }), [isExpanded])

  return <IfoContext.Provider value={providerValue}>{children}</IfoContext.Provider>
}
