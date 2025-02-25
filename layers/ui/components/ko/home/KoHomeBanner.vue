<i18n lang="yaml">
  ja:
    image-alt: 新CM 公開中 「いい不動産の美術館」篇 CMギャラリー
  en:
    image-alt: New CM is now open 「Good Real Estate Museum」 CM Gallery
</i18n>

<template>
  <div class="KoHome_Banner">
    <NuxtLink to="/cm" class="banner">
      <KaImage
        src="/images/banner-cm-sp.jpg"
        :alt="t('image-alt')"
        class="u-md-hidden u-h-auto"
        width="720"
        height="406"
        lazy
      />
      <KaImage
        src="/images/banner-cm-pc.jpg"
        :alt="t('image-alt')"
        class="u-hidden u-md-block"
        width="902"
        height="162"
        lazy
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.KoHome_Banner {
  > .banner {
    @include on-hover-opacity;
  }
}
</style>
