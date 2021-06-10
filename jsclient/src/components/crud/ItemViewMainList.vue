<template>
  <ul>
      <li>One</li>
      <li>Two</li>
  </ul>
</template>

<script>

export default {
  name: "ItemViewMainList",
  data: () => ({
    date: null,
    menu: false
  }),
  computed: {
    displayDate() {
      return this.mvDate(this.value)
    }
  },
  props: ['viewItem'],
}
</script>

<style>

</style>