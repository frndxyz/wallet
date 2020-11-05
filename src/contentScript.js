import { inject } from './broker/utils'
import Script from './broker/Script'
import { providerManager, ethereumProvider, wagerrProvider } from './inject'

;(new Script()).start()

inject(providerManager)
inject(wagerrProvider)

chrome.storage.local.get(['liquality-wallet'], (storage) => {
  const state = storage['liquality-wallet']
  if (state.injectEthereum) inject(ethereumProvider)
})
