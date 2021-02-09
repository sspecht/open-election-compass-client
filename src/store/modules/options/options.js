export default {
  namespaced: true,
  state: {
    kioskMode: false,
    configKey: "",
    configList: []
  },
  getters: {
    kioskMode(state) {
      return state.kioskMode;
    },
    configKey(state) {
      return state.configKey;
    },
    configList(state) {
      return state.configList;
    },
  },
  mutations: {
    setKioskMode(state, value) {
      state.kioskMode = value;
    },
    setConfigKey(state, value) {
      state.configKey = value;
    },
    setConfigList(state, value) {
      state.configList = value;
    }
  },
};
