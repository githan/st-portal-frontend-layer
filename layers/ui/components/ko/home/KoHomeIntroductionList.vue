<i18n lang="yaml">
  ja:
    title1: 強み1
    title2: 強み2
    title3: 強み3
    note1: 不動産証券化ビジネス 業歴30年
    note2: 高い専門性と豊富な経験を有する人材
    note3: 挑戦する組織風土
  en:
    note1: In 1995, at the dawn of the real estate securitization business, financial and real estate professionals came together to establish KDX. For the past 30 years, KDX has made it its corporate mission to provide customers with the best investment opportunities, and has taken on numerous challenges through real estate funds. However, such initiatives have mainly targeted institutional investors (professionals), and opportunities for individual investors have been limited.
</i18n>

<template>
  <ul class="KoHome_IntroductionList">
    <template v-for="(item, index) in items" :key="index">
      <li class="item">
        <KaImage class="icon" :src="item.iconSrc" width="80" height="80" lazy :alt="item.title" />
        <PartsText class="detail" color="white" bold>{{ item.detail }}</PartsText>
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
const { t } = useI18n();
/** Why KDX リスト */
const items = [
  {
    title: t('title1'),
    iconSrc: '/images/home/icon-experience.svg',
    detail: t('note1'),
  },
  {
    title: t('title2'),
    iconSrc: '/images/home/icon-people.svg',
    detail: t('note2'),
  },
  {
    title: t('title3'),
    iconSrc: '/images/home/icon-challenge.svg',
    detail: t('note3'),
  },
];
</script>

<style lang="scss" scoped>
.KoHome_IntroductionList {
  display: grid;
  gap: func.rem(16);

  .item {
    display: flex;
    flex-direction: column;
    gap: func.rem(16);
    align-items: center;
    padding: func.rem(24) func.rem(16);
    color: var(--color-white);
    background-image: radial-gradient(
      371.89% 134.33% at 3.21% 1.26%,
      rgb(255 255 255 / 7%) 0%,
      rgb(217 217 217 / 0%) 100%
    );
    border: 1px solid rgba(#fff, 0.2);
    border-radius: func.rem(5);

    @include mq(pc) {
      flex-direction: row;
      gap: func.rem(32);
      padding: func.dynamic-calc-md(16, 24) func.dynamic-calc-md(40, 80);
    }
  }

  .icon {
    flex-shrink: 0;
  }

  .detail {
    white-space: pre-line;

    @include mq(sp) {
      text-align: center;
    }
  }
}
</style>
