export default {
  namespaced: true,
  state: {
    surveyFinished: false,
    surveyParticipation: false,
    surveyStep: 0,
    geschlecht: 0,
    alter: 0,
    bildungsabschluss: 0,
    wahlberechtigt: 0,
    turnout: 0,
    vote_local: '',
    vote_btw: 0,
    polint: 0,
    stadtteil: '',
    districts: undefined,
    geschlechtOptions:
    [
      '',
      'weiblich',
      'männlich',
      'divers',
      'keine Angabe',
    ],
    abschlussOptions:
    [
      '',
      'Schule ohne Abschluss beendet',
      'Hauptschulabschluss, Volksschulabschluss Abschluss der polytechnischen Oberschule 8. oder 9. Klasse',
      'Realschulabschluss, Mittlere Reife, Fachschulreife oder Abschluss der polytechnischen Oberschule 10. Klasse',
      'Fachhochschulreife (Abschluss einer Fachoberschule etc.)',
      'Abitur bzw. erweiterte Oberschule mit Abschluss 12. Klasse (Hochschulreife)',
      'bin noch Schüler',
      'keine Angabe',
    ],
    wahlberechtigtOptions:
    [
      '',
      'ja',
      'nein',
    ],
    turnoutOptions:
    [
      '',
      'Ja, ich gehe wählen',
      'Ich bin mir noch nicht sicher',
      'Nein, ich werde nicht wählen gehen',
    ],
    voteBtwOptions:
    [
      '',
      'CDU',
      'SPD',
      'AfD',
      'Bündnis 90/Die Grünen',
      'FDP',
      'Die Linke',
      'Eine andere Partei',
      'Ich würde nicht wählen gehen',
    ],
    polintOptions:
    [
      '',
      'sehr stark',
      'stark',
      'mittelmäßig',
      'weniger stark',
      'überhaupt nicht',
    ],
  },
  getters: {
    survey(state){
      return [state.geschlecht, state.alter, state.bildungsabschluss, state.stadtteil, state.wahlberechtigt, state.turnout, state.vote_local, state.vote_btw, state.polint];
    },
    surveyParticipation(state){
      return state.surveyParticipation
    },
    finished(state) {
      return state.surveyFinished;
    },
    surveyStep(state) {
      return state.surveyStep;
    },
    districts(state) {
      return state.districts;
    },
    geschlechtOptions(state) {
      return state.geschlechtOptions;
    },
    abschlussOptions(state) {
      return state.abschlussOptions;
    },
    wahlberechtigtOptions(state) {
      return state.wahlberechtigtOptions;
    },
    turnoutOptions(state) {
      return state.turnoutOptions;
    },
    voteBtwOptions(state) {
      return state.voteBtwOptions;
    },
    polintOptions(state) {
      return state.polintOptions;
    },
  },
  actions: {
    insertDistricts({ commit }, { districts }) {
      commit('setDistricts', districts);
    },
    sendSurvey({ state }) {
      const survey = {
        geschlecht: state.geschlecht,
        alter: state.alter,
        bildungsabschluss: state.bildungsabschluss,
        stadtteil: state.stadtteil,
        wahlberechtigt: state.wahlberechtigt,
        turnout: state.turnout,
        vote_local: state.vote_local,
        vote_btw: state.vote_btw,
        polint: state.polint,
      };
      console.log(survey);
    },
  },
  mutations: {
    updateSurveyParticipation(state){
      state.surveyParticipation = true;
    },
    updateSurveyFinished(state) {
      state.surveyFinished = true;
    },
    setDistricts(state, districts) {
      state.districts = ['', ...districts];
      const d = state.districts[0];
      state.stadtteil = d;
    },
    updateSurveyStep(state, step) {
      state.surveyStep = step;
    },
    updateGeschlecht(state, geschlecht) {
      state.geschlecht = parseInt(geschlecht, 10);
    },
    updateAlter(state, alter) {
      state.alter = parseInt(alter, 10);
    },
    updateBildungsabschluss(state, bildungsabschluss) {
      state.bildungsabschluss = parseInt(bildungsabschluss, 10);
    },
    updateStadtteil(state, stadtteil) {
      state.stadtteil = stadtteil;
    },
    updateWahlberechtigt(state, wahlberechtigt) {
      state.wahlberechtigt = parseInt(wahlberechtigt, 10);
    },
    updateTurnout(state, turnout) {
      state.turnout = parseInt(turnout, 10);
    },
    updateVote_local(state, voteLocal) {
      state.vote_local = voteLocal;
    },
    updateVote_btw(state, voteBtw) {
      state.vote_btw = parseInt(voteBtw, 10);
    },
    updatePolint(state, polint) {
      state.polint = parseInt(polint, 10);
    },
  },
};
