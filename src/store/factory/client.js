import Client from '@liquality/client'

import BitcoinSwapProvider from '@liquality/bitcoin-swap-provider'
import BitcoinJsWalletProvider from '@liquality/bitcoin-js-wallet-provider'
import BitcoinEsploraApiProvider from '@liquality/bitcoin-esplora-api-provider'
import BitcoinEsploraSwapFindProvider from '@liquality/bitcoin-esplora-swap-find-provider'

import EthereumRpcProvider from '@liquality/ethereum-rpc-provider'
import EthereumJsWalletProvider from '@liquality/ethereum-js-wallet-provider'
import EthereumSwapProvider from '@liquality/ethereum-swap-provider'
import EthereumScraperSwapFindProvider from '@liquality/ethereum-scraper-swap-find-provider'

import EthereumErc20Provider from '@liquality/ethereum-erc20-provider'
import EthereumErc20SwapProvider from '@liquality/ethereum-erc20-swap-provider'
import EthereumErc20ScraperSwapFindProvider from '@liquality/ethereum-erc20-scraper-swap-find-provider'

import BitcoinNetworks from '@liquality/bitcoin-networks'
import EthereumNetworks from '@liquality/ethereum-networks'

const rpc = {
  BTC: {
    bitcoin: ['https://blockstream.info/api', 2],
    bitcoin_testnet: ['https://blockstream.info/testnet/api', 2]
  },
  ETH: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'],
    rinkeby: ['https://rinkeby.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  },
  DAI: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  },
  USDC: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  }
}

const networks = {
  BTC: BitcoinNetworks,
  ETH: EthereumNetworks,
  DAI: EthereumNetworks,
  USDC: EthereumNetworks
}

const RpcProviders = {
  BTC: BitcoinEsploraApiProvider,
  ETH: EthereumRpcProvider,
  DAI: EthereumRpcProvider,
  USDC: EthereumRpcProvider
}

const JsWalletProviders = {
  BTC: BitcoinJsWalletProvider,
  ETH: EthereumJsWalletProvider,
  DAI: EthereumJsWalletProvider,
  USDC: EthereumJsWalletProvider
}

const SwapProviders = {
  BTC: BitcoinSwapProvider,
  ETH: EthereumSwapProvider,
  DAI: EthereumErc20SwapProvider,
  USDC: EthereumErc20SwapProvider
}

const AdditionalSwapProviders = {
  BTC: BitcoinEsploraSwapFindProvider,
  ETH: EthereumScraperSwapFindProvider,
  DAI: EthereumErc20ScraperSwapFindProvider,
  USDC: EthereumErc20ScraperSwapFindProvider
}

const ERC20 = {
  DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
}

export const NetworkAssets = {
  mainnet: ['BTC', 'ETH', 'DAI', 'USDC'],
  testnet: ['BTC', 'ETH']
}

export const createClient = (network, mnemonic) => {
  const isTestnet = network === 'testnet'

  const NetworkArgs = {
    BTC: isTestnet ? 'bitcoin_testnet' : 'bitcoin',
    ETH: isTestnet ? 'rinkeby' : 'mainnet',
    DAI: isTestnet ? 'rinkeby' : 'mainnet',
    USDC: isTestnet ? 'rinkeby' : 'mainnet'
  }

  const SwapArgs = {
    BTC: [{ network: networks.BTC[NetworkArgs.BTC] }, 'p2wsh'],
    ETH: [],
    DAI: [],
    USDC: []
  }

  const AdditionalSwapArgs = {
    BTC: rpc.BTC[NetworkArgs.BTC],
    ETH: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'],
    DAI: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'],
    USDC: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api']
  }

  return NetworkAssets[network].map(asset => {
    const client = new Client()

    client.addProvider(new RpcProviders[asset](
      ...rpc[asset][NetworkArgs[asset]]
    ))

    client.addProvider(new JsWalletProviders[asset](
      networks[asset][NetworkArgs[asset]],
      mnemonic
    ))

    if (ERC20[asset]) {
      client.addProvider(new EthereumErc20Provider(ERC20[asset]))
    }

    client.addProvider(new SwapProviders[asset](
      ...SwapArgs[asset]
    ))

    client.addProvider(new AdditionalSwapProviders[asset](
      ...AdditionalSwapArgs[asset]
    ))

    return {
      asset,
      client
    }
  }).reduce((acc, { asset, client }) => {
    acc[asset] = client

    return acc
  }, {})
}