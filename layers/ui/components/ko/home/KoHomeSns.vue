<i18n lang="yaml">
  ja:
    image-alt: 新CM 公開中 「いい不動産の美術館」篇 CMギャラリー
  en:
    image-alt: New CM is now open 「Good Real Estate Museum」 CM Gallery
</i18n>

<template>
  <div class="KoHome_Sns u-grid u-gap-y-xl u-md-gap-y-4xl">
    <KoAddLine />
    <KoSns />
  </div>
</template>

<script setup lang="ts">
const { isSpLayout } = useDetectSpLayout();
const {
  public: { SNSLink },
} = useRuntimeConfig();
</script>

<style lang="scss" scoped>
.KoHome_Sns {
  padding-right: func.rem(16);
  padding-left: func.rem(16);

  @include mq(pc) {
    max-width: calc(640px + func.rem(80));
    padding-right: func.dynamic-calc-md(20, 40);
    padding-left: func.dynamic-calc-md(20, 40);
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
