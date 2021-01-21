import Vue from 'vue';
import Vuex from 'vuex';

import algorithm from './modules/algorithm/algorithm';
import footerLinks from './modules/footerLinks/footerLinks';
import languages from './modules/languages/languages';
import options from './modules/options/options';
import parties from './modules/parties/parties';
import sections from './modules/sections/sections';
import theses from './modules/theses/theses';
import survey from './modules/survey/survey';
import researchdata from './modules/researchdata/researchdata';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    algorithm,
    footerLinks,
    languages,
    options,
    parties,
    sections,
    theses,
    survey,
    researchdata
  },
});
