import store from './index.js'
import _get from 'lodash/get.js'

const headerLabel = function (str) {
    str = str.replace(/_/gi, ' ');
    return str.charAt(0).toUpperCase() + str.slice(1)
}
const tdForeignText = (field) => (row) => _get(row, field.td_text, field.td_text)
const tdBoolean = (field) => (row) =>  Boolean(row[field.name])
const tdDate = (field) => (row) =>  row[field.name] != null ? new Date(row[field.name]).toDateString() : "-"

class ApiService {

    constructor(resName) {
        this.resName = resName
    }

    fetch(config = {}) {
        return store.dispatch('api/fetch', { res : this.resName, config })
    }

    fetchItem(id, params = {}, config = {}) {
        return store.dispatch('api/fetchItem', { res : this.resName, id })
    }
    
    items() {
        return store.getters['api/items'](this.resName)
    }

    loadFieldDefs() {
        return store.dispatch('api/loadFieldDefs', { res : this.resName })
    }

    fieldDefs() {
        return store.getters['api/fieldDefs'](this.resName)
    }

    resDef() {
        return store.getters['api/resDef'](this.resName)
    }

    pagination() {
        return store.getters['api/pagination'](this.resName)
    }

    editItem() {
        return store.getters['api/editItem'](this.resName) || {} 
        // return "edit"
    }

    headers() {
        return this.items()[0] ? 
                Object.keys(this.items()[0])
                .filter(item => !['created_at', 'updated_at'].includes(item))
                .map(item => ({ name: item, label: headerLabel(item), field: item, align: 'left' }))
                .concat([{ name: 'action', label: 'Actions', field: 'action', align: 'left', sortable: false }]) 
                : []
    }

    columns() {
        
        return this.fieldDefs()
                .filter(item => item.display.none !== true && item.display.list !== false )
                .map(item => (
                    item.type == "int_fk" || item.type == "str_fk" ?
                        { name: item.name, label: item.label, field: tdForeignText(item), align: 'left' } :
                    item.type == "boolean" ?
                    { name: item.name, label: item.label, field: tdBoolean(item), align: 'left' } :
                    item.type == "date" ?
                    { name: item.name, label: item.label, field: tdDate(item), align: 'left' } :
                            { name: item.name, label: item.label, field: item.name, align: 'left' } 
                ))
                .concat([{ name: 'action', label: 'Actions', field: 'action', align: 'left', sortable: false }]);
                
    }

    edit(item) {
        return store.dispatch('api/setEditItem', { res : this.resName , editItem: item})
    }
    
    clearEditItem() {
        return store.dispatch('api/clearEditItem', { res : this.resName})
    }

    async get(id = null) {
        if(this.findById(id) == null) {
            let item = await this.fetchItem(id)
            return item
        }  
        return Promise.resolve(this.findById(id))
    }

    findById(id) {
        return this.items().find(item => item.id == id)
    }

    delete(item) {
        return store.dispatch('api/delete', { res : this.resName, item })
    }

    create(item) {
        return store.dispatch('api/create', { res : this.resName, item })
    }

    update(item) {
        return store.dispatch('api/update', { res : this.resName, item })
    }

    
}

export default function api(res) {

    return new ApiService(res)
}