
<template>
  <component
    :is="component"
    :type="component === 'button' ? 'button' : undefined"
    :to="component !== 'button' ? props.href : undefined"
    :target="component !== 'button' && props.external ? '_blank' : undefined"
    :rel="component !== 'button' ? props.rel : undefined"
    :class="[`_${theme}`]"
    class="KaLink"
    @click="clickMeasurement"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import type { ThemeProviderProps } from '@/components/providers/ThemeProvider.vue';

/** Linkのprops */
type LinkProps = (
  | {
      /** タグ名 */
      as?: 'a';
      /** href属性 */
      href?: string;
      /** 外部リンクフラグ */
      external?: boolean;
      /** rel属性 */
      rel?: string;
    }
  | {
      /** タグ名 */
      as: 'button';
    }
) & {
  /** 開発用キー */
  developmentKey?: string;
};

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'a',
  href: undefined,
  external: false,
  rel: undefined,
  developmentKey: undefined,
});

/** テーマ */
const theme = inject<ThemeProviderProps['theme']>('theme', 'light');

/** コンポーネントがリンクかボタンかを返却 */
const component = computed(() => {
  if (props.as === 'a') return defineNuxtLink({});
  return 'button';
});

/** クリック計測 */
const { sendClickMeasurement } = useMeasurements();
const clickMeasurement = () => {
  !!props.developmentKey && sendClickMeasurement(props.developmentKey);
};
</script>

<style lang="scss" scoped>
.KaLink {
  font-weight: 700;
  text-decoration: underline;
  vertical-align: baseline;

  @include is-mouse {
    &:hover {
      text-decoration: none;
    }
  }

  @include is-touch {
    &:active {
      text-decoration: none;
    }
  }

  &._light {
    color: var(--color-cta-600);
  }
  &._dark {
    color: var(--color-cta-200);
  }
}
</style>
