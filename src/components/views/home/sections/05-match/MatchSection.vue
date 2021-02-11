<template>
  <PageSection class="match-section" full data-section="match">
    <h2 class="match-section__heading">
      {{ $t('heading') }}
    </h2>
    <p class="match-section__explanation">
      {{ $t('explanation') }}
      {{ $t('detail') }}
      <a href="https://vaa.uni-oldenburg.de/wie-wir-arbeiten" target="_blank" rel="noopener">{{
        $t('detail-linktext')
      }}</a>
      {{ $t('detail-end') }}
    </p>
    <ul role="list">
      <li
        v-for="{ party, percentage } of results.filter((r) => r.party.selected)"
        :key="party.alias"
        role="listitem"
      >
        <Match :party="party" :percentage="percentage" />
      </li>
    </ul>
    <br />
    <h2 class="match-section__heading" v-if="results.filter((r) => !r.party.selected).length > 0">
      {{ $t('heading_others') }}
    </h2>
    <ul role="list" v-if="results.filter((r) => !r.party.selected).length > 0">
      <li
        v-for="{ party, percentage } of results.filter((r) => !r.party.selected)"
        :key="party.alias"
        role="listitem"
      >
        <Match :party="party" :percentage="percentage" />
      </li>
    </ul>
  </PageSection>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Match from '@/components/views/home/sections/05-match/Match.vue';
import PageSection from '@/components/elements/PageSection.vue';

export default {
  name: 'MatchSection',
  components: {
    Match,
    PageSection,
  },
  mounted() {
    this.exportResult();
  },
  computed: {
    ...mapGetters({
      selectedParties: 'parties/selectedParties',
      theses: 'theses/theses',
      results: 'parties/resultsAllParties',
    }),
  },
  methods: {
    ...mapActions({
      exportResult: 'researchdata/exportResult',
    }),
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Your result",
    "explanation": "This chart describes how much you and the respective parties agreed on the above theses. The higher the percentage, the more your positions match. Keep in mind, that this is no voting recommendation, but a tool for orientation and discussion.",
    "heading_others": "And these are your results with the other parties"
  },
  "de": {
    "heading": "Ihr Ergebnis",
    "explanation": "Hier sehen Sie, wie sehr Ihre persönlichen Positionen denen der einzelnen Parteien ähneln. Je höher die Prozentzahl, desto ähnlicher sind sich die Positionen. Bitte beachten Sie, dass dies keine Wahlempfehlung ist, sondern nur ein Informations- und Orientierungsangebot. ",
    "detail": "Näheres erfahren Sie in unserer",
    "detail-linktext": "Methodik",
    "detail-end": " (Öffnet in neuer Seite).",
    "heading_others": "Und hier Ihr Ergebnis mit den weiteren Parteien"
  }
}
</i18n>
<!-- eslint-enable max-len -->

<style lang="scss">
.match-section {
  background-color: var(--theme-primary-color);
}

.match-section__heading {
  color: #fff;
}

.match-section__explanation {
  margin-bottom: 2.5em;
}

.match-section__explanation a {
  color: black;
  font-weight: bold;
}

.match-section__explanation a:hover {
  text-decoration: underline;
  color: #999;
}
</style>
