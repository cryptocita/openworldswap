import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Page from 'components/Layout/Page'
// import PageHeader from 'components/PageHeader'
import { Flex, Heading, PageHeader } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { safeGetAddress } from 'utils'
import { BANSHEES_REFER_KEY, ICO_REFER_KEY } from './types'
// import { isAddress } from 'utils'
import IfoTabButtons from './components/IfoTabButtons'
import IfoProvider from './contexts/IfoContext'

export const IfoPageLayout = ({ children }) => {
  const { t } = useTranslation()
  const { query: urlQuery } = useRouter()

  useEffect(() => {
    const refAccount = safeGetAddress(urlQuery?.ref)
    if (refAccount) {
      localStorage.setItem(ICO_REFER_KEY, refAccount)
    }
  }, [urlQuery])

  return (
    <IfoProvider>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Launchpad')}
            </Heading>
            <Heading scale="lg" color="text">
              {t('Buy new tokens with a brand new token sale model.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Container>
          {/* <SubMenuItems
            items={[
              {
                label: t('Latest'),
                href: '/launchpad',
              },
              {
                label: t('Finished'),
                href: '/launchpad/history',
              },
            ]}
            activeItem={isExact ? '/launchpad' : '/launchpad/history'}
          /> */}
          <IfoTabButtons />
          {children}
        </Container>
      </Page>
    </IfoProvider>
  )
}

export const BansheesIfoPageLayout = ({ children }) => {
  const { t } = useTranslation()
  const { query: urlQuery } = useRouter()

  useEffect(() => {
    const refAccount = safeGetAddress(urlQuery?.ref as string)
    if (refAccount) {
      localStorage.setItem(BANSHEES_REFER_KEY, refAccount)
    }
  }, [urlQuery])

  return (
    <IfoProvider>
      {/* <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]} alignItems="center">
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('$HITCOIN ICO')}
            </Heading>
            <Heading scale="md" color="text" textAlign="center" style={{ maxWidth: '800px', lineHeight: '1.8rem' }}>
              HITCOIN is the lifeblood of the Banshees ecosystem, a potent ERC721 token residing on the Polygon network.
              Holding HITCOIN means you are in the game to win, and anyone else is simply out of luck in this
              high-stakes BLCK MRKT.
            </Heading>
          </Flex>
        </Flex>
      </PageHeader> */}
      <Page>
        <Container>{children}</Container>
      </Page>
    </IfoProvider>
  )
}
