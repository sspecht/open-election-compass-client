<template>
  <nav class="config-switch">
    <Modal
      :visible="visible"
      :heading="$t('heading')"
      :description="$t('description')"
      name="configs"
      width="narrow"
      icon="city"
      @close="$emit('close')"
      :buttons="[]"
    >
      <ul class="config-switch__menu" role="menu">
        <li v-for="config in configs" :key="config.key" class="config-switch__item" role="menuitem">
          <BaseButton
            theme="neutral"
            text-align="left"
            @click="activateConfig(config.key)"
            :disabled="config.key === ''"
          >
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
      return this.$store.getters['options/configList'];
    },
  },
  methods: {
    activateConfig( key ) {
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
    "heading": "Kommunalwahlkompass Hessen '21",
    "description": "Bitte wählen Sie Ihre Kommune."
  },
  "de": {
    "button": "Kommune",
    "heading": "Kommunalwahlkompass Hessen '21",
    "description": "Bitte wählen Sie Ihre Kommune."
  }
}
</i18n>
