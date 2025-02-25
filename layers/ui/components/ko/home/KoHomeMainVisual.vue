<i18n lang="yaml">
  ja:
    image-alt: プロが買う不動産を誰でも買える革命。
  en:
    image-alt: The revolution in which anyone can buy real estate that professionals buy.
</i18n>

<template>
  <div class="KoHome_MainVisual">
    <KaImage
      src="/images/home/main-visual-sp.jpg"
      width="768"
      height="1164"
      preload
      :alt="t('image-alt')"
      class="image u-md-hidden u-h-auto"
    />
    <KaImage
      src="/images/home/main-visual-pc.jpg"
      sizes="1080px lg:1280px xl:1440px xxl:1920px"
      preload
      :quality="90"
      :alt="t('image-alt')"
      class="image u-hidden u-md-block"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.KoHome_MainVisual {
  display: flex;
  justify-content: center;

  @include mq(pc) {
    position: relative;
    min-height: min(720px, calc(var(--vw, 1vw) * 100 * (720 / 1440)));
    overflow: hidden;
    background-image: linear-gradient(
        to right,
        transparent,
        transparent 25%,
        #1b3252 50%,
        #1b3252 100%
      ),
      linear-gradient(to bottom, #25395b, #21395a 13%, #22385a 47%, #1e3957 76%, #173154 100%);
  }

  > .image {
    @include mq(pc) {
      position: absolute;
      bottom: 0;
      left: 50%;
      max-width: none;
      height: 100%;
      transform: translateX(calc(-50% - func.dynamic-calc-md(0, 80)));
      mask-image: linear-gradient(to right, black, black 98.77%, transparent);
    }
  }
}
</style>
