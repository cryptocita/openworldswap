import { Ifo, isCrossChainIfoSupportedOnly } from '@pancakeswap/ifos'
import { useMemo } from 'react'

import { useFetchIfo } from 'state/pools/hooks'
import useGetPublicIfoV7Data from 'views/Ifos/hooks/v7/useGetPublicIfoData'
import useGetWalletIfoV7Data from 'views/Ifos/hooks/v7/useGetWalletIfoData'

import IfoContainer from './components/IfoContainer'
import { IfoCurrentCard } from './components/IfoFoldableCard'
import IfoSteps from './components/IfoSteps'
import { useICakeBridgeStatus } from './hooks/useIfoCredit'

interface TypeProps {
  activeIfo: Ifo
}

const CurrentIfo: React.FC<React.PropsWithChildren<TypeProps>> = ({ activeIfo }) => {
  useFetchIfo()
  const publicIfoData = useGetPublicIfoV7Data(activeIfo)
  const walletIfoData = useGetWalletIfoV7Data(activeIfo)
  const { hasBridged, sourceChainCredit, srcChainId, destChainCredit } = useICakeBridgeStatus({
    ifoChainId: activeIfo.chainId,
    ifoAddress: activeIfo.address,
  })
  const isCrossChainIfo = useMemo(() => isCrossChainIfoSupportedOnly(activeIfo.chainId), [activeIfo.chainId])

  const { poolBasic, poolUnlimited } = walletIfoData

  const isCommitted = useMemo(
    () =>
      poolBasic?.amountTokenCommittedInLP.isGreaterThan(0) || poolUnlimited.amountTokenCommittedInLP.isGreaterThan(0),
    [poolBasic?.amountTokenCommittedInLP, poolUnlimited.amountTokenCommittedInLP],
  )

  return (
    <IfoContainer
      ifoAddress={activeIfo.address}
      ifoBasicSaleType={publicIfoData?.poolBasic?.saleType}
      ifoSection={<IfoCurrentCard ifo={activeIfo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />}
      ifoSteps={
        <IfoSteps
          sourceChainIfoCredit={sourceChainCredit}
          dstChainIfoCredit={destChainCredit}
          srcChainId={srcChainId}
          ifoChainId={activeIfo.chainId}
          isLive={publicIfoData.status === 'live'}
          isFinished={publicIfoData.status === 'finished'}
          hasClaimed={poolBasic?.hasClaimed || poolUnlimited.hasClaimed}
          isCommitted={isCommitted}
          ifoCurrencyAddress={activeIfo.currency.address}
          isCrossChainIfo={isCrossChainIfo}
          hasBridged={hasBridged}
        />
      }
    />
  )
}

export default CurrentIfo
