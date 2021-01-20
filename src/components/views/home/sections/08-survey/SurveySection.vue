<template>
  <PageSection class="survey-section" data-section="survey" v-if="surveyStep != -1">
    <div
      v-if="surveyStep == 0"
    >
    <h2>Dürfen wir Sie um etwas bitten?</h2>
    <p>Wenn Sie uns hier ein paar Daten spenden,
      bringt das unsere Forschung sehr viel weiter.
      Alle Daten werden anonym behandelt!</p>
    </div>
     <div
      v-if="surveyStep == 3"
    >
    <h2>Danke!</h2>
    <p>Vielen Dank für Ihre Umfrageteilnahme!</p>
    </div>
    <PersonalInfo
      v-if="surveyStep == 1"
    />
    <PoliticalInfo
      v-if="surveyStep == 2"
    />
    <div class="umfrageButtons">
      <BaseButton
        v-if="surveyStep == 0"
        @click="updateSurveyFinished(); updateSurveyStep(-1);"
      >
        Nein, Direkt zu den Thesen.
      </BaseButton>
      <BaseButton
        v-if="surveyStep == 0"
        @click="updateSurveyStep(surveyStep + 1)"
      >
        Los gehts!
      </BaseButton>
      <BaseButton
        v-if="surveyStep == 1 || surveyStep == 2"
        :disabled="surveyStep == 1"
        @click="updateSurveyStep(surveyStep - 1)"
      >
        Zurück
      </BaseButton>
      <BaseButton
        v-if="surveyStep == 1"
        @click="updateSurveyStep(surveyStep + 1)"
      >
        Weiter
      </BaseButton>
      <BaseButton
        v-if="surveyStep == 2"
        @click="finishSurvey();"
      >
        Umfrage Absenden
      </BaseButton>
    </div>
  </PageSection>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import PageSection from '@/components/elements/PageSection.vue';
import BaseButton from '@/components/elements/BaseButton.vue';
import PersonalInfo from '@/components/views/home/sections/08-survey/PersonalInfo.vue';
import PoliticalInfo from '@/components/views/home/sections/08-survey/PoliticalInfo.vue';


export default {
  name: 'SurveySection',
  components: {
    PageSection,
    BaseButton,
    PersonalInfo,
    PoliticalInfo,
  },
  computed: {
    ...mapGetters({
      surveyStep: 'survey/surveyStep',
    }),
  },
  methods: {
    ...mapMutations('survey', {
      updateSurveyStep: 'updateSurveyStep',
      updateSurveyFinished: 'updateSurveyFinished',
    }),

    ...mapActions('survey', {
      sendSurvey: 'sendSurvey',
    }),

    finishSurvey() {
      console.log('survey absenden');
      this.updateSurveyFinished();
      this.updateSurveyStep(3);
      setTimeout(() => {
        this.updateSurveyStep(-1);
        this.sendSurvey();
      }, 3000);
    },
  },
};


</script>

<style lang="scss">
.survey-section {
  background-color: #ffd01c;
  color: #000000;
}

.survey-section__heading {
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1.25;
  margin-bottom: 1.5em;
  @media (min-width: 40em) {
    font-size: 1.875em;
  }
  @media (min-width: 64em) {
    font-size: 2.25em;
  }
}

.survey-section__text {
  @media (min-width: 40em) {
    font-size: 1.25em;
  }
  @media (min-width: 64em) {
    font-size: 1.5em;
  }
}

.umfrageSelect {
  height: 100%;
  padding: 5px;
  border: none;
  border-radius: 4px;
  border: 2px solid #ccc;
  @media (min-width: 0em) {
    width: 100%;
  }
  @media (min-width: 50em) {
    width: 250px;
  }
}

.umfragelabel{
  @media (min-width: 40em) {
    font-size: 1.25em;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
}

.umfragePart{
  @media (min-width: 50em) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  margin: 40px 0;
}

.umfrageButtons{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
