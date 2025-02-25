
<template>
  <component
    :is="component"
    class="KaHeading"
    :class="[
      typeof props.variant === 'string' && `_${props.variant}`,
      typeof props.variant === 'object' && [
        props.variant.base && `_${props.variant.base}`,
        props.variant.md && `_md-${props.variant.md}`,
      ],
      typeof props.textAlign === 'string' && `_${props.textAlign}`,
      typeof props.textAlign === 'object' && [
        props.textAlign.base && `_${props.textAlign.base}`,
        props.textAlign.md && `_md-${props.textAlign.md}`,
      ],
      `_${theme}`,
    ]"
  >
    <span class="text-wrapper" :class="$slots.cta || ($slots.iconPrepend && 'u-flex u-gap-x-2xs')">
      <template v-if="$slots.iconPrepend">
        <span class="icon-prepend">
          <slot name="iconPrepend"></slot>
        </span>
      </template>
      <slot></slot>
    </span>
    <template v-if="$slots.cta">
      <span class="cta">
        <slot name="cta"> </slot>
      </span>
    </template>
  </component>
</template>

<script lang="ts">
/** バリエーション */
export const HEADING_VARIANTS = {
  variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'article-h1'],
  textAlign: ['left', 'center', 'right'],
} as const;
</script>

<script lang="ts" setup>
/** Headingのvariant props */
type HeadingVariantType = (typeof HEADING_VARIANTS.variant)[number];

/** HeadingのtextAlign props */
type HeadingTextAlignType = (typeof HEADING_VARIANTS.textAlign)[number];

/** Headingのprops */
type HeadingProps = {
  /** バリエーション */
  variant?:
    | HeadingVariantType
    | {
        base?: HeadingVariantType;
        md?: HeadingVariantType;
      };
  /** タグ名 */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /** text-align */
  textAlign?:
    | HeadingTextAlignType
    | {
        base?: HeadingTextAlignType;
        md?: HeadingTextAlignType;
      };
  theme?: 'light' | 'dark';
};

const props = withDefaults(defineProps<HeadingProps>(), {
  variant: () => {
    return 'h1';
  },
  as: undefined,
  textAlign: undefined,
  theme: 'light',
});

/** コンポーネント名を返却 */
const component = computed(() => {
  if (props.as) return props.as;
  if (props.variant === 'article-h1') return 'h1';
  return props.variant;
});
</script>

<style lang="scss" scoped>
.KaHeading {
  display: flex;
  column-gap: func.rem(8);
  justify-content: space-between;

  &._h1 {
    @include text(h1);
  }
  &._h2 {
    @include text(h2);
  }
  &._h3 {
    @include text(h3);
  }
  &._h4 {
    @include text(h4);
  }
  &._h5 {
    @include text(h5);
  }
  &._article-h1 {
    @include text(article-h1);
  }

  @each $breakpoint, $px in var.$screens {
    @include mq($breakpoint) {
      &._#{$breakpoint}-h1 {
        @include text(h1);
      }
      &._#{$breakpoint}-h2 {
        @include text(h2);
      }
      &._#{$breakpoint}-h3 {
        @include text(h3);
      }
      &._#{$breakpoint}-h4 {
        @include text(h4);
      }
      &._#{$breakpoint}-h5 {
        @include text(h5);
      }
      &._#{$breakpoint}-article-h1 {
        @include text(article-h1);
      }
    }
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
    color: var(--color-white);
  }

  .text-wrapper {
    flex: 1;
    word-break: break-all;

    .icon-prepend {
      flex-shrink: 0;
    }
  }

  .icon-prepend,
  .cta {
    display: inline-flex;
    align-items: center;

    .Heading._h1 & {
      /** font-size * line-height */
      height: calc(1em * (52 / 44));

      @include mq(pc) {
        height: calc(1em * (64 / 52));
      }
    }
    .Heading._h2 & {
      /** font-size * line-height */
      height: calc(1em * (40 / 32));

      @include mq(pc) {
        height: calc(1em * (44 / 36));
      }
    }
    .Heading._h3 & {
      /** font-size * line-height */
      height: calc(1em * (32 / 24));
    }
  }

  .cta {
    font-family: var(--font-default);
  }
}
</style>
