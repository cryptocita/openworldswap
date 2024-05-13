import { bscTokens } from '@pancakeswap/tokens'

import { useActiveChainId } from 'hooks/useActiveChainId'
import { useFetchIfo } from 'state/pools/hooks'

import ComingSoonSection from './components/ComingSoonSection'
import IfoContainer from './components/IfoContainer'
import IfoSteps from './components/IfoSteps'
import { useICakeBridgeStatus } from './hooks/useIfoCredit'

const SoonIfo = () => {
  useFetchIfo()
  const { chainId } = useActiveChainId()
  const { sourceChainCredit } = useICakeBridgeStatus({
    ifoChainId: chainId,
  })
  return (
    <IfoContainer
      ifoSection={<ComingSoonSection />}
      ifoSteps={
        <IfoSteps
          isLive={false}
          hasClaimed={false}
          isCommitted={false}
          ifoCurrencyAddress={bscTokens.cake.address}
          sourceChainIfoCredit={sourceChainCredit}
        />
      }
    />
  )
}

export default SoonIfo
