import Vue from 'vue'
import * as types from '../mutation-types'

const state = {
  site: {},
  loaded: false
}

const getters = {
  getItems: () => (uid, collection = state.site) => {
    return collection
  },
  isLoaded: () => (url, loaded = state.loaded) => {
    return loaded
  },
  getDataUri: (uid, collection = state.site) => {
    return collection.dataUri
  }
}

const actions = {
  fetchContent () {
    Vue.http.get(getters.getDataUri()).then((response) => {
      const data = JSON.parse(response.bodyText)
      this.commit(types.RECEIVE_SITE, { site: data, loaded: true })
    }, (error) => {
      console.log(error.statusText)
    })
  }
}

const mutations = {
  [types.RECEIVE_SITE] (state, { site, loaded }) {
    state.loaded = loaded
    state.site = site
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
