<template>
    <q-table
      :class="tableClasses(`sticky-actions`)"
      title="List"
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="name"
      @request="onRequest"
      :rows-per-page-options="[15]"
      :key="pagination.page"
      @row-click="rowClickHander"
    >

    <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>

      <template v-slot:body-cell="props">
          <q-td :props="props" :class="getRowClass(props.row)">
            <div style="max-width: 300px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
              {{props.value }}
            </div>
            
          </q-td>
        </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props" :class="getRowClass(props.row)">
          <q-btn round flat icon="mdi-pencil" @click.stop="1" :to="`/${resName}/edit/${props.row.id}`" color="orange">
          </q-btn>
          <q-btn round flat icon="mdi-delete" @click.stop="$api(resName).delete({id: props.row.id})" color="blue">
            
          </q-btn>
        </q-td>
      </template>
    <template v-slot:top-left>
        <div class="row">
          <div class="q-table__title">{{tableTitle}}  </div>
          <q-btn class="q-ml-md" outline rounded color="green" :to="`/${resName}/create`">Add New</q-btn>
        </div>
        
      </template>
      <template v-slot:top-right>
        
        <q-btn flat  round size="md"  icon="mdi-magnify" />
        <q-btn flat  round size="md"  icon="mdi-sort" />
        <q-btn flat  round size="md"  icon="mdi-download" />
        <q-btn flat  round size="md"  icon="mdi-refresh" @click="fetchData(routeQuery, true)"/>
      </template>
    </q-table>
</template>

<script>
import titleCase from 'src/utils/titleCase.js'
import getRowClass from 'src/utils/getRowClass.js'
export default {
  name:'fullHeightTable',
  data: function () { 
    return {
      filterExp: '',
      selected: [],
      sortBy: [],
      filterBy: {},
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: this.$api(this.resName).pagination().current_page,
        rowsPerPage: 16,
        rowsNumber: this.$api(this.resName).pagination().total
      }
    }
  },
  emits: ['tableRowClick'],
  props: {
    resName: String,
    rowClickHandler: Function,
    hasItemView: Boolean,
    tableClass: String,
  },
  components: {},
  methods: {
    rowClickHander($event, row) {
       if(Object.keys( this.$attrs).includes('onItemRowClick')) {
         this.$emit('itemRowClick', {$event, row})
         return
       }
       if(this.hasItemView) {
         this.$router.push(`/${this.resName}/view/${row.id}`)
       }
      // this.rowClickHandler ? this.rowClickHandler($event, row) : localRowClickHandler($event, row)
    },
    localRowClickHandler($event, row) {
      console.log($event, row.id)
    },
    onRequest(props) {
      this.$router.push({query: {page: props.pagination.page}})
    },
    clearFilters() {
      this.filterBy = {}
    },
    gotToView(item) {
      if(resWithItemView.includes(this.resName)) {
        this.$router.push({ path: `/${this.resName}/${item.id}/view` });
      }
      
    },

    fetchData(params = {}, force = false) {
      if (this.items.length < 2 || (params.page != null && params.page != this.pagination.page) || force) {
        this.$api(this.resName).fetch({params})
          .then((resp) => {
            this.pagination.page = resp.current_page
            this.pagination.rowsNumber = resp.total
          });
      }
      this.loadFieldDefs();
    },
    loadFieldDefs() {
      if (this.resName) {
        this.$api(this.resName).loadFieldDefs();
      }
    },
    exportCsv() {
      let exportContent = this.selected.length > 0 ? this.selected : this.items
      return exportCsv(exportContent, this.resName+".csv")
    }

  },
  computed: {

    tableClasses() {
      return (classes) => classes + " " + this.tableClass
    },
    getRowClass() { return getRowClass },
    routeQuery() {
      return this.$route.query
    },
    appliedFilters() {
      return Object.keys(this.filterBy).filter(key => this.filterBy[key]) || []
    },
    userCanRes() {
      return (permission) => {

        if(!resWithPermissions.includes(this.resName)) {
          return true
        }
        let can = this.$api('user-can').items().includes(`${this.resName}.${permission}`)
        return can
      }

    },
    sortFields() {
      return this.fieldDef
        .filter(field => field.display == "always")
        .map(field => field.name)
    },

    columns() {
      return this.$api(this.resName).columns();
    },
    fieldDef() {
      return this.$api(this.resName).fieldDefs();
    },

    tableTitle() {
      return titleCase(this.resName) + ' List'
    },
    rows() {
      return this.items;
    },
    items() {
      let items = this.$api(this.resName)
        .items()
        .map(item => {
          // item.description = item.description.length > 20 ? item.description.substring(0, 20) + "..." : item.description
          return item;
        });
        if(this.filterExp.length > 0) {
          return items.filter(item => JSON.stringify(item).toLowerCase().match(this.filterExp.toLowerCase()))
        }

        if(this.appliedFilters.length > 0) {
          return items.filter(item => 
            this.appliedFilters.filter(key => JSON.stringify(item[key.replace('_id', '')]).match(this.filterBy[key])).length > 0
            )
        }

      return items;
    }
  },
  watch: {
    routeQuery: {
      handler: function(newQuery) {
        this.fetchData(newQuery)
      }, 
    },
    resName: {
      immediate: true,
      handler: function() {
        this.fetchData(this.routeQuery)
      }

    },
  },
};
</script>
<style lang="scss">
  
</style>
