<template>
  <button
    type="button"
    :disabled="props.disabled"
    class="KaButtonIcon"
    :class="[
      `_${theme}`,
      typeof props.size === 'string' && `_${props.size}`,
      typeof props.size === 'object' && [
        props.size.base && `_${props.size.base}`,
        props.size.md && `_md-${props.size.md}`,
      ],
      {
        _active: props.active,
      },
    ]"
  >
    <span class="IconButton_Inner">
      <template v-if="props.icon">
        <template v-if="!props.active">
          <PartsIcon
            :name="props.icon"
            :size="props.size === 'large' ? 24 : props.size === 'small' ? 16 : 20"
            aria-hidden="true"
            class="IconButton_Icon"
          />
        </template>
        <template v-else>
          <PartsIconActiveIndicator>
            <PartsIcon
              :name="props.icon"
              :size="props.size === 'large' ? 24 : props.size === 'small' ? 16 : 20"
              aria-hidden="true"
              class="IconButton_Icon"
            />
          </PartsIconActiveIndicator>
        </template>
      </template>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ICON_LIST } from '@/components/parts/Icon.vue';
import type { ThemeProviderProps } from '@/components/providers/ThemeProvider.vue';

/** サイズ */
type SizeTypes = 'large' | 'medium' | 'small';

type Props = {
  /** サイズ */
  size?:
    | SizeTypes
    | {
        base?: SizeTypes;
        md?: SizeTypes;
      };
  /** アイコン */
  icon?: (typeof ICON_LIST)[number];
  /** 非活性フラグ */
  disabled?: boolean;
  /** 条件絞り込みアイコン用アクティブ表示 */
  active?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  icon: undefined,
  disabled: false,
  active: false,
});

/** テーマ */
const theme = inject<ThemeProviderProps['theme']>('theme', 'light');
</script>

<style lang="scss" scoped>
.KaButtonIcon {
  position: relative;
  font-family: var(--font-default);
  font-size: func.rem(12);
  font-weight: 700;
  line-height: 1;
  color: var(--color-white);
  border-radius: func.rem(32);
  &._light {
    box-shadow:
      0 0 18px 0 rgb(20 20 20 / 5%),
      0 4px 8px 0 rgb(20 20 20 / 15%);
    &::before {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      content: '';

      background:
        url('@/assets/images/bg-icon-button.png'),
        lightgray 50% / cover no-repeat;
      backdrop-filter: blur(func.rem(9));
      border: 1px solid rgb(255 255 255 / 80%);
      border-radius: func.rem(32);
      box-shadow:
        -0.25px 0.25px 0.5px -1.5px rgb(255 255 255 / 35%) inset,
        0 0 1px 0 rgb(255 255 255 / 35%) inset;
    }
  }
  &._dark {
    box-shadow:
      0 0 18px 0 rgb(20 20 20 / 5%),
      0 4px 8px 0 rgb(20 20 20 / 15%);
  }
  &:disabled {
    color: var(--color-grey-400);
  }
}

.IconButton_Inner {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: var(--font-alphanumeric);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  backdrop-filter: blur(func.rem(9));
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: func.rem(32);
  box-shadow:
    -0.25px 0.25px 0.5px -1.5px rgb(255 255 255 / 35%) inset,
    0 0 1px 0 rgb(255 255 255 / 35%) inset;
  .KaIconButton._light & {
    background-image: url('@/assets/images/texture-noise.png');
  }
  .KaIconButton._dark & {
    background-image: linear-gradient(0deg, rgb(255 255 255 / 5%) 0%, rgb(255 255 255 / 5%) 100%),
      url('@/assets/images/texture-noise.png');
  }

  .KaIconButton._active & {
    border-color: var(--color-cta-600);
  }

  @include is-mouse {
    .KaIconButton:not(:disabled):hover & {
      background-color: rgba(#bacef8, 0.5);
    }
  }

  @include is-touch {
    .KaIconButton:not(:disabled):active & {
      background-color: rgba(#bacef8, 0.5);
    }
  }

  .KaIconButton._large & {
    gap: func.rem(4);
    min-width: func.rem(75);
    min-height: func.rem(40);
    padding: func.rem(4 - 1) func.rem(16);
  }
  .KaIconButton._medium & {
    min-width: func.rem(50);
    min-height: func.rem(28);
    padding: func.rem(4 - 1) func.rem(8);
  }
  .KaIconButton._small & {
    min-width: func.rem(32);
    min-height: func.rem(18);
    padding: func.rem(1) func.rem(8);
  }

  @each $breakpoint, $px in var.$screens {
    @include mq($breakpoint) {
      .KaIconButton._#{$breakpoint}-large & {
        gap: func.rem(4);
        min-width: func.rem(75);
        min-height: func.rem(40);
        padding: func.rem(4) func.rem(16);
      }
      .KaIconButton._#{$breakpoint}-medium & {
        min-width: func.rem(50);
        min-height: func.rem(28);
        padding: func.rem(4) func.rem(8);
      }
      .IconButton._#{$breakpoint}-small & {
        min-width: func.rem(32);
        min-height: func.rem(18);
        padding: func.rem(1) func.rem(8);
      }
    }
  }
}

.IconButton_Icon {
  background-color: var(--color-white);
  .IconButton:disabled & {
    background-color: var(--color-grey-400);
  }
}
</style>
