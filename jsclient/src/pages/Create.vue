<template>
<q-page class="q-pa-md">
  <q-card class="q-pa-md">
    <v-toolbar color="blue-grey lighten-5" :flat="true" dense>
      <v-toolbar-title> Add {{ titleCase(resName) }}</v-toolbar-title>
      <v-toolbar-items>
      </v-toolbar-items>  
    </v-toolbar>

    <!-- <add-edit-form v-if="resName" :resName="resName"></add-edit-form> -->
    <q-input label="Name" :rules="[]" />
    <qx-select 
      label="Island"
      v-model="selected2" 
      :options="['red', 'orange', 'blue']" 
      :optionsUrl="'/api/islands'" 
      :optionValue="'id'" 
      :optionLabel="'name'"
    ></qx-select>
    <qx-select label="Color" v-model="selected" :options="['red', 'orange', 'blue']"></qx-select>
    <qx-date label="Date of Birth" v-model="date1"></qx-date>



  </q-card>
</q-page>
</template>

<script>
// import AddEditForm from "../components/crud/AddEditForm.vue"
import QxSelect from "../components/crud/QxSelect.vue"
import QxDate from 'src/components/crud/QxDate.vue';
const ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)
export default {
  components: {
    QxSelect,
    QxDate,
    QxDate,
  },
  data: () => ({
    model: 3,
    selected: '',
    selected2: '',
    date1: '',
  }),
  computed: {
    resName() {
      return this.$route.params["resName"] || 'create';
    },
    titleCase() {
      return (string) => ucfirst(string)
    }
  },
  watch: {
    resName() {
      this.$api(this.resName).fetch();

      this.$api('articles').create(this.article)
    }
  }
};
</script>

<style>
.full-height .v-data-table__wrapper {
  
}

.row-actions {
  display: flex;
}
</style>
