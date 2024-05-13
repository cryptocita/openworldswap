import { SUPPORT_LAUNCHPAD } from 'config/constants/supportChains'
import { IfoPageLayout } from '../../views/launchpad/Ifos'
import PastIfo from '../../views/launchpad/Ifos/PastIfo'

const PastIfoPage = () => {
  return <PastIfo />
}

PastIfoPage.Layout = IfoPageLayout
PastIfoPage.chains = SUPPORT_LAUNCHPAD

export default PastIfoPage
