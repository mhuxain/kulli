import { boot } from 'quasar/wrappers'
import QxSelect from 'src/components/crud/QxSelect.vue'
import QxDate from 'src/components/crud/QxDate.vue'

export default boot(({ app }) => {

    app.component('qx-select', QxSelect)
    app.component('qx-date', QxDate)

})

