<i18n lang="yaml">
  ja:
    image-alt: 新CM 公開中 「いい不動産の美術館」篇 CMギャラリー
  en:
    image-alt: New CM is now open 「Good Real Estate Museum」 CM Gallery
</i18n>

<template>
  <div class="KoHome_Knowledge">
    <KaHeading variant="h2">
      {{ $t('home-label-st') }}
      <template v-if="knowledgeList.length" #cta>
        <PartsLinkButton
          href="/knowledge/articles"
          icon-append="chevron-right"
          development-key="home-link-see_more"
          @click="clickMoreArticles()"
          >{{ $t('home-link-see_more') }}</PartsLinkButton
        >
      </template>
    </KaHeading>
    <KmCarousel
      v-if="knowledgeList.length"
      scrollbar-pc
      :slides-per-view-sp="1.12"
      :slides-per-view-pc="3.2"
      :space-between="isSpLayout ? 12 : 40"
      class="u-mt-xl u-md-mt-4xl"
      :centered-slides="isSpLayout && true"
      :pagination-offset="isSpLayout ? 32 : 56"
    >
      <template v-for="(knowledgeItem, knowledgeIndex) in knowledgeList" :key="knowledgeIndex">
        <SwiperSlide>
          <ArticleItem variant="knowledge" :item="knowledgeItem" />
        </SwiperSlide>
      </template>
    </KmCarousel>
    <LayoutsEmpty v-else>{{ $t('home-stp143') }}</LayoutsEmpty>
  </div>
</template>

<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import type { ArticleItem } from '~/components/ArticleItem.vue';

const { t } = useI18n();
const { isSpLayout } = useDetectSpLayout();
const knowledgeStore = useKnowledgeStore();
const { createKnowledgeArticleItem } = useTransformViewData();

/** 学習系リスト 最大5件 */
const knowledgeList: ArticleItem[] = knowledgeStore.homeArticleList.map(article => ({
  ...createKnowledgeArticleItem(article),
}));

/** 不動産STを知る もっと見る を押下時の処理 */
const clickMoreArticles = () => {
  knowledgeStore.$patch({
    articleSearchCondition: {
      keyword: undefined,
      writer: undefined,
      word: '',
      sortValue: 'new',
      isRecommended: undefined,
    },
    doRefetchArticleList: true,
  });
};
</script>

<style lang="scss" scoped>
.KoHome_Knowledge {
  > .banner {
    @include on-hover-opacity;
  }
}
</style>
