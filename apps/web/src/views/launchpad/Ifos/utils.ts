import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

export const formatBigNumber = (number: BigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(BigNumber.from(10).pow(decimals - displayDecimals))
  return formatUnits(number.sub(remainder), decimals)
}
