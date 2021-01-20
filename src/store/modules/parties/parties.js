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
    exportResult({ commit }, exportResult) {
      let config = '';
      const str = window.location.href;
      const pos = str.lastIndexOf('=');
      config = str.substr(pos + 1, str.length - pos - 1);

      const jsonString = JSON.stringify({
        result: exportResult,
        timestamp: Date.now(),
        config,
      });
      const url = `${window.location.protocol}//${window.location.hostname}:8000/saveResult`;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8',
      );
      xhr.onreadystatechange = function ready() {
        if (this.readyState === 4 && this.status === 200) {
          // key des Datenbankeintrags kommt in der Response zurück.
          console.log(JSON.parse(this.response));
          commit('setExportedResult', { exportedResult: true });
        }
      };
      xhr.send(jsonString);
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
