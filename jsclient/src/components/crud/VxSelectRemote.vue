<template>
  <v-autocomplete
        :items="options"
        v-bind="$attrs"
        :value="compValue"
      ></v-autocomplete>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import debounce from 'lodash/debounce'

export default {
  name: 'VxSelectRemote',
  inheritAttrs: false,
  data () {
    return {
      compValue: null,
      options: [],  
    }
  },

  props: [
    'value',
    'itemsUrl',
    'items',
  ],

  methods: {
    loadOptions() {
      axios.get(this.itemsUrl).then((resp) => {
        this.options = resp.data
      }) 
    },

    updateValueFromParent(newValue) {
      if(newValue != this.compValue) {
        this.compValue = newValue
        // console.log(newValue)
      }
      
    },

    updateOptionsFromParent(newValue) {
      this.options = newValue || []
    },

    // remote serach moethods
    onQueryChange(query) {
        if (query.length >= 2) {

          this.fetchRemoteResults(query)
            
        } 
        
        
    },

    fetchRemoteResults: debounce(function (query) {
      this.select11Loading = true;
        
      let searchUrl = this.url + '*' + query + '*'

      axios.get(searchUrl).then((resp) => {
        console.log(resp)
        this.options = resp.data
        if(resp.data.length < 1) {
          this.select11NoResults = true;
        }
        return resp

      }).then((resp) => {
        this.select11Loading = false;
        this.select11LoadingTimeout = null;
      })   
            
    }, 500)
  
  },
  watch: {
    value: function(newValue, oldValue) {
      this.updateValueFromParent(newValue)
    },
    options: function(newValue, oldValue) {
      this.updateOptionsFromParent(newValue)
    },
    items:function() {
      this.updateValueFromParent(this.value)
    }
  },
  created() {
  
    this.updateOptionsFromParent(this.items)
    this.updateValueFromParent(this.value)
    if(this.itemsUrl) {
      this.loadOptions()
    }
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}

</style>
