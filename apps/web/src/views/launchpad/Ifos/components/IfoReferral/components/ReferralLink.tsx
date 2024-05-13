import { useTranslation } from '@pancakeswap/localization'
import { Box, CopyButton, Flex, FlexProps } from '@pancakeswap/uikit'
// import { CopyButton } from 'components/CopyButton'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface ReferralLinkProps extends FlexProps {
  account: string
  chainId: number
}

const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
  box-shadow: inset 0px 0px 3px 2px #eaeaf1;
`

const Address = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-weight: 600;
    font-size: 16px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }

    ${({ theme }) => theme.mediaQueries.sm} {
      width: 300px;
    }
  }

  &:after {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.background}00,
      ${({ theme }) => theme.colors.background}E6
    );
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`

const ReferralLink: React.FC<React.PropsWithChildren<ReferralLinkProps>> = ({ account, chainId, ...props }) => {
  const { t } = useTranslation()
  const { pathname, query: urlQuery } = useRouter()

  const referralLink = ``

  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Address title={referralLink}>
          <input type="text" readOnly value={referralLink} />
        </Address>
        <Flex margin="12px">
          <CopyButton width="24px" text={referralLink} tooltipMessage={t('Copied')} />
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default ReferralLink
