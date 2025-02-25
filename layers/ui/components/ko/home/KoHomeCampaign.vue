<i18n lang="yaml">
  ja:
    empty: 現在実施中のキャンペーンはありません
  en:
    empty: No campaigns are currently underway
</i18n>

<template>
  <div class="KoHome_Campaign">
    <KaHeading variant="h2">
      {{ $t('home-label-promotions') }}
      <template v-if="campaignList.length" #cta>
        <PartsLinkButton
          href="/promotions"
          icon-append="chevron-right"
          development-key="home-link-see_more"
          >{{ $t('home-link-see_more') }}</PartsLinkButton
        >
      </template>
    </KaHeading>
    <KmCarousel
      v-if="campaignList.length"
      scrollbar-pc
      :slides-per-view-sp="1.12"
      :slides-per-view-pc="3.2"
      :space-between="isSpLayout ? 12 : 32"
      class="u-mt-xl u-md-mt-4xl"
      :centered-slides="isSpLayout && true"
      :pagination-offset="isSpLayout ? 32 : 56"
    >
      <template v-for="(campaignItem, campaignIndex) in campaignList" :key="campaignIndex">
        <SwiperSlide>
          <KoCampaignCard variant="campaign" :item="campaignItem" />
        </SwiperSlide>
      </template>
    </KmCarousel>
    <KmEmpty v-else>
      <span>{{ t('empty') }}</span>
    </KmEmpty>
  </div>
</template>

<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import type { ArticleItem } from '~/components/ArticleItem.vue';

const { t } = useI18n();
const { isSpLayout } = useDetectSpLayout();
const promotionsStore = usePromotionsStore();
const { createPromotionArticleItems } = useTransformViewData();

/** キャンペーンリスト 上から5件だけ取得 */
const campaignList: ArticleItem[] = createPromotionArticleItems(
  promotionsStore.openingPromotionList.slice(0, 5),
);
</script>

<style lang="scss" scoped>
.KoHome_Campaign {
  > .banner {
    @include on-hover-opacity;
  }
}
</style>
