<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    nudge-top="20px"
    max-width="290px"
    min-width="290px"
    style="background-color: white;"
  >
    <template v-slot:activator="{ on, attrs }">

      <v-text-field
        :value="displayDate"
        :label="label"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-date-picker>
    <v-spacer></v-spacer>
    
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-menu>
</template>

<script>

export default {
  name: "DatePicker",
  inheritAttrs: false,
  data: () => ({
    date: null,
    menu: false
  }),
  computed: {
    displayDate() {
      return this.$attrs.type=='month' ? this.value : this.mvDate(this.value)
    }
  },
  props: ['label', 'value'],
}
</script>

<style>

.v-menu__content {
  background-color: white;
}
</style>