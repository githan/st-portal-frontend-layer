<template>
  <button
    class="KaButton"
    :class="[`_${size}`, `_${variant}`, { _disabled: disabled }]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

  <script setup lang="ts">
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary';

type Props = {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  variant: 'primary',
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style lang="scss" scoped>
.KaButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-right: func.rem(22);
  padding-left: func.rem(22);
  vertical-align: middle;
  border-style: solid;
  border-radius: func.rem(8);

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }

  &._primary {
    color: var(--color-white);
    background-color: var(--color-cta-600);
    border-color: var(--color-cta-600);

    &:not(._disabled) {
      @include on-hover-opacity;
    }
  }
  &._secondary {
    color: var(--color-grey-800);
    background-color: rgb(255 255 255 / 80%);
    border-color: var(--color-grey-800);

    &:not(._disabled) {
      @include on-hover-opacity;
    }
  }

  &._disabled {
    color: var(--color-white);
    pointer-events: none;
    background-color: var(--color-grey-300);
    border-color: var(--color-grey-300);
  }

  @mixin small {
    gap: func.rem(4);
    min-height: func.rem(36);
    padding-top: func.rem(8);
    padding-bottom: func.rem(8);
    font-size: func.rem(14);
    line-height: 1.25;

    @include letter-spacing(-5);
    border-width: 2px;
    .Button_Icon {
      width: func.rem(16);
      height: func.rem(16);
    }
  }

  @mixin medium {
    gap: func.rem(8);
    min-height: func.rem(48);
    padding-top: func.rem(12);
    padding-bottom: func.rem(12);
    border-width: 2px;

    @include text(button2);
  }

  @mixin large {
    gap: func.rem(8);
    min-height: func.rem(56);
    padding-top: func.rem(13);
    padding-bottom: func.rem(13);
    border-width: 3px;

    @include text(button1);
  }

  &._small {
    @include small;
  }
  &._medium {
    @include medium;
  }
  &._large {
    @include large;
  }

  @each $breakpoint, $px in var.$screens {
    @include mq($breakpoint) {
      &._#{$breakpoint}-small {
        @include small;
      }
      &._#{$breakpoint}-medium {
        @include medium;
      }
      &._#{$breakpoint}-large {
        @include large;
      }
    }
  }
}
</style>
