import axios from "axios";
export default {
  namespaced: true,
  state: {
    sideDrawerOpen: true,
    count: 0,
    data: {
      // store data here
    },
    defs: {
      // store field defs here
    },
    pagination: {
      // pagination will be stored here
    }
  },
  mutations: {
    mergeData(state, { res, data }) {
      let t = {};
      t[res] = state.data[res] = data
        // ? Object.assign({}, state.data[res], data)
        // : data;
      // state.data = Object.assign({}, state.data, t);
      // console.log(state.data)
    },
    mergeDefs(state, { res, data }) {
      let t = {};
      t[res] = state.defs[res]
        ? Object.assign({}, state.defs[res], data)
        : data;
        state.defs = Object.assign({}, state.defs, t);
    },
    mergePagination(state, { res, data }) {
      state.pagination[res] = data
    }
  },
  actions: {
    setEditItem({ state, commit }, { res, editItem }) {
      commit("mergeData", { res, data: { editItem } });
    },
    clearEditItem({ state, commit }, { res }) {
      commit("mergeData", { res, data: { editItem: null } });
    },

    async loadFieldDefs({ state, commit }, { res }) {
      if(state.defs[res]) {
        return 
      }
      let resp = await axios.get(`/api/field-defs/${res}`);
      commit("mergeDefs", { res, data: resp.data });
    },
    async fetch({ state, commit }, { res, config }) {
      if (res == undefined) {
        console.log(res + " not defined in fetch");
        return Promise.resolve(false);
      }
      let resp = await axios.get(`/api/${res}`, config);
      commit("mergeData", { res, data: { items: resp.data.data } });
      commit("mergePagination", { res, data: {total: resp.data.total, current_page: resp.data.current_page } });

      return Promise.resolve(resp.data);
    },

    async fetchItem({ state, commit }, { res, id, config }) {
      if (!res) {
        console.log(res + " not defined");
        return Promise.resolve("error");
      }
      let resp = await axios.get(`/api/${res}/${id}`, config);
      commit("mergeData", { res, data: { items: [resp.data] } });

      return Promise.resolve(resp.data);
    },

    create({ state, getters, dispatch }, { res, item }) {
      return axios.post(`/api/${res}`, item).then((resp) => {
        let items = getters.items(res);
        items.unshift(resp.data);
      }).catch(res => Promise.reject(res));
    },

    async update({ state, getters, dispatch }, { res, item }) {
      let items = getters.items(res);
      axios.put(`/api/${res}/${item.id}`, item).then((resp) => {
        let editIndex = items.findIndex(fItem => fItem.id == item.id)
        items.splice(editIndex, 1, resp.data);
      });
    },

    async delete({ state, getters }, { res, item }) {
      axios.delete(`/api/${res}/${item.id}`).then((resp) => {
        let items = getters.items(res);
        items.splice(items.indexOf(item), 1);
      });
    },
  },

  getters: {
    items(state) {
      return (res) => {
        return state.data[res] ? state.data[res].items : [];
      };
    },
    fieldDefs(state) {
      return (res) => {
        return state.defs[res] && state.defs[res].fields ? state.defs[res].fields : [];
      };
    },
    resDef(state) {
      return (res) => {
        return state.defs[res] ? state.defs[res] : {};
      };
    },
    editItem(state) {
      return (res) => {
        return state.data[res] ? state.data[res].editItem : {};
      };
    },
    pagination(state) {
      return (res) => {
        return state.pagination[res]  ? state.pagination[res] : [];
      };
    },
  },
};
