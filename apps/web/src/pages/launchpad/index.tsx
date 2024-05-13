import { SUPPORT_LAUNCHPAD } from 'config/constants/supportChains'
import { IfoPageLayout } from '../../views/launchpad/Ifos'
import Ifo from '../../views/launchpad/Ifos/Ifo'

const CurrentIfoPage = () => {
  return <Ifo />
}

CurrentIfoPage.Layout = IfoPageLayout
CurrentIfoPage.chains = SUPPORT_LAUNCHPAD

export default CurrentIfoPage
