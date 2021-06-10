<template>
<div>
<q-form ref="createEditForm" :style="formStyle">
<div v-for="(field) in formDef" :key="field.id" :style="field.style">
  <div v-if="field.form_input == 'select' && field.name == 'island_id'">
    <div>
        <qx-select
          label="Select atoll"
          v-model="selectedAtoll"
          optionsUrl="/api/atolls?include=islands&sort=id"
          optionValue="code"
          optionLabel="code"
        ></qx-select>
        <qx-select
          optionLabel="name"
          optionValue="id"
          label="Select island"
          :modelValue="formData[field.name]"
          @update:modelValue="emitFormData($event, field.name)"
          :options="atollIslands"
          :emit-value="field.label !== false"
          map-options
        ></qx-select>
    </div>
  </div>
  <qx-select
    :ref="`field`"
    v-else-if="field.form_input == 'select'"
    :label="field.label"
    :emit-value="field.label !== false"
    :modelValue="formData[field.name]"
    @update:modelValue="emitFormData($event, field.name)"
    :optionsUrl="field.inputOptions.itemsUrl"
    :optionValue="field.inputOptions.itemValue"
    :optionLabel="field.inputOptions.itemText"
    :error-messages="validationErrors[field.name]"
    :rules="field.required ? [rules.required] : []"
    map-options
  ></qx-select>
  <q-input
    v-if="['text', 'password', 'textarea', 'email', 'search', 'tel', 'number', 'url'].includes(field.form_input)"
    :label="field.label"
    :modelValue="formData[field.name]"
    @update:modelValue="emitFormData($event, field.name)"
    :error-messages="validationErrors[field.name]"
    :rules="field.required ? [rules.required] : []"
    :type="field.form_input"
  ></q-input>
  <qx-date
    v-if="field.form_input == 'datepicker' && field.name != 'year_month'"
    :label="field.label"
    :min="formData['year_month'] ? formData['year_month'].substring(0,7)+'-01' : undefined"
    :max="formData['year_month'] ? formData['year_month'].substring(0,7)+'-31' : undefined"
    :modelValue="formData[field.name]"
    @update:modelValue="emitFormData($event, field.name)"
    :error-messages="validationErrors[field.name]"
    :rules="field.required ? [rules.required] : []"
  ></qx-date>
  <qx-date
    v-if="field.form_input == 'datepicker' && field.name == 'year_month'"
    :label="field.label"
    type="month"
    :modelValue="formData[field.name]"
    @update:modelValue="emitFormData($event, field.name)"
    :error-messages="validationErrors[field.name]"
    :rules="field.required ? [rules.required] : []"
  ></qx-date>
  <q-toggle 
    v-if="field.form_input == 'truefalse'"
    :label="field.label"
    :modelValue="formData[field.name]"
    @update:modelValue="emitFormData($event, field.name)"
    :error-messages="validationErrors[field.name]"
    :rules="field.required ? [rules.required] : []"
  >
  </q-toggle>
  <file-upload 
    v-if="field.form_input == 'file'"
    :label="field.label"
    :modelValue="formData[field.name]"
    @update:modelValue="emitFormData($event, field.name)"
    :error-messages="validationErrors[field.name]"
    :rules="field.required ? [rules.required] : []"
  >
  </file-upload>

  <qx-select
      v-else-if="field.form_input == 'multiselect'"
      :label="field.label"
      :emit-value="field.label !== false"
      :modelValue="formData[field.name]"
      @update:modelValue="emitFormData($event, field.name)"
      :optionsUrl="field.inputOptions.itemsUrl"
      :optionValue="field.inputOptions.itemValue"
      :optionLabel="field.inputOptions.itemText"
      :error-messages="validationErrors[field.name]"
      :rules="field.required ? [rules.required] : []"
      map-options
      use-input
      input-debounce="0"
      use-chips
      multiple
      new-value-mode="add-unique"
    ></qx-select>


</div>
<pre>
  {{formStyle}}
</pre>
</q-form>
<q-btn @click="validateForm">Validate</q-btn>
</div>
  
</template>

<script>
import FileUpload from '../files/FileUpload.vue';

import get from 'lodash/get.js'

const seq = function (size, startAt) {
  return [...Array(size).keys()]
    .map((i) => String(i + startAt))
    .reduce((result, item, index, array) => {
      result = result || [];
      result.push({ id: item, descr: item });
      return result;
    }, [])
    .push({ id: 9999, descr: "unknown" })
};

export default {
  components: { FileUpload },
  name: "AddEditForm",
  data() {
    return {
      rules: {
          required: value => (value || value === false)  ? true :  'Required.'
      },
      selectedAtoll: null,
      msg: "",
      alerts: [],
      validationErrors: {}  
    };
  },
  props: ["editRow", "resName", "modelValue"],

  methods: {
    validateForm() {
      console.log(this.$refs)
      this.$refs.field.validate().then((data) => {
        console.log(data)
      })
      this.$refs.createEditForm.validate().then((data) => {
        console.log(data)
      })
    },
    loadFieldDefs() {
      if (this.resName) {
        this.$api(this.resName).loadFieldDefs();
      }
    },
    emitFormData($event, fieldName) {
      let tempObj = {}
      tempObj[fieldName] = $event
      this.$emit('update:modelValue', Object.assign({}, this.formData, tempObj))
    },
  },
  watch: {
    "$route.params.resName"() {
      this.loadFieldDefs();
    },
  },
  computed: {
    atollIslands() {
      return this.selectedAtoll ? this.selectedAtoll.islands : []
    },
    formDef() {
      return this.$api(this.resName).fieldDefs()
        .filter(item => item.display.none !== true && item.display.form !== false );
    },
    resDef() {
      return this.$api(this.resName).resDef()
    },
    formData() {
      return this.modelValue
    },
    formStyle() {
      if(this.$q.screen.gt.md) {
        return get(this.resDef, 'form.layout.gt.md.style', {})
      }
      return {}
      
    }
  },
  mounted() {
    
    this.loadFieldDefs();
    if (this.editRow && this.editRow.id) {
      this.formData = Object.assign({}, this.formData, this.editRow);
    }
    if(this.$route.query && this.$route.query.year_month) {
      this.formData = Object.assign({}, this.formData, {
          'year_month': this.$route.query.year_month,
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ui-alert--type-success .ui-alert__body {
  background-color: rgba(76, 175, 80, 0.8);
}

.table.data-form td {
  padding: 0.75rem 0.5rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}

.align-right {
  text-align: right;
}
</style>
