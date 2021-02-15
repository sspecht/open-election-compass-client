export default {
  namespaced: true,
  state: {
    kioskMode: false,
    configKey: "",
    configList: [],
    configId: ""
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
    configId(state) {
      return state.configId;
    }
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
    },
    setConfigId(state, value) {
      state.configId = value;
    }
  },
};
