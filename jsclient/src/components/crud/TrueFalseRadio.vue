<template>
  <v-radio-group row
    :value="value" 
    v-bind="$attrs"
    v-on="$listeners"
    @change="update"
  >
  <div class="pr-10">{{label}}: {{internal}}</div>
      <v-radio label="True" :value="true" :key="`${label}1`"></v-radio>
      <v-radio label="False" :value="false" :key="`${label}2`"></v-radio>
    </v-radio-group>
</template>

<script>

export default {
  name: "DatePicker",
  inheritAttrs: false,
  data: () => ({
    date: null,
    menu: false,
    internal: null,
  }),
  methods: {
    update(event) {
      this.$emit('input', event)
    }
  },
  computed: {
    displayDate() {
      return this.mvDate(this.value)
    }

  },
  props: ['label', 'value'],
}
</script>