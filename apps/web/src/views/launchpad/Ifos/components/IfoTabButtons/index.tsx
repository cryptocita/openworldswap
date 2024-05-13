import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`

const IfoTabButtons = () => {
  // const { url, isExact } = useRouteMatch()
  /* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
  // const pathname = location.pathname
  const router = useRouter()
  const isExact = router.route === '/launchpad'

  let tabIndex = 0
  if (isExact) {
    tabIndex = 0
  } else {
    tabIndex = 1
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={tabIndex} scale="sm" variant="subtle">
        <ButtonMenuItem as={NextLinkFromReactRouter} to="/launchpad">
          Latest
        </ButtonMenuItem>
        <ButtonMenuItem as={NextLinkFromReactRouter} to="/launchpad/history">
          Finished
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default IfoTabButtons
