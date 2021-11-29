import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false
  },

  mutations: {
      // @christie: this is a handy mutation technique.
      // Now you don't need a seperate mutation function,
      // for each state item. eg: setIsLoggedIn etc.
      set(state, { property, value }) {
      state[property] = value
    },
  },

  actions: {
  },

  modules: {
  }
})
