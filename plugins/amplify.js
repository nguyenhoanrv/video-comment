import { Amplify } from 'aws-amplify'
// import { Translations } from '@aws-amplify/ui-components'
import awsconfig from '~/src/aws-exports'

import AmplifyVue from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    window.global = window
    var exports = {}
  }
  Amplify.configure(awsconfig)

  nuxtApp.vueApp.use(AmplifyVue)
})
