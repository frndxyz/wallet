import BN from 'bignumber.js'
import cryptoassets from '@wagerr-wdk/cryptoassets'

const DP_UI_MAP = {
  WGR: 6,
  ETH: 6,
  DAI: 6,
  USDC: 6,
  USDT: 6,
  WBTC: 6
}

export const dp = (amount, coin) => {
  if (!amount) return amount

  return BN(amount).dp(cryptoassets[coin].decimals)
}

export const dpUI = (amount, coin) => {
  if (!amount) return amount

  return BN(amount).dp(DP_UI_MAP[coin], BN.ROUND_FLOOR)
}

export const prettyBalance = (amount, coin) => {
  if (!amount) return amount

  amount = cryptoassets[coin].unitToCurrency(amount)

  return dpUI(amount, coin)
}

export const prettyFiatBalance = (amount, rate) => {
  if (!amount) return amount

  const fiatAmount = BN(amount).times(rate)

  return fiatAmount.toFormat(2)
}