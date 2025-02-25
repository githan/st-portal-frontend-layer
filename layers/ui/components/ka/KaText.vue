<template>
  <component
    :is="props.as"
    class="KaText"
    :class="[
      typeof props.size === 'string' && `_${props.size}`,
      typeof props.size === 'object' && [
        props.size.base && `_${props.size.base}`,
        props.size.md && `_md-${props.size.md}`,
      ],
      typeof props.textAlign === 'string' && `_${props.textAlign}`,
      typeof props.textAlign === 'object' && [
        props.textAlign.base && `_${props.textAlign.base}`,
        props.textAlign.md && `_md-${props.textAlign.md}`,
      ],
      `_${theme}`,
      {
        _weightNormal: !props.bold,
        _weightBold: props.bold,
      },
      `_${props.font}`,
    ]"
    :style="styleObject"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
/** バリエーション */
const TEXT_SIZE_VARIANTS = [
  'xxx-large',
  'xx-large',
  'x-large',
  'large',
  'medium',
  'small',
  'x-small',
] as const;

/** TextのtextAlign propsの値 */
const TEXT_TEXT_ALIGN_VARIANTS = ['left', 'center', 'right'] as const;

/** TextのtextAlign props */
type TextTextAlignType = (typeof TEXT_TEXT_ALIGN_VARIANTS)[number];

type Props = {
  /** x-large=20px, large=18px, medium=16px, small=14px, x-small=12px */
  size?:
    | (typeof TEXT_SIZE_VARIANTS)[number]
    | {
        base?: (typeof TEXT_SIZE_VARIANTS)[number];
        md?: (typeof TEXT_SIZE_VARIANTS)[number];
      };
  /** 'grey-800', 'kdx-blue-300' などの文字色を指定 */
  color?: string;
  /** pやspanなどのタグ名を指定 */
  as?: string;
  /** font */
  font?: 'default' | 'alphanumeric';
  /** 太字フラグ */
  bold?: boolean;
  /** text-align */
  textAlign?:
    | TextTextAlignType
    | {
        base?: TextTextAlignType;
        md?: TextTextAlignType;
      };
  theme?: 'light' | 'dark';
};

const props = withDefaults(defineProps<Props>(), {
  size: () => {
    return 'medium';
  },
  color: undefined,
  as: 'p',
  font: 'default',
  bold: false,
  textAlign: undefined,
  theme: 'light',
});

const styleObject = reactive({
  ...(props.color && { color: `var(--color-${props.color})` }),
});
</script>

<style lang="scss" scoped>
.KaText {
  line-height: 1.5;

  @include letter-spacing(4);
  &._xxx-large {
    font-size: func.rem(24);
  }
  &._xx-large {
    font-size: func.rem(22);
  }
  &._x-large {
    font-size: func.rem(20);
  }
  &._large {
    font-size: func.rem(18);
  }
  &._medium {
    @include text(body1);
  }
  &._small {
    @include text(body2);
  }
  &._x-small {
    @include text(body3);
  }

  @each $breakpoint, $px in var.$screens {
    @include mq($breakpoint) {
      &._#{$breakpoint}-x-large {
        font-size: func.rem(20);
      }
      &._#{$breakpoint}-large {
        font-size: func.rem(18);
      }
      &._#{$breakpoint}-medium {
        font-size: func.rem(16);
      }
      &._#{$breakpoint}-small {
        font-size: func.rem(14);
      }
      &._#{$breakpoint}-x-small {
        font-size: func.rem(12);
      }
    }
  }

  &._alphanumeric {
    font-family: var(--font-alphanumeric);
  }

  &._weightNormal {
    font-weight: 400;
  }
  &._weightBold {
    font-weight: 700;
  }

  &._left {
    text-align: left;
  }
  &._center {
    text-align: center;
  }
  &._right {
    text-align: right;
  }

  @each $breakpoint, $px in var.$screens {
    @include mq($breakpoint) {
      &._#{$breakpoint}-left {
        text-align: left;
      }
      &._#{$breakpoint}-center {
        text-align: center;
      }
      &._#{$breakpoint}-right {
        text-align: right;
      }
    }
  }

  &._light {
    color: var(--color-grey-800);
  }
  &._dark {
    color: var(--color-grey-200);
  }
}
</style>
