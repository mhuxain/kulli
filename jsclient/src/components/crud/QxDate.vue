<template>
<q-input v-bind="$attrs" mask="####-##-##" :rules="[]" placeholder="yyyy-mm-dd">
      <template v-slot:prepend>
        <q-icon name="mdi-calendar" class="cursor-pointer">
          <q-menu v-model="qDateMenu" ref="qDateMenu" transition-show="jump-down" transition-hide="jump-up">
            <q-date v-bind="$attrs" mask="YYYY-MM-DD" @update:model-value="dateUpdated">
              <div v-if="!autoClose" class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
              </div>
            </q-date>
          </q-menu>
        </q-icon>
      </template>
    </q-input>
</template>

<script>

export default {
    name: "qxDate",
    data: () => ({
      qDateMenu: false
        
    }),
    props: {
      autoClose: {
        type: Boolean,
        default: true
      }
    
    },
    methods: {
      dateUpdated(value, reason, details) {
        if(this.autoClose) {
          this.qDateMenu = false
        }
      }
    }

}
</script>

<style>


</style>