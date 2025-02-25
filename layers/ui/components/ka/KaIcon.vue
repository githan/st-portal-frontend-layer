<template>
  <i
    role="img"
    class="KaIcon"
    :class="[`_${name}`, color && '_colorFilled']"
    :style="styleObject"
  />
</template>

<script lang="ts" setup>
/** アイコン名 */
import { ICON_LIST } from '@/components/parts/Icon.vue';

/** アイコン名の型 */
export type IconNameType = (typeof ICON_LIST)[number];

/** サイズ（px） */
export type IconSizeType = 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 96;

/** Iconのprops */
type IconProps = {
  /** アイコン名を指定 */
  name: IconNameType;
  /** 'grey-800', 'kdx-blue-300' などの文字色を指定 */
  color?: string;
  /** サイズ（px） */
  size?: IconSizeType;
};

const props = withDefaults(defineProps<IconProps>(), {
  name: undefined,
  size: undefined,
  color: undefined,
});

const styleObject = computed(() => {
  return {
    ...(props.color && { '--color': `var(--color-${props.color})` }),
    ...(props.size && {
      width: `calc((${props.size} / 16) * 1rem)`,
      height: `calc((${props.size} / 16) * 1rem)`,
    }),
  };
});
</script>

<style lang="scss" scoped>
/* stylelint-disable scss/dollar-variable-colon-space-after */
/* stylelint-disable-next-line comment-empty-line-before */
/* prettier-ignore */
$icons:
  '3d',
  'accent-arrow-left',
  'accent-arrow-right',
  'accent-arrow-up',
  'add-circle',
  'alert-circle',
  'alert-fill',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'assets',
  'auth',
  'author',
  'bell',
  'book-open',
  'calculator',
  'calendar',
  'campaign',
  'check',
  'check-circle',
  'checkbox-off',
  'checkbox-on',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'close',
  'close-circle',
  'download',
  'edit',
  'empty',
  'enquiry',
  'error-circle',
  'error-fill',
  'exit',
  'failed-fill',
  'faq',
  'filter',
  'gps',
  'health',
  'heart',
  'heart-filled',
  'heart-outlined',
  'help-circle',
  'history',
  'home',
  'hotel',
  'id',
  'info-fill',
  'infrastructure',
  'internet',
  'jpg',
  'keyword',
  'list',
  'location',
  'lock',
  'mail',
  'mall',
  'map',
  'menu',
  'minus',
  'new-window',
  'number-1',
  'number-2',
  'number-3',
  'number-4',
  'office',
  'others',
  'pdf',
  'plus',
  'procedure',
  'radio-off',
  'radio-on',
  'repeat',
  'residence',
  'search',
  'select-all',
  'setting',
  'share',
  'shield',
  'shield-inactive',
  'shield-lock',
  'slide-view',
  'sort',
  'spinner',
  'success-fill',
  'tile-view',
  'trade',
  'trash',
  'undone',
  'unlock',
  'upload',
  'user',
  'wallet',
  'warehouse',
;
/* stylelint-enable scss/dollar-variable-colon-space-after */

/* prettier-ignore */
$colored-icons:
  'check-circle',
  'empty',
  'error-circle',
  'heart-filled',
  'shield',
  'shield-inactive',
  'shield-lock',
  'spinner'
;

.KaIcon {
  display: inline-block;

  @each $icon in $icons {
    &._#{$icon} {
      @if index($colored-icons, $icon) {
        background-image: url(@/assets/images/icons/#{$icon}.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        transition: background-image 0.2s ease-out;
      } @else {
        &._colorFilled {
          background-color: var(--color);
        }
        mask: url(@/assets/images/icons/#{$icon}.svg) no-repeat center center / contain;
      }
    }
  }
}
</style>
