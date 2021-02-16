<template>
  <div v-if="status === 'switch'">
    <SwitchConfig :visible="status === 'switch'" />
  </div>
  <div v-else id="oec-wrapper">
    <div
      v-if="status === 'loading' || status === 'error'"
      :class="{
        'oec-wrapper__loading': true,
        'oec-wrapper__loading--error': status === 'error',
      }"
    >
      <div class="oec-wrapper__loading-icon">
        <Icon v-if="status === 'loading'" name="slash" spinning monospace />
        <Icon v-else-if="status === 'error'" name="times" monospace />
      </div>
    </div>
    <div v-else class="oec-wrapper__page">
      <Home />
    </div>
  </div>
</template>

<script>
import domReady from '@wordpress/dom-ready';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _set from 'lodash/set';
import Home from '@/components/views/home/Home.vue';
import Icon from '@/components/elements/Icon.vue';
import SwitchConfig from '@/components/views/switchconfig/SwitchConfig.vue';

export default {
  name: 'OpenElectionCompass',

  components: {
    Home,
    Icon,
    SwitchConfig,
  },

  data() {
    return {
      status: 'loading',
    };
  },

  props: {
    loadTag: {
      type: String,
      default: null,
    },
    loadUrl: {
      type: String,
      default: null,
    },
    loadObject: {
      type: Object,
      default: null,
    },
    language: {
      type: String,
      default: null,
      validator: (value) => ['en', 'de'].includes(value),
    },
    kioskMode: {
      type: Boolean,
      default: false,
    },
  },

  /**
   * The mounted hook. Interprets the JSON configuration passed to the components' default slot. And
   * creates translations and vuex stores, accordingly.
   *
   * @return  {undefined}
   */
  mounted() {
    // Get JSON content from element attributes. Example:
    // <open-election-compass load-url="https://example.com/content.json" />
    // – or –
    // <open-election-compass load-tag="#oec-content" />
    // <script type="application/json" id="oec-content">...
    domReady(() => {
      const urlString = window.location.href;
      const url = new URL(urlString);
      const key = url.searchParams.get('key');
      this.$store.commit('languages/activateLanguage', { code: 'de' });

      if (this.loadUrl === 'localapi') {
        this.$store.commit('options/setConfigKey', key);
        this.loadContentFromUrl(`http://localhost:8000/configs/${key}`);
      } else if (this.loadUrl === 'api') {
        if (key !== null) {
          this.loadConfigFromApi(key);
        } else {
          // no config key has been given, display selection
          this.status = 'switch';
          const unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'options/setConfigKey') {
              this.loadConfigFromApi(this.$store.getters['options/configKey']);
              unsubscribe();
            }
          });
        }
      } else if (this.loadUrl === 'file') {
        if (key !== null) {
          this.$store.commit('options/setConfigKey', key);
          this.loadContentFromUrl(`configs/${key}.json`);
        } else {
          const element = document.querySelector('#oec-settings');
          this.status = 'switch';
          if (element.tagName !== 'SCRIPT') {
            this.status = 'error';
            throw new Error(
              'Please provide either a "key" url variable or add the #oec-settings tag in the index.html.'
            );
          }
          const configKeyList = JSON.parse(element.text);
          this.$store.commit('options/setConfigList', configKeyList.configs);
          const unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'options/setConfigKey') {
              this.status = 'loading';
              this.loadContentFromUrl(`configs/${this.$store.getters['options/configKey']}.json`);
              unsubscribe();
            }
          });
        }
      } else if (typeof this.loadTag === 'string' && this.loadTag.length > 0) {
        this.loadContentFromTag(this.loadTag);
      } else if (typeof this.loadUrl === 'string' && this.loadUrl.length > 0) {
        this.loadContentFromUrl(this.loadUrl);
      } else if (typeof this.loadObject === 'object' && this.loadObject !== null) {
        this.loadContentFromObject(this.loadObject);
      }
    });
    this.$store.commit('options/setKioskMode', this.kioskMode);
  },
  computed: {
    activeLanguage() {
      return this.$store.getters['languages/active'];
    },
  },
  watch: {
    activeLanguage(language) {
      if (language && language.code) {
        this.setLocale(language.code);
      }
    },
    language(code) {
      if (code) {
        this.setLocale(code);
      }
    },
    kioskMode(value) {
      this.$store.commit('options/setKioskMode', value);
    },
  },
  methods: {
    loadConfigFromApi(key) {
      this.status = 'loading';
      this.$store.dispatch('researchdata/requestPseudonym', { key });
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'researchdata/setConfig') {
          this.loadContentFromObject(this.$store.getters['researchdata/config']);
          unsubscribe();
        }
      });
    },
    loadContentFromTag(tag) {
      const element = document.querySelector(tag);
      if (element.tagName !== 'SCRIPT') {
        throw new Error(
          'Please reference a script-tag in the load-url attribute to load the content from.'
        );
      }
      const content = JSON.parse(element.text);
      const result = this.parseContent(content);
      if (result) {
        this.status = 'ready';
      } else {
        this.status = 'error';
      }
    },
    loadContentFromUrl(url) {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = this.parseContent(JSON.parse(xhr.responseText));
          if (result) {
            this.status = 'ready';
          } else {
            this.status = 'error';
          }
        } else {
          this.status = 'error';
          throw new Error(`Failed loading content from URL '${url}'!`);
        }
      };
      xhr.open('GET', url);
      xhr.send();
    },
    loadContentFromObject(content) {
      const result = this.parseContent(content);
      if (result) {
        this.status = 'ready';
      } else {
        this.status = 'error';
      }
    },
    parseContent(content) {
      const languages = content.languages.map((language) => language.code);
      if (languages.length === 0) {
        // eslint-disable-next-line no-console
        console.error(
          'No translation loaded, because no translation attributes were found on the base element. Should look like this: <open-election-compass translation-en="https://example.com/en.json" />'
        );
      }

      // Add languages to store
      _forEach(content.languages, (language, index) => {
        this.$store.commit('languages/addLanguage', {
          index,
          name: language.name,
          code: language.code,
        });
      });
      this.$store.dispatch('languages/setBrowserLanguageAsFallback');

      // If a default language is provided from the outside (e.g. from a parent router), set it
      if (this.language && this.$store.getters['languages/usesFallback']) {
        this.$store.commit('languages/activateLanguage', {
          code: this.language,
        });
      }

      // Extract Survey from content
      const survey = _get(content, 'survey', undefined);
      if (survey && survey.districts) {
        this.$store.dispatch('survey/insertDistricts', {
          districts: survey.districts,
        });
      }
      if (survey && survey.parties) {
        this.$store.dispatch('survey/insertParties', {
          parties: survey.parties,
        });
      }

      // store config metadata
      const configId = _get(content, 'config', undefined);
      if (configId) {
        this.$store.commit('options/setConfigId', configId);
      }

      // Set up algorithm
      this.$store.dispatch('algorithm/activateAlgorithm', {
        algorithm: _get(content, 'algorithm', 'cityblock/approve-neutral-reject'),
        i18n: this.$root.$i18n,
      });

      // Extract translations from content
      const translations = {};
      this.readTranslation(content, 'title', translations);
      this.readTranslation(content, 'subtitle', translations);
      this.readTranslation(content, 'introduction.heading', translations);
      this.readTranslation(content, 'introduction.text', translations);

      // Extract footer links
      _forEach(content['footer-links'], (link, index) => {
        this.readTranslation(content, `footer-links.${index}.text`, translations);
        this.readTranslation(content, `footer-links.${index}.href`, translations);
        this.$store.commit('footerLinks/addLink', {
          index,
        });
      });

      // Read content for theses and extract translations
      _forEach(content.theses, (thesis, index) => {
        this.readTranslation(content, `theses.${index}.title`, translations, true);
        this.readTranslation(content, `theses.${index}.statement`, translations);
        const positions = {};
        _forEach(content.parties, (party) => {
          this.readTranslation(
            content,
            `theses.${index}.positions.${party.alias}.explanation`,
            translations
          );
          positions[party.alias] = thesis.positions[party.alias].position;
        });
        this.$store.commit('theses/addThesis', {
          index,
          status: null,
          factor: 1,
          activated: index === 0,
          positions,
        });
      });

      // Read content for parties and extract translations
      _forEach(content.parties, (party, index) => {
        this.readTranslation(content, `parties.${index}.name`, translations);
        this.readTranslation(content, `parties.${index}.short`, translations);
        this.readTranslation(content, `parties.${index}.description`, translations);
        this.$store.commit('parties/addParty', {
          index,
          alias: party.alias,
          selected: false,
          logo: party.logo === undefined ? null : party.logo,
        });
      });

      _forEach(translations, (translation, language) => {
        this.$i18n.mergeLocaleMessage(language, translation);
      });

      return true;
    },

    /**
     * Set the current language in the vue-i18n plugin.
     *
     * @param   {String}  locale  The locale in two letter format. E.g. 'en' for English.
     *
     * @return  {undefined}
     */
    setLocale(locale) {
      this.$i18n.locale = locale;
    },

    /**
     * Extracts translations from one object and injects it into another. This method expects an
     * object containing translations in key-value format at the given `path` in the `from` object.
     * It extracts the translations for every language and places them at the given `path` in the
     * `to` object, but under their respective languages on top-level.
     *
     * @param   {Object}  from  The object the translations are extracted from.
     * @param   {String}  path  The path at which the translations are read/written.
     * @param   {Object}  to    The object the translations are written to.
     *
     * @return  {Object}        Returns the `to` object.
     */
    readTranslation(from, path, to) {
      const translations = _get(from, path);
      if (typeof translations !== 'object') {
        // eslint-disable-next-line no-console
        console.warn(`Found no translations at path '${path}'. Check your configuration.`);
        return to;
      }
      _forEach(translations, (translation, language) =>
        _set(to, `${language}.${path}`, translation)
      );
      return to;
    },
  },
};
</script>

<style lang="scss">
@import './main.scss';
@import '@/styles/core.scss';

#oec-wrapper {
  font-family: Arial, sans-serif;
  color: #222;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &::before {
    content: '';
    position: fixed;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      $theme-dark-background 0%,
      $theme-dark-background 50%,
      #fff 50%,
      #fff 100%
    );
  }
}

.oec-wrapper__page {
  position: relative;
  z-index: 1;
}
</style>

<style lang="scss" scoped>
.oec-wrapper__loading {
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-size: 4rem;
  line-height: 1;
  .icon {
    position: relative;
    left: -50%;
    top: -2rem;
  }
}

.oec-wrapper__loading-icon {
  color: var(--theme-primary-color);
  position: absolute;
  top: 50%;
  left: 50%;
}

.oec-wrapper__loading--error .oec-wrapper__loading-icon {
  color: var(--theme-negative-background);
}
</style>
