import Client from '@wagerr-wdk/client'

import WagerrSwapProvider from '@wagerr-wdk/wagerr-swap-provider'
import WagerrJsWalletProvider from '@wagerr-wdk/wagerr-js-wallet-provider'
import WagerrEsploraBatchApiProvider from '@wagerr-wdk/wagerr-esplora-batch-api-provider'
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

import { isERC20, getErc20ContractAddress } from '../../utils/asset'

export const Networks = ['mainnet', 'testnet']

function createWgrClient (network, mnemonic) {
  const isTestnet = network === 'testnet'

  const wagerrNetwork = isTestnet ? WagerrNetworks.wagerr_testnet : WagerrNetworks.wagerr
  const esploraApi = isTestnet ? 'https://explorer2.wagerr.com/api' : 'https://explorer.wagerr.com/api'
  const batchEsploraApi = isTestnet ? 'https://explorer2.wagerr.com/api' : 'https://explorer.wagerr.com/api'

  const wgrClient = new Client()
  wgrClient.addProvider(new WagerrEsploraBatchApiProvider(batchEsploraApi, esploraApi, network, 2))
  wgrClient.addProvider(new WagerrJsWalletProvider(wagerrNetwork, mnemonic))
  wgrClient.addProvider(new WagerrSwapProvider(wagerrNetwork))
  wgrClient.addProvider(new WagerrEsploraSwapFindProvider(esploraApi))
  if (isTestnet) wgrClient.addProvider(new WagerrRpcFeeProvider())
  else wgrClient.addProvider(new WagerrEarnFeeProvider())

  return wgrClient
}

function createEthClient (asset, network, mnemonic) {
  const isTestnet = network === 'testnet'
  const ethereumNetwork = isTestnet ? EthereumNetworks.rinkeby : EthereumNetworks.mainnet
  const infuraApi = isTestnet ? 'https://rinkeby.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f' : 'https://mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'
  const scraperApi = isTestnet ? 'https://liquality.io/eth-rinkeby-api' : 'https://liquality.io/eth-mainnet-api'

  const ethClient = new Client()
  ethClient.addProvider(new EthereumRpcProvider(infuraApi))
  ethClient.addProvider(new EthereumJsWalletProvider(ethereumNetwork, mnemonic))
  if (isERC20(asset)) {
    const contractAddress = getErc20ContractAddress(asset, network)
    ethClient.addProvider(new EthereumErc20Provider(contractAddress))
    ethClient.addProvider(new EthereumErc20SwapProvider())
    ethClient.addProvider(new EthereumErc20ScraperSwapFindProvider(scraperApi))
  } else {
    ethClient.addProvider(new EthereumSwapProvider())
    ethClient.addProvider(new EthereumScraperSwapFindProvider(scraperApi))
  }
  if (isTestnet) ethClient.addProvider(new EthereumRpcFeeProvider())
  else ethClient.addProvider(new EthereumGasStationFeeProvider())

  return ethClient
}

export const createClient = (asset, network, mnemonic) => {
  if (asset === 'WGR') return createWgrClient(network, mnemonic)

  return createEthClient(asset, network, mnemonic)
}