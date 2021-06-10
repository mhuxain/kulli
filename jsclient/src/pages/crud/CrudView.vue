<template>
  <q-page class="q-pa-md">
    <q-card>
      <table class="q-table">
        <tr v-for="field, key in item" :key="key">
          <td>{{key}}</td>
          <td>{{field}}</td>
        </tr>
      </table>
    </q-card>
    
  </q-page>
</template>

<script>
import FullHeightList from 'src/components/crud/FullHeightList.vue'
export default {
  name:'crudList',
  components: {  },
  data: () => ({
    item: {},
  }),
  computed: {
    resName() {
      return this.$route.params["resName"];
    },
    
  },
  mounted() {
    
       this.$api(this.resName).get(this.$route.params.id).then(data => this.item = data)
    
  }
}
</script>
<style lang="scss">
  
</style>
