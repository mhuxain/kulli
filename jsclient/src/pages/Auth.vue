<template>
  <q-page>
    <q-card class="q-ma-md q-pa-md">
    <div class="col">
    <div class="q-my-md">
      <h6 class="q-ma-sm">Step 1: Get Auth Code</h6>
      This will fetch the auth code. Auth Code is used to request for and Authorization token.<br />
      <a class="q-btn" :href="link" target="_blank">
      Open Auth
      </a>
      
    </div>
    <div class="q-my-md">
      Auth code: {{ authCode }}
    </div>

    <hr />
    <div class="q-my-md">
      <h6 class="q-ma-sm">Step 2: Get Acccess Token</h6>
      <q-btn @click="auth">Get Access Token</q-btn>
    </div>
    <div class="q-my-md">
      Access Token: {{ accessToken }}
    </div>

     <hr />

    <div class="col">
    <div class="q-my-md col">
    <h6 class="q-ma-sm">Step 3: Fetch user data from Api (and set SP) Sp defaults to 1</h6>
    <q-btn @click="getUserData">Get Auth User</q-btn>
    <q-select
      :options="userServiceProviders"
      option-value="id"
      :option-label="(item) => item !== null && item.attributes ?  item.attributes.name : 'Null value'"
      v-model="currentSp"
      :disable="userServiceProviders.length < 1"
    ></q-select>
    </div>

    <hr />
    <div class="q-my-md col">
    <h6 class="q-ma-sm">Step 4: Sample Request to Api</h6>
    <div class="row flex" style="align-items:center;">
    http::/api-url/<q-input v-model="getSampleUrl" class="col-9"></q-input>
    <q-btn @click="fetchFromApi(getSampleUrl)">Go</q-btn>
    </div>
   
    <pre>
      {{this.sampleData }}
    </pre>
    </div>
  </div>

    <hr />
    <pre>
      {{currentSp}}
      {{this.userData }}
    </pre>


    <pre>
      {{ { query :$route.query, params: $route.params } }}
    </pre>
    </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutPage',
  data: () => ({
    res: {},
    data: {},
    sampleData: [],
    userData: {},
    userSp: null,
    currentSp: {
      id: 1
    },
    getSampleUrl: 'settings'
  }),
  computed: {
    userServiceProviders() {
      if(!this.userData.included) {
        console.log("no included")
        return []
      }
      let sps = this.userData.included.filter(entitiy => entitiy.type == 'service-providers')
      console.log('sps', sps)
      return sps
    },
    authCode() {
      return (this.$route.query && this.$route.query.code) ? this.$route.query.code : null
    },
    accessToken() {
      return (this.$route.query && this.$route.query.access_token) ? this.$route.query.access_token : null
    },
    link() {
      let url = `http://app.gate:8080/oauth/authorize`
      let params = {
        response_type : 'code', 
        client_id: '20b0db89c2193e71425c142bcc3a14e251e4b712',
        client_secret: '0b3584472371bd9f31bad13745c84a3dd5b6fb73',
        redirect_uri: 'http://localhost:8081/auth'
      }
      return url + '?' + (new URLSearchParams(params).toString())
    },
    headers() {
      let headers = {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${this.accessToken}`,
      }
      if(this.currentSp.id) {
        headers['Service-Provider'] = this.currentSp.id
      }
      return headers;
    }
  },
  methods:{
    async auth() {
      let url = `/oauth/access_token`
      let data = {
        code: this.$route.query.code, 
        redirect_uri: 'http://localhost:8081/auth',
        client_id: '20b0db89c2193e71425c142bcc3a14e251e4b712', 
        client_secret: '0b3584472371bd9f31bad13745c84a3dd5b6fb73',
        grant_type : 'authorization_code'
      }
      let res = await this.$axios.post(url, data)
      // let res = await this.$axios.get('/oauth/access_token_test')
      
      this.res = res
      this.data = res.data
      this.$router.push({query: {...this.$route.query, access_token: res.data.access_token}})
    },
    async getUserData() {
      let url = `/vapi/users/authenticated?include=employee,professional.service-providers,permissions,roles.permissions`
      let res = await this.get(url)
      this.userData = res.data
    },
    async fetchFromApi(url) {
      let res = await this.get(`/vapi/${url}`)
      this.sampleData = res.data
    },
    async get(url) {
      let res = await this.$axios.request({
          url,
          method: 'get',
          headers : this.headers,
          data: { } // important to avoid backend api bug
        })

      console.log(res.data)
      return res

    }
  }
})
</script>
