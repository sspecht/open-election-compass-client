export default {
  namespaced: true,
  state: {
    kioskMode: false,
    configKey: ""
  },
  getters: {
    kioskMode(state) {
      return state.kioskMode;
    },
    configKey(state) {
      return state.configKey;
    },
  },
  mutations: {
    setKioskMode(state, value) {
      state.kioskMode = value;
    },
    setConfigKey(state, value) {
      state.configKey = value;
    }
  },
};
