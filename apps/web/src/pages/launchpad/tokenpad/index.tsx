import { SUPPORT_LAUNCHPAD } from 'config/constants/supportChains'
import { TokenpadLayout } from 'views/Tokenpad'
import TokenCreate from 'views/Tokenpad/Create'

const TokenpadPage = () => {
  return <TokenCreate />
}

TokenpadPage.Layout = TokenpadLayout
TokenpadPage.chains = SUPPORT_LAUNCHPAD

export default TokenpadPage
