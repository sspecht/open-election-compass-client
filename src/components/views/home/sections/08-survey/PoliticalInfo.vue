<template>
  <div>
    <h2>Umfrage Seite 2/2</h2>
    <div class="umfragePart">
      <label class="umfragelabel" for="wahlberechtigt">
        Sind Sie bei der Hessischen<br>
        Kommunalwahl 2021 wahlberechtigt?
      </label>
      <select name="wahlberechtigt"
        @change="handleWahlBerechtigtChange($event)"
        class="umfrageSelect"
      >
        <option v-for="option in wahlberechtigtOptions"
          :key="option"
          :value="wahlberechtigtOptions.indexOf(option)"
          :selected="wahlberechtigt == wahlberechtigtOptions.indexOf(option)"
        >
        {{ option }}
        </option>
      </select>
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="turnout">
        Haben Sie vor sich an der<br>
        Hessischen Kommunalwahl 2021 zu beteiligen?
      </label>
      <select
        name="turnout"
        @change="handleTurnoutChange($event)"
        class="umfrageSelect"
        :disabled="wahlberechtigt == 2"
        >
        <option v-for="option in turnoutOptions"
          :key="option"
          :value="turnoutOptions.indexOf(option)"
          :selected="turnout== turnoutOptions.indexOf(option)"
        >
        {{ option }}
        </option>
      </select>
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="vote_local">
        Welchem Wahlbündnis/welcher Partei werden<br>
        Sie bei der Kommunalwahl voraussichtlich<br>
        die meisten Stimmen geben?
      </label>
      <select
        name="vote_local"
        @change="handleVote_localChange($event)"
        class="umfrageSelect"
        :disabled="wahlberechtigt == 2"
      >
        <option
          value="''"
          :selected="vote_local == ''"
        ></option>
        <option
          v-for="party in parties"
          :key="party.index"
          :value="party.alias"
          :selected="vote_local == party.alias"
          >
          {{ $t(`parties.${party.index}.short`) }}
        </option>
      </select>
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="vote_btw">
        Welche Partei würden Sie wählen,<br>
        wenn am nächsten Sonntag Bundestagswahl wäre?
      </label>
      <select name="vote_btw" @change="handleVote_btwChange($event)" class="umfrageSelect">
        <option
          v-for="option in voteBtwOptions"
          :key="option"
          :value="voteBtwOptions.indexOf(option)"
          :selected="vote_btw == voteBtwOptions.indexOf(option)"
        >
        {{ option }}
        </option>
      </select>
    </div>
    <div class="umfragePart">
      <label class="umfragelabel" for="polint">
        Einmal ganz allgemein gesprochen,<br>
        wie sehr interessieren Sie sich für Politik?
      </label>
      <select name="polint" @change="handlePolintChange($event)" class="umfrageSelect">
        <option v-for="option in polintOptions"
          :key="option"
          :value="polintOptions.indexOf(option)"
          :selected="polint== polintOptions.indexOf(option)"
        >
        {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'PoliticalInfo',
  components: {},
  props: {},
  computed: {
    // console: () => console,
    ...mapGetters({
      parties: 'parties/parties',
      wahlberechtigtOptions: 'survey/wahlberechtigtOptions',
      turnoutOptions: 'survey/turnoutOptions',
      voteBtwOptions: 'survey/voteBtwOptions',
      polintOptions: 'survey/polintOptions',
    }),

    ...mapState('survey', ['wahlberechtigt', 'turnout', 'vote_btw', 'vote_local', 'polint']),
  },
  methods: {
    ...mapMutations('survey', {
      updateWahlberechtigt: 'updateWahlberechtigt',
      updateTurnout: 'updateTurnout',
      updateVote_local: 'updateVote_local',
      updateVote_btw: 'updateVote_btw',
      updatePolint: 'updatePolint',
    }),
    handleWahlBerechtigtChange(event) {
      this.updateWahlberechtigt(event.target.value);
    },
    handleTurnoutChange(event) {
      this.updateTurnout(event.target.value);
    },
    handleVote_localChange(event) {
      this.updateVote_local(event.target.value);
    },
    handleVote_btwChange(event) {
      this.updateVote_btw(event.target.value);
    },
    handlePolintChange(event) {
      this.updatePolint(event.target.value);
    },
  },
};
</script>

<style lang="scss">

</style>
