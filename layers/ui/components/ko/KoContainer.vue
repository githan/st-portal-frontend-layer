<template>
  <div
    :class="[
      'KoContainer',
      typeof props.width === 'string' && `_${props.width}`,
      typeof props.width === 'object' && [
        props.width.base && `_${props.width.base}`,
        props.width.md && `_md-${props.width.md}`,
      ],
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
/** wide=1200px, narrow=1000px, full=100vw */
type widthProps = 'auto' | 'wide' | 'narrow' | 'full';

type Props = {
  /** 幅を指定 */
  width?:
    | widthProps
    | {
        base?: widthProps;
        md?: widthProps;
      };
};

const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
});
</script>

<style lang="scss" scoped>
$narrow-width: 1000px;
$wide-width: 1200px;

.KoContainer {
  &._full {
    @include full-width;
  }
  &._wide {
    @include mq(sp) {
      padding-right: func.dynamic-calc-sm(16, 24);
      padding-left: func.dynamic-calc-sm(16, 24);
    }

    @include mq(pc) {
      width: 100%;
      max-width: calc($wide-width + func.dynamic-calc-md(40, 80));
      padding-right: func.dynamic-calc-md(20, 40);
      padding-left: func.dynamic-calc-md(20, 40);
      margin-inline: auto;
    }
  }
  &._narrow {
    @include mq(sp) {
      padding-right: func.dynamic-calc-sm(16, 24);
      padding-left: func.dynamic-calc-sm(16, 24);
    }

    @include mq(pc) {
      max-width: calc($narrow-width + func.dynamic-calc-md(40, 80));
      padding-right: func.dynamic-calc-md(20, 40);
      padding-left: func.dynamic-calc-md(20, 40);
      margin-inline: auto;
    }
  }

  @each $breakpoint, $px in var.$screens {
    @include mq($breakpoint) {
      &._#{$breakpoint}-auto {
        max-width: 100%;
        padding-right: 0;
        padding-left: 0;
        margin-inline: 0;
      }
      &._#{$breakpoint}-full {
        @include full-width;
      }
      &._#{$breakpoint}-wide {
        max-width: calc($wide-width + func.dynamic-calc-md(40, 80));
        padding-right: func.dynamic-calc-md(20, 40);
        padding-left: func.dynamic-calc-md(20, 40);
        margin-inline: auto;
      }
      &._#{$breakpoint}-narrow {
        max-width: calc($narrow-width + func.dynamic-calc-md(40, 80));
        padding-right: func.dynamic-calc-md(20, 40);
        padding-left: func.dynamic-calc-md(20, 40);
        margin-inline: auto;
      }
    }
  }
}
</style>
