<template>
  <div>
    <h2 class="survey-section__heading">Umfrage (Seite 1 von 2)</h2>
    <div class="umfragePart">
      <label class="umfragelabel" for="gender">Bitte geben Sie Ihr Geschlecht an</label>
      <select name="gender" @change="handleGenderChange($event)" class="umfrageSelect">
        <option
          v-for="option in geschlechtOptions"
          :key="'geschlecht' + option"
          :value="geschlechtOptions.indexOf(option)"
          :selected="geschlecht == geschlechtOptions.indexOf(option)"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="age">Wie alt sind Sie?</label>
      <input
        type="number"
        id="quantity"
        name="age"
        min="1"
        max="120"
        @change="handleAgeChange($event)"
        :value="alter != 0 ? alter : ''"
        class="umfrageSelect"
      />
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="bildungsabschluss">
        Was ist Ihr höchster Bildungsabschluss?</label
      >
      <select
        name="bildungsabschluss"
        @change="handleAbschlussChange($event)"
        class="umfrageSelect"
      >
        <option
          v-for="option in abschlussOptions"
          :key="'abschluss' + option"
          :value="abschlussOptions.indexOf(option)"
          :selected="bildungsabschluss == abschlussOptions.indexOf(option)"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div v-if="districts && districts.length > 2" class="umfragePart">
      <label class="umfragelabel" for="districts">In welchem Stadtteil wohnen Sie?</label>
      <select name="districts" @change="handleDistrictChange($event)" class="umfrageSelect">
        <option
          v-for="district in districts"
          :key="'stadtteil' + district"
          :selected="stadtteil == district"
        >
          {{ district }}
        </option>
      </select>
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="wahlberechtigt">
        Sind Sie bei der Hessischen<br />
        Kommunalwahl 2021 wahlberechtigt?
      </label>
      <select
        name="wahlberechtigt"
        @change="handleWahlBerechtigtChange($event)"
        class="umfrageSelect"
      >
        <option
          v-for="option in wahlberechtigtOptions"
          :key="option"
          :value="wahlberechtigtOptions.indexOf(option)"
          :selected="wahlberechtigt == wahlberechtigtOptions.indexOf(option)"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'PersonalInfo',
  components: {},
  props: {},
  computed: {
    ...mapGetters({
      districts: 'survey/districts',
      geschlechtOptions: 'survey/geschlechtOptions',
      abschlussOptions: 'survey/abschlussOptions',
      wahlberechtigtOptions: 'survey/wahlberechtigtOptions',
    }),

    ...mapState('survey', [
      'geschlecht',
      'alter',
      'bildungsabschluss',
      'stadtteil',
      'wahlberechtigt',
    ]),
  },
  methods: {
    ...mapMutations('survey', {
      updateWahlberechtigt: 'updateWahlberechtigt',
      updateGeschlecht: 'updateGeschlecht',
      updateAlter: 'updateAlter',
      updateBildungsabschluss: 'updateBildungsabschluss',
      updateStadtteil: 'updateStadtteil',
    }),
    handleDistrictChange(event) {
      this.updateStadtteil(event.target.value);
    },
    handleGenderChange(event) {
      this.updateGeschlecht(event.target.value);
    },
    handleAgeChange(event) {
      this.updateAlter(event.target.value);
    },
    handleAbschlussChange(event) {
      this.updateBildungsabschluss(event.target.value);
    },
    handleWahlBerechtigtChange(event) {
      this.updateWahlberechtigt(event.target.value);
    },
  },
};
</script>

<style lang="scss"></style>
