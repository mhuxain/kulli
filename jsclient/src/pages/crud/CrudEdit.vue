<template>
<q-page class="q-pa-md">
  <q-card class="q-pa-md">
    <!-- form title -->

    <div class="q-my-md row">
      <div class="text-h6"> Edit {{ titleCase(resName) }}</div>
      <q-space />
      <q-btn round flat icon="mdi-refresh" @click="setEditObject(id)"></q-btn>
      <q-btn round flat icon="mdi-close" @click="resource = {} && $router.go(-1)"></q-btn>
    </div>
    

    <add-edit-form
      :resName="this.resName" v-model="formData"
    ></add-edit-form>

    <!-- form actions -->
    <div class="q-my-md row">
      <q-btn @click="$api(this.resName).update(formData).then(() => $router.go(-1))" color="green">Save</q-btn>
    </div>

    <!-- just showing output -->
    <div class="row">
    <pre class="col-6" style="font-family:inherit; ">{{ formData }}</pre>
    <pre class="col-6" style="font-family:inherit; ">{{  this.$api(this.resName).findById(id) }}</pre>
    </div>

  </q-card>
</q-page>
</template>

<script>

import AddEditForm from 'src/components/crud/AddEditForm.vue';
const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1)
export default {
  name: "crudEdit",
  components: {
    AddEditForm,
  },
  data: () => ({
    formData: {
    }
  }),
  computed: {
    resName() {
      return  this.$route.params.resName;;
    },
    id() {
      return this.$route.params["id"];
    },
    titleCase() {
      return titleCase
    },

  },
  methods: { 
    async setEditObject(value) {
      this.formData = Object.assign({}, await this.$api(this.resName).get(value)) ?? {};
    }
  },
  watch: {
    id:  {
      handler: async function(value) {
        if(value) {
          await this.setEditObject(value);
        }
      },
      immediate: true
      
    }
  }
};
</script>

<style>

</style>
