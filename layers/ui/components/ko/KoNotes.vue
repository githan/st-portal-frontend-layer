<template>
  <aside class="KoNotes" :class="[`_${props.color}`]">
    <template v-if="props.title">
      <p class="title">
        <span class="text">
          {{ props.title }}
        </span>
      </p>
    </template>
    <slot></slot>
  </aside>
</template>

<script lang="ts" setup>
/** Notesのprops */
type Props = {
  /** タイトル */
  title?: string;
  /** 背景色 */
  color?: 'grey' | 'white';
};

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  color: 'grey',
});
</script>

<style lang="scss" scoped>
.KoNotes {
  display: flex;
  flex-direction: column;
  row-gap: func.rem(16);
  padding: func.rem(32) func.rem(24);
  background-color: var(--color-grey-50);

  > .title {
    position: relative;
    color: var(--color-grey-800);
    text-align: center;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 0;
      display: inline-block;
      width: 100%;
      height: func.rem(1);
      content: '';
      background-color: var(--color-grey-500);
      transform: translateY(-50%);
    }
  }

  > .title > .text {
    @include text(h5);
    position: relative;
    z-index: 1;
    display: inline-block;
    padding-right: func.rem(16);
    padding-left: func.rem(16);
    background-color: var(--color-grey-50);
  }

  &._white {
    background-color: var(--color-white);

    .text {
      background-color: var(--color-white);
    }
  }
}
</style>
