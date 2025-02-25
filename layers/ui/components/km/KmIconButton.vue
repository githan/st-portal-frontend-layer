<template>
  <KaButton
    class="KmIcon_Button"
    :class="[`_${size}`, `_${variant}`, { _disabled: disabled }]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <template v-if="iconPrepend">
      <KaIcon :name="iconPrepend" />
    </template>
    <slot></slot>
    <template v-if="iconAppend">
      <KaIcon :name="iconAppend" />
    </template>
  </KaButton>
</template>
  
  <script setup lang="ts">
import { ICON_LIST } from '@/components/parts/Icon.vue';

export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'icon';

type Props = {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  /** ラベルの左側に表示するアイコン */
  iconPrepend?: (typeof ICON_LIST)[number];
  /** ラベルの右側に表示するアイコン */
  iconAppend?: (typeof ICON_LIST)[number];
};

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  variant: 'primary',
  disabled: false,
  type: 'button',
  iconPrepend: undefined,
  iconAppend: undefined,
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
@use '@/assets/styles/variables' as v;

.KmIcon_Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: v.space(2);

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }

  &._primary {
    color: v.$primary-button-text;
    background-color: v.$primary-button-default;

    &._disabled {
      background-color: v.$primary-button-disabled;
    }
  }

  &._secondary {
    color: v.$secondary-button-text;
    background-color: v.$secondary-button-default;
    border: 2px solid v.$secondary-button-border;

    &._disabled {
      background-color: v.$secondary-button-disabled;
    }

    &._large {
      border: 3px solid v.$secondary-button-border;
    }
  }

  &._small {
    min-height: 40px;
    padding: v.space(2.5) v.space(6);
  }
  &._medium {
    min-height: 48px;
    padding: v.space(3.5) v.space(6);
  }
  &._large {
    min-height: 56px;
    padding: v.space(4.5) v.space(6);
  }
}
</style>
  