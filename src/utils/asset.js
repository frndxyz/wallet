import cryptoassets from '@wagerr-wdk/cryptoassets'

const EXPLORERS = {
  ETH: {
    testnet: 'https://rinkeby.etherscan.io/tx/0x',
    mainnet: 'https://etherscan.io/tx/0x'
  },
  WGR: {
    testnet: 'https://blockstream.info/testnet/tx/',
    mainnet: 'https://blockstream.info/tx/'
  }
}

export const getChainFromAsset = asset => {
  if (['DAI', 'USDC', 'USDT', 'WBTC'].includes(asset)) return 'ETH'

  return asset
}

export const getAssetColorStyle = asset => {
  const assetData = cryptoassets[asset]
  if (assetData.color) return { color: assetData.color }
}

export const getExplorerLink = (hash, asset, network) => {
  const chain = getChainFromAsset(asset)
  return `${EXPLORERS[chain][network]}${hash}`
}
