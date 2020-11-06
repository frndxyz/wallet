import Vue from 'vue'
import VueRouter from 'vue-router'

import Splash from '@/views/Splash.vue'
import OnboardingPassword from '@/views/Onboarding/OnboardingPassword.vue'
import ImportWallet from '@/views/ImportWallet.vue'
import UnlockWallet from '@/views/UnlockWallet.vue'
import BackupWallet from '@/views/BackupWallet.vue'
import Wallet from '@/views/Wallet.vue'
import Account from '@/views/Account.vue'
import TransactionDetails from '@/views/TransactionDetails.vue'
import Send from '@/views/Send.vue'
import Receive from '@/views/Receive.vue'
import Swap from '@/views/Swap.vue'

import ManageAssets from '@/views/ManageAssets'

import Enable from '@/views/Enable.vue'
import Permission from '@/views/Permission.vue'

Vue.use(VueRouter)

const routes = [
   // Onboarding
  {
    path: '/',
    component: Splash
  },
  {
    name: 'OnboardingPassword',
    path: '/onboarding/password',
    component: OnboardingPassword,
    props: true
  },
  {
    path: '/onboarding/import',
    component: ImportWallet
  },
  {
    path: '/open',
    component: UnlockWallet
  },
  {
    path: '/backup',
    component: BackupWallet
  },
   // Onboarding

   // Settings
   {
    path: '/settings/manage-assets',
    component: ManageAssets
  },
  // Settings

  // Wallet
  {
    path: '/wallet',
    component: Wallet
  },
  {
    name: 'Account',
    path: '/account/:asset',
    component: Account,
    props: true
  },
  {
    name: 'Transaction',
    path: '/tx/:id',
    component: TransactionDetails,
    props: true
  },
  {
    path: '/account/:asset/send',
    component: Send,
    props: true
  },
  {
    path: '/account/:asset/receive',
    component: Receive,
    props: true
  },
  {
    path: '/account/:asset/swap',
    component: Swap,
    props: true
  },
  // Wallet

   // Injection
  {
    path: '/enable',
    component: Enable
  },
  {
    path: '/permission',
    component: Permission
  }
  // Injection
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
