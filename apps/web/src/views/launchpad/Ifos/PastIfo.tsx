import ifosConfig from 'config/constants/launchpad'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import IfoCard from './components/IfoCard'
// import IfoCardV3 from './components/IfoCard/v3'
// import IfoCardV4 from './components/IfoCard/v4'
import IfoCards from './components/IfoCards'

const PastIfo = () => {
  const { chainId } = useActiveWeb3React()

  const inactiveIfo = useMemo(() => {
    return ifosConfig.filter((ifo) => !ifo.isActive && ifo.chainId === chainId)
  }, [chainId])

  return (
    <IfoCards>
      {inactiveIfo.map((ifo) =>
        ifo.version === 3 ? (
          // <IfoCardV3 key={ifo.id} ifo={ifo} />
          <div />
        ) : ifo.version === 4 ? (
          // <IfoCardV4 key={ifo.id} ifo={ifo} />
          <div />
        ) : (
          <IfoCard key={ifo.id} ifo={ifo} />
        ),
      )}
    </IfoCards>
  )
}

export default PastIfo
