import * as Realm from 'realm-web';

export default {
  namespaced: true,
  state: {
    key: undefined, // app configuration key
    config: undefined, // app configuration
    pseudonym: undefined, // realm user object
  },
  getters: {
    key(state) {
      return state.key;
    },
    pseudonym(state) {
      if (state.pseudonym !== undefined) {
        return state.pseudonym.id
      }
      return null
    },
    config(state) {
      return state.config;
    }
  },
  mutations: {
    setPseudonym(state, { user }) {
      if (state.pseudonym === undefined)
        state.pseudonym = user;
    },
    setKey(state, key) {
      state.key = key;
    },
    setConfig(state, { config }) {
      state.config = config;
    }
  },
  actions: {
    requestPseudonym({ commit }, { key }) {
      commit('setKey', { key })
      // Create an anonymous credential
      const appId = 'triggers_realmapp-trcon';
      const app = new Realm.App({ id: appId });
      const credentials = Realm.Credentials.anonymous();
      const createPseudonym = async () => {
        try {
          const usr = await app.logIn(credentials);
          return usr;
        } catch (err) {
          console.error('Failed to create pseudonym', err);
        }
        return null;
      };
      const fetchConfig = async () => {
        const mongodb = app.currentUser.mongoClient('Cluster0').db('VAAHE21');
        const configs = mongodb.collection('Configs');
        const conf = await configs.findOne({ config: key });
        return conf;
      };
      createPseudonym().then((user) => {
        commit('setPseudonym', { user })
        fetchConfig().then((config) => {
          commit('setConfig', { config })
        });
      });
    },
    storeSurvey() {
    },
    storeResults() {
    }
  }
};
