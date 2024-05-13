import { SUPPORT_LAUNCHPAD } from 'config/constants/supportChains'
import { TokenpadLayout } from 'views/Tokenpad'
import TokenManage from 'views/Tokenpad/Manage'

const TokenpadPage = () => {
  return <TokenManage />
}

TokenpadPage.Layout = TokenpadLayout
TokenpadPage.chains = SUPPORT_LAUNCHPAD

export default TokenpadPage
