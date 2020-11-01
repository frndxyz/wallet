import Client from '@wagerr-wdk/client'

import WagerrSwapProvider from '@wagerr-wdk/wagerr-swap-provider'
import WagerrJsWalletProvider from '@wagerr-wdk/wagerr-js-wallet-provider'
import WagerrEsploraApiProvider from '@wagerr-wdk/wagerr-esplora-api-provider'
import WagerrEsploraSwapFindProvider from '@wagerr-wdk/wagerr-esplora-swap-find-provider'
import WagerrEarnFeeProvider from '@wagerr-wdk/wagerr-earn-fee-provider'
import WagerrRpcFeeProvider from '@wagerr-wdk/wagerr-rpc-fee-provider'

import EthereumRpcProvider from '@wagerr-wdk/ethereum-rpc-provider'
import EthereumJsWalletProvider from '@wagerr-wdk/ethereum-js-wallet-provider'
import EthereumSwapProvider from '@wagerr-wdk/ethereum-swap-provider'
import EthereumScraperSwapFindProvider from '@wagerr-wdk/ethereum-scraper-swap-find-provider'
import EthereumGasStationFeeProvider from '@wagerr-wdk/ethereum-gas-station-fee-provider'
import EthereumRpcFeeProvider from '@wagerr-wdk/ethereum-rpc-fee-provider'

import EthereumErc20Provider from '@wagerr-wdk/ethereum-erc20-provider'
import EthereumErc20SwapProvider from '@wagerr-wdk/ethereum-erc20-swap-provider'
import EthereumErc20ScraperSwapFindProvider from '@wagerr-wdk/ethereum-erc20-scraper-swap-find-provider'

import WagerrNetworks from '@wagerr-wdk/wagerr-networks'
import EthereumNetworks from '@wagerr-wdk/ethereum-networks'

const rpc = {
  WGR: {
    wagerr: ['https://explorer.wagerr.com/api', WagerrNetworks.wagerr, 2],
    wagerr_testnet: ['https://explorer2.wagerr.com/api', WagerrNetworks.wagerr_testnet, 2]
  },
  ETH: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'],
    rinkeby: ['https://rinkeby.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  },
  DAI: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'],
    rinkeby: ['https://rinkeby.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  },
  USDC: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  },
  USDT: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  },
  WBTC: {
    mainnet: ['https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f']
  }
}

const networks = {
  WGR: WagerrNetworks,
  ETH: EthereumNetworks,
  DAI: EthereumNetworks,
  USDC: EthereumNetworks,
  USDT: EthereumNetworks,
  WBTC: EthereumNetworks
}

const RpcProviders = {
  WGR: WagerrEsploraApiProvider,
  ETH: EthereumRpcProvider,
  DAI: EthereumRpcProvider,
  USDC: EthereumRpcProvider,
  USDT: EthereumRpcProvider,
  WBTC: EthereumRpcProvider
}

const JsWalletProviders = {
  WGR: WagerrJsWalletProvider,
  ETH: EthereumJsWalletProvider,
  DAI: EthereumJsWalletProvider,
  USDC: EthereumJsWalletProvider,
  USDT: EthereumJsWalletProvider,
  WBTC: EthereumJsWalletProvider
}

const SwapProviders = {
  WGR: WagerrSwapProvider,
  ETH: EthereumSwapProvider,
  DAI: EthereumErc20SwapProvider,
  USDC: EthereumErc20SwapProvider,
  USDT: EthereumErc20SwapProvider,
  WBTC: EthereumErc20SwapProvider
}

const AdditionalSwapProviders = {
  WGR: WagerrEsploraSwapFindProvider,
  ETH: EthereumScraperSwapFindProvider,
  DAI: EthereumErc20ScraperSwapFindProvider,
  USDC: EthereumErc20ScraperSwapFindProvider,
  USDT: EthereumErc20ScraperSwapFindProvider,
  WBTC: EthereumErc20ScraperSwapFindProvider
}

const FeeProviders = {
  WGR: {
    wagerr: WagerrEarnFeeProvider,
    wagerr_testnet: WagerrRpcFeeProvider
  },
  ETH: {
    mainnet: EthereumGasStationFeeProvider,
    rinkeby: EthereumRpcFeeProvider
  },
  DAI: {
    mainnet: EthereumGasStationFeeProvider,
    rinkeby: EthereumRpcFeeProvider
  },
  USDC: {
    mainnet: EthereumGasStationFeeProvider,
    rinkeby: EthereumRpcFeeProvider
  },
  USDT: {
    mainnet: EthereumGasStationFeeProvider,
    rinkeby: EthereumRpcFeeProvider
  },
  WBTC: {
    mainnet: EthereumGasStationFeeProvider,
    rinkeby: EthereumRpcFeeProvider
  }
}

const ERC20 = {
  DAI: {
    mainnet: '0x6b175474e89094c44da98b954eedeac495271d0f',
    rinkeby: '0xcE2748BE67fB4346654B4500c4BB0642536365FC'
  },
  USDC: {
    mainnet: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  },
  USDT: {
    mainnet: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  },
  WBTC: {
    mainnet: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  }
}

export const NetworkAssets = {
  mainnet: ['WGR', 'ETH', 'DAI', 'USDC', 'USDT', 'WBTC'],
  testnet: ['WGR', 'ETH', 'DAI']
}

export const createClient = (network, mnemonic) => {
  const isTestnet = network === 'testnet'

  const NetworkArgs = {
    WGR: isTestnet ? 'wagerr_testnet' : 'wagerr',
    ETH: isTestnet ? 'rinkeby' : 'mainnet',
    DAI: isTestnet ? 'rinkeby' : 'mainnet',
    USDC: isTestnet ? 'rinkeby' : 'mainnet',
    USDT: isTestnet ? 'rinkeby' : 'mainnet',
    WBTC: isTestnet ? 'rinkeby' : 'mainnet'
  }

  const SwapArgs = {
    WGR: [networks.WGR[NetworkArgs.WGR], 'p2wsh'],
    ETH: [],
    DAI: [],
    USDC: [],
    USDT: [],
    WBTC: []
  }

  const AdditionalSwapArgs = {
    WGR: rpc.WGR[NetworkArgs.WGR],
    ETH: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'],
    DAI: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'],
    USDC: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'],
    USDT: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'],
    WBTC: [isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api']
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

    if (ERC20[asset] && ERC20[asset][NetworkArgs[asset]]) {
      client.addProvider(new EthereumErc20Provider(ERC20[asset][NetworkArgs[asset]]))
    }

    client.addProvider(new SwapProviders[asset](
      ...SwapArgs[asset]
    ))

    client.addProvider(new AdditionalSwapProviders[asset](
      ...AdditionalSwapArgs[asset]
    ))

    client.addProvider(new FeeProviders[asset][NetworkArgs[asset]]())

    return {
      asset,
      client
    }
  }).reduce((acc, { asset, client }) => {
    acc[asset] = client

    return acc
  }, {})
}
