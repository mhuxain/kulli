<template>
  <q-page class="q-pa-md">
    <full-height-list :resName="resName" :hasItemView="true" table-class="full-height-table" >
    </full-height-list>
    
  </q-page>
</template>

<script>
import FullHeightList from 'src/components/crud/FullHeightList.vue'
export default {
  name:'crudList',
  components: { FullHeightList },
  data: () => ({

  }),
  computed: {
    resName() {
      return this.$route.params["resName"];
    },
  }
}
</script>
<style lang="scss">
  
</style>
