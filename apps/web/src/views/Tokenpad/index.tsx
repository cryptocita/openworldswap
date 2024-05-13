import { useTranslation } from '@pancakeswap/localization'
import { ButtonMenu, ButtonMenuItem, Flex, Heading, PageHeader } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import Page from 'components/Layout/Page'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled from 'styled-components'
import TokenpadProvider from './contexts/TokenpadContext'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`

const TokenpadTabButtons = () => {
  /* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
  const router = useRouter()
  const isExact = router.route === '/launchpad/tokenpad'
  const { t } = useTranslation()
  let tabIndex = 0
  if (isExact) {
    tabIndex = 0
  } else {
    tabIndex = 1
  }

  const subMenuItems = useMemo(
    () => [
      {
        label: t('Create'),
        href: '/launchpad/tokenpad',
      },
      {
        label: t('Manage'),
        href: '/launchpad/tokenpad/manage',
      },
    ],
    [t],
  )

  return (
    // <SubMenuItems items={subMenuItems} activeItem={isExact ? '/launchpad/tokenpad' : '/launchpad/tokenpad/manage'} />

    <Wrapper>
      <ButtonMenu activeIndex={tabIndex} scale="sm" variant="subtle">
        <ButtonMenuItem as={NextLinkFromReactRouter} to="/launchpad/tokenpad">
          Create
        </ButtonMenuItem>
        <ButtonMenuItem as={NextLinkFromReactRouter} to="/launchpad/tokenpad/manage">
          Manage
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export const TokenpadLayout = ({ children }) => {
  const { t } = useTranslation()

  return (
    <TokenpadProvider>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Tokenpad')}
            </Heading>
            <Heading scale="lg" color="text">
              {t('Create new token with your own tokenomics.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Container>
          <TokenpadTabButtons />
          {children}
        </Container>
      </Page>
    </TokenpadProvider>
  )
}
