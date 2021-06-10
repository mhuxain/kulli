<template>
  <q-select v-bind="$attrs" :options="options"  @filter="filterOptions"></q-select>
</template>

<script>
import axios from 'axios'

export default {
    name: "qxSelect",
    props: ['optionsUrl'],
    data: () => ({
        localOptions: [],
        OPTIONS: [],
    }),
    computed: {
        options() {
            return this.optionsUrl ? this.localOptions : this.$attrs.options
        }
    },
    methods:{
        filterOptions (val, update) {
            if (val === '') {
                update( () => this.localOptions = this.OPTIONS )
                return
            }

            if(this.$attrs.optionLabel === '')
                return;

            update(() => {
                const needle = val.toLowerCase()
                this.localOptions = this.OPTIONS.filter(option => 
                    option[this.$attrs.optionLabel].toLowerCase().indexOf(needle) > -1
                )
            })
        },
    },
    created() {
        if(this.optionsUrl) {
            axios.get(this.optionsUrl).then(res => {
                this.OPTIONS = this.localOptions = res.data.data
            }) 
        }
        
    },
    
    

}
</script>

<style>

</style>