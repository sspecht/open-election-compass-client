import { storeResults } from './researchapi';

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

    exportResult({ dispatch, rootGetters }) {
      const theses = rootGetters['theses/theses'];
      const parties = rootGetters['parties/parties'];
      const surveyResult = rootGetters['survey/survey'];
      const surveyParticipation = rootGetters['survey/surveyParticipation'];
      const algorithm = rootGetters['algorithm/algorithm'];
      const key = rootGetters['options/configId'];

      if (surveyParticipation) {
        const statuses = algorithm.options.map((option) => option.alias);
        const thesesArray = [];
        const thesesTiming = [];

        theses.forEach(thesis => {
          thesesArray.push(statuses.indexOf(thesis.status));
          thesesTiming.push(thesis.time)
        });

        const partiesArray = [];
        parties.forEach(party => {
          partiesArray.push(party.selected)
        })

        const exportResult = {
          parties: partiesArray,
          theses: thesesArray,
          timing: thesesTiming,
          survey: surveyResult
        }

        dispatch("researchdata/storeResults", {
          result: exportResult,
          timestamp: Date.now(),
          key,
        }, { root: true });
      }
    },
    storeResults(context, results) {
      storeResults(results);
      // .then(id => console.log("result saved", id));
    }
  }
};
