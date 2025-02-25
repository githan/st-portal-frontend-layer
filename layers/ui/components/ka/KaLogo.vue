<template>
  <KaImage
    :src="srcMap[theme || 'light'][props.size]"
    :alt="alt"
    class="KaLogo"
    :class="[`_${props.size}`]"
  />
</template>

<script lang="ts" setup>
import LogoBlue from '@/assets/images/logos/blue.svg';
import LogoWhiteLarge from '@/assets/images/logos/white-large.svg';
import LogoWhite from '@/assets/images/logos/white.svg';
import type { ThemeProviderProps } from '@/components/providers/ThemeProvider.vue';

/** Logoのprops */
type LogoProps = {
  /** サイズ */
  size?: 'medium' | 'large';
};

const props = withDefaults(defineProps<LogoProps>(), {
  size: 'medium',
});

/** テーマ */
const theme = inject<ThemeProviderProps['theme']>('theme', 'light');

/** ロゴマッピング */
const srcMap = {
  dark: {
    medium: LogoWhite,
    large: LogoWhiteLarge,
  },
  light: {
    medium: LogoBlue,
    large: LogoBlue, // NOTE: 現状使用しないためmediumを指定
  },
};

/** alt属性 */
const alt = computed(() => {
  if (props.size === 'large') return 'KDX ST パートナーズ株式会社';
  return 'KDX';
});
</script>

<style lang="scss" scoped>
.KaLogo {
  &._medium {
    width: func.rem(59);
    height: func.rem(24);
  }
  &._large {
    width: func.rem(284);
    height: func.rem(28.55);
  }
}
</style>
