
export interface TokenCreationProps {
  name: string
  symbol: string
  marketingWallet: string
  decimals: string
  buyTax: string
  sellTax: string
  transferTax: string
  totalSupply: string
  txLimit: string
  holdLimit: string
}

export const MAX_TAX = 30
export const MAX_TX_AMOUNT_MIN_LIMIT = 0.01
export const MAX_HOLD_AMOUNT_MIN_LIMIT = 0.02
