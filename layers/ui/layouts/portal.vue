<template>
  <div class="Portal-Layout">
    <KoTheHeader class="header" />
    <slot />
    <KoTheFooter />
  </div>
</template>

<style lang="scss" scoped>
.Portal-Layout {
  > .header {
    position: sticky;
    top: 0;
    z-index: var(--z-index-header);
    grid-row: header-start / header-end;
  }
}
</style>