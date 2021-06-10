import { boot } from 'quasar/wrappers'
import api from '../store/api.js'

export default boot(({ app }) => {

  // now you can use this.$api in components to call the crudApi
  app.config.globalProperties.$api = api

})

export { api }
