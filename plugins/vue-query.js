import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from 'vue-query'

import { useState } from '#app'

export default defineNuxtPlugin((nuxt) => {
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  })
  const options = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)
  const vueQueryClient = useState('vue-query')

  if (process.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryClient.value = dehydrate(queryClient)
    })
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryClient.value)
    })
  }
})
