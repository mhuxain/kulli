<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar
        class="bg-white text-black"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="mdi-menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          <div class="q-mt-sm">
            <img src="/img/header-logo.png" 
            style=" 
              height: 45px;
              top: 2px;
              position: absolute;"
            >
            <!-- Resouce Hub -->
          </div>
          
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey" icon="mdi-file" type="a" href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat icon="mdi-star" style="color:#9d4182 !important;" type="a" href="https://github.com/sponsors/pratik227" target="_blank">
          </q-btn>
          <q-btn round dense flat color="grey-6" icon="mdi-bell">
            <q-badge color="red" text-color="black" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <q-list class="right-nav-bar q-mt-lg">
        <template v-for="menu in menuItems" :key="menu.path">
        <q-item :class="'text-'+menu.iconColor" v-if="!menu.subMenus" :to="menu.path" active-class="q-item-no-link-highlighting" >
          <q-item-section avatar>
            <q-icon :name="menu.icon"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <div >
                {{menu.label}}
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
        
        <q-expansion-item
          v-else
          :default-opened="menu.label == 'Reports'"
          :icon="menu.icon"
          :label="menu.label"
          :header-class="'text-'+menu.iconColor"
        >
          
          <q-list class="q-pl-lg">
            <q-item class="text-blue-grey-8" v-for="subMenu in menu.subMenus" :key="subMenu.path" :to="subMenu.path" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon :name="subMenu.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <div >
                    {{subMenu.label}}
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import Messages from "./Messages";
import menuItems from "components/ui/menuItems.js"

export default {
    name: 'MainLayout',

    components: {
        Messages,
        // EssentialLink
    },


    data() {
        return {
            leftDrawerOpen: false,
        }
    },
    computed: {
      menuItems() {
        return menuItems
      }
    },
    methods: {
      getRandomCount(max) {
        return Math.floor(Math.random() * max);  
      }
    }

}
</script>
<style>
.right-nav-bar .q-item__section--avatar {
    min-width: 35px;
    padding-right: 10px;
}

.right-nav-bar  .q-router-link--exact-active {
    background: whitesmoke;
    border-right: lightblue 5px solid;
}
</style>
