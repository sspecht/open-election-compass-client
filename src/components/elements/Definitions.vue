<script>
export default {
  name: 'Definitions',
  functional: true,
  props: {
    text: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, { props }) {
    const textSections = props.text.split('>');
    const sections = textSections.map((section, index, all) => {
      if (index < all.length - 1) {
        return `${section}>`;
      }
      return section;
    });

    const nodes = sections.map((section) => {
      const sectionNodes = section.split(/(\[.*\]<.*>)/);
      return sectionNodes
        .map((node) => {
          const matches = node.match(/\[(.*)\]<(.*)>/);
          if (props.disabled && matches !== null) {
            return matches[1];
          }
          if (matches === null) {
            return node;
          }
          return createElement(
            'span',
            {
              class: 'definitions__expression',
              attrs: {
                content: `${matches[1]}: ${matches[2]}`,
              },
              directives: [
                {
                  name: 'tooltip',
                  value: {
                    allowHTML: false,
                    distance: 10,
                    hideOnClick: false,
                    size: 'large',
                    theme: 'left',
                  },
                },
              ],
            },
            [matches[1]]
          );
        })
        .filter((node) => node !== '');
    });
    return createElement(
      'span',
      {
        class: 'definitions',
      },
      Array.prototype.concat.apply([], nodes)
    );
  },
};
</script>

<style lang="scss">
.definitions__expression {
  cursor: pointer;
  border-bottom: 2px dotted currentColor;
  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.tippy-tooltip.left-theme .tippy-content {
  text-align: left;
}
</style>
