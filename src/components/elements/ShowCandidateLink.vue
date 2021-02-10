<template>
  <div class="show-more" :aria-label="text">
    <span>
      <a :href="`/candidates/${url}`" target="_blank" rel="noopener" class="show-more__toggle">{{
        text
      }}</a>
      {{ $t('newtab') }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ShowCandidateLink',
  data() {
    return {
      more: false,
    };
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  computed: {},
  methods: {},
};
</script>

<i18n>
{
  "en": {
    "newtab": "(Opens in new page.)"
  },
  "de": {
    "newtab": "(Öffnet in neuer Seite.)"
  }
}
</i18n>

<style lang="scss">
.show-more__toggle {
  font-weight: bold;
  cursor: pointer;
  color: black;
}

.show-more__toggle:hover {
  text-decoration: underline;
  color: inherit;
}
</style>
