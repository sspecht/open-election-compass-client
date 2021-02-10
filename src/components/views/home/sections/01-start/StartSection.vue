<template>
  <PageSection
    tag="header"
    class="start-section"
    data-section="start"
    full
    role="banner"
    :aria-roledescription="$t('banner-aria')"
  >
    <!-- wrapping div needed for IE11 -->
    <div class="start-section__logo">
      <OpenElectionCompassLogo width="1em" />
    </div>
    <h1 class="start-section__heading">
      {{ $t('title') }}
    </h1>
    <p class="start-section__subtitle">{{ $t('subtitle') }}</p>
    <p class="start-section__policies">
      {{ $t('policies1') }}
      <a href="https://vaa.uni-oldenburg.de/datenschutz/" target="_blank" rel="noopener">{{
        $t('policies-link')
      }}</a>
      {{ $t('policies2') }}
    </p>
  </PageSection>
</template>

<script>
import OpenElectionCompassLogo from '@/components/elements/OpenElectionCompassLogo.vue';
import PageSection from '@/components/elements/PageSection.vue';

export default {
  name: 'StartSection',
  components: {
    OpenElectionCompassLogo,
    PageSection,
  },
};
</script>

<i18n>
{
  "en": {
    "banner-aria": "Start section",
    "policies1": "By using this you accept our",
    "policies-link": "data protection policies",
    "policies2": "."
  },
  "de": {
    "banner-aria": "Startseite",
    "policies1": "Mit der Benutzung nehmen Sie unsere",
    "policies-link": "Erklärung zum Datenschutz",
    "policies2": "zur Kenntnis."
  }
}
</i18n>

<style lang="scss">
.start-section {
  text-align: center;
}

.start-section__logo {
  display: inline-block;
  font-size: 4em;
  @media (min-width: 48em) {
    font-size: 6em;
  }
}

.start-section__heading {
  // `align-self` needed for IE11
  align-self: center;
  font-size: 1.5em;
  line-height: 1.25;
  text-align: center;
  max-width: 56em;
  margin: 1em auto 1em;
  @media (min-width: 38em) {
    font-size: 2em;
  }
  @media (min-width: 48em) {
    font-size: 3em;
  }
  @media (min-width: 64em) {
    font-size: 4em;
  }
}

.start-section__subtitle {
  // `align-self` needed for IE11
  align-self: center;
  font-size: 0.875em;
  text-align: center;
  color: #999;
  @media (min-width: 48em) {
    font-size: 1.125em;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
}

.start-section__policies {
  // `align-self` needed for IE11
  align-self: center;
  font-size: 0.7em;
  text-align: center;
  color: #999;
  cursor: pointer;
  margin-top: 0.5em;
  @media (min-width: 48em) {
    font-size: 1em;
  }
  @media (min-width: 64em) {
    font-size: 1em;
  }
}

.start-section__policies a {
  color: black;
  font-weight: bold;
}

.start-section__policies a:hover {
  text-decoration: underline;
  color: #999;
}
</style>
