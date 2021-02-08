import calculatePointsForParty from './calculatePointsForParty';

export default {
  namespaced: true,
  state: {
    parties: [],
    chosen: false,
    exportedResult: false,
  },
  getters: {
    parties(state) {
      return state.parties;
    },
    selectedParties(state) {
      return state.parties.filter((party) => party.selected);
    },
    chosen(state) {
      return state.chosen;
    },
    results(state, { selectedParties }, rootState, rootGetters) {
      const theses = rootGetters['theses/theses'];
      const algorithm = rootGetters['algorithm/algorithm'];
      const maxPoints = rootGetters['theses/maxPoints'];
      const results = selectedParties.map((party) => {
        const points = calculatePointsForParty(party, theses, algorithm);
        const percentage = (1 / maxPoints) * points;
        return { party, points, percentage };
      });
      return results.sort((a, b) => b.points - a.points);
    },
    resultsAllParties(state, { parties }, rootState, rootGetters) {
      const theses = rootGetters['theses/theses'];
      const algorithm = rootGetters['algorithm/algorithm'];
      const maxPoints = rootGetters['theses/maxPoints'];
      const results = parties.map((party) => {
        const points = calculatePointsForParty(party, theses, algorithm);
        const percentage = (1 / maxPoints) * points;
        return { party, points, percentage };
      });
      return results.sort((a, b) => b.points - a.points);
    },
  },
  actions: {
    chose({ commit }) {
      commit('setChosen', { chosen: true });
    },
    exportResult({ dispatch, rootGetters }) {
      const theses = rootGetters['theses/theses'];
      const parties = rootGetters['parties/parties'];
      const surveyResult = rootGetters['survey/survey'];
      const surveyParticipation = rootGetters['survey/surveyParticipation'];

      let config = '';
      const str = window.location.href;
      const pos = str.lastIndexOf('=');
      config = str.substr(pos + 1, str.length - pos - 1);
      const algorithm = rootGetters['algorithm/algorithm'];

      const statuses = algorithm.options.map((option) => option.alias);

      const thesesArray = [];
      theses.forEach(thesis => {
        thesesArray.push(statuses.indexOf(thesis.status));
      });

      const partiesArray = [];
      parties.forEach(party => {
        partiesArray.push(party.selected)
      })

      const exportResult = {
        parties: partiesArray,
        theses: thesesArray,
      }

      if(surveyParticipation){
        exportResult.survey = surveyResult;
      }

      dispatch("researchdata/storeResults", {
        result: exportResult,
        timestamp: Date.now(),
        config,
      }, { root: true });
    },
  },
  mutations: {
    addParty(state, party) {
      state.parties.push(party);
    },
    setSelected(state, { index, value }) {
      state.parties[index].selected = value;
    },
    setChosen(state, { chosen }) {
      state.chosen = chosen;
    },
    setExportedResult(state, { ExpRes }) {
      state.exportedResult = ExpRes;
    },
  },
};

