<template>
  <nav class="config-switch">
    <Modal
      :visible="visible"
      :heading="$t('heading')"
      :description="$t('description')"
      name="configs"
      width="slim"
      icon="check"
      @close="$emit('close')"
    >
      <ul class="config-switch__menu" role="menu">
        <li v-for="config in configs" :key="config.key" class="config-switch__item" role="menuitem">
          <BaseButton theme="neutral" text-align="left" @click="activateConfig(config.key)">
            {{ config.name }}
          </BaseButton>
        </li>
      </ul>
    </Modal>
  </nav>
</template>

<script lang="js">
import BaseButton from '@/components/elements/BaseButton.vue';
import Modal from '@/components/elements/Modal.vue';

export default {
  name: 'SwitchConfig',
  components: {
    BaseButton,
    Modal,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    configs() {
      // return this.$store.getters['languages/languages'];
      return [
        {key:"short", name: "Gießen Short-Version"},
        {key: "Viernheim-853358842859", name: "Viernheim"},
        {key:"Gießen-805810740011", name: "Gießen"}
      ]
    },
  },
  methods: {
    activateConfig( key ) {
      // this.$store.commit('languages/activateLanguage', { code });
      this.$store.commit('options/setConfigKey', key );
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/core.scss';

.config-switch__menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.config-switch__item {
  & + & {
    margin-top: 0.5em;
  }
  button {
    width: 100%;
  }
}
</style>

<i18n>
{
  "en": {
    "button": "Kommune",
    "heading": "Kommune",
    "description": "Bitte wählen Sie die Kommune."
  },
  "de": {
    "button": "Kommune",
    "heading": "Kommune",
    "description": "Bitte wählen Sie die Kommune."
  }
}
</i18n>
