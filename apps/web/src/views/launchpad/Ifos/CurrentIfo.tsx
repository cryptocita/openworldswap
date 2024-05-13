import { useTranslation } from '@pancakeswap/localization'
import { BaseLayout, Button, Heading, Text } from '@pancakeswap/uikit'
import ifosConfig from 'config/constants/launchpad'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import styled from 'styled-components'
import IfoCard from './components/IfoCard'
import IfoCardV3 from './components/IfoCard/v3'
import IfoCardV4 from './components/IfoCard/v4'
import IfoCards from './components/IfoCards'
import Title from './components/Title'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const GlassContainer = styled('div')`
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: ${({ theme }) => theme.colors.glass};
  border-radius: 24px;
  border: 1px solid rgb(166 216 157 / 13%);
  padding: 30px;
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const Ifo = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const activeIfos = useMemo(() => {
    return ifosConfig.filter((ifo) => ifo.isActive && ifo.chainId === chainId && ifo.id !== 'banshees-public-sale')
  }, [chainId])

  return (
    <div>
      {activeIfos.length > 0 && (
        // <IfoCards isSingle>
        <IfoCards isSingle>
          {activeIfos.map((ifo) =>
            ifo.version === 3 ? (
              <IfoCardV3 ifo={ifo} />
            ) : ifo.version === 4 ? (
              <IfoCardV4 ifo={ifo} />
            ) : (
              <IfoCard ifo={ifo} />
            ),
          )}
        </IfoCards>
      )}

      {/* <IfoCards isSingle>
        <IfoLanding />
      </IfoCards> */}

      <LaunchIfoCallout>
        <GlassContainer>
          <Title as="h2">{t('How to take part')}</Title>
          <Heading mb="16px">{t('Before Sale')}:</Heading>
          <List>
            <li>{t('Read $OWS tokenomics.')}</li>
            <li>{t('Get $USDT to join the presale.')}</li>
          </List>

          <Heading mb="16px">{t('During Sale')}:</Heading>
          <List>
            <li>{t('While the sale is live, contribute with USDT.')}</li>
          </List>
          <Heading mb="16px">{t('After Sale')}:</Heading>
          <List>
            <li>{t('Claim the tokens you purchased.')}</li>
            <li>{t('Token will be transferred to your wallet.')}</li>
          </List>
          {/* <Text as="div" pt="16px">
            <Button
              as="a"
              variant="secondary"
              href="#"
            >
              {t('Read more')}
            </Button>
          </Text> */}
        </GlassContainer>
        <GlassContainer>
          {/* <Image src="/images/ifos/zombie.png" alt="ifo bunny" width={300} height={150} mt="24px" mb="24px" /> */}
          <div>
            <Title as="h2">{t('Want to run your launchpad with us?')}</Title>
            <Text mb={3}>
              {t(
                'Please contact us if you want to launch your project with OpenWorldSwap, OEX Chain’s first community owned DEX & AMM, to bring your token directly to the most active and rapidly growing community on OEX Chain.',
              )}
            </Text>
            <Button as="a" href="https://discord.gg/" external>
              {t('Apply to launch')}
            </Button>
          </div>
        </GlassContainer>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
