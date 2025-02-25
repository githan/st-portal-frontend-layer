<i18n lang="yaml">
  ja:
    image-alt: 新CM 公開中 「いい不動産の美術館」篇 CMギャラリー
  en:
    image-alt: New CM is now open 「Good Real Estate Museum」 CM Gallery
</i18n>

<template>
  <div class="KoHome_News u-grid u-gap-y-sm u-md-gap-y-7xl">
    <KaHeading variant="h2" theme="dark">{{ $t('home-label-news') }}</KaHeading>
    <LayoutsContainer width="narrow" class="u-w-full u-grid u-gap-y-4xl">
      <KmTabs
        :tab-list="tabList"
        :active-tab-id="activeTabId"
        theme="dark"
        @id="id => (activeTabId = id)"
      >
        <template #[NewsTypeEnum.Announcement]>
          <ListArticle v-if="newsArticleList.length" variant="news" :items="newsArticleList" />
          <LayoutsEmpty v-else>{{ $t('home-stp144') }}</LayoutsEmpty>
        </template>
        <template #[NewsTypeEnum.PressRelease]>
          <ListArticle
            v-if="pressReleaseArticleList.length"
            variant="news"
            :items="pressReleaseArticleList"
          />
          <LayoutsEmpty v-else>{{ $t('home-stp144') }}</LayoutsEmpty>
        </template>
        <template #[NewsTypeEnum.MaintenanceInfo]>
          <ListArticle v-if="systemArticleList.length" variant="news" :items="systemArticleList" />
          <LayoutsEmpty v-else>{{ $t('home-stp144') }}</LayoutsEmpty>
        </template>
      </KmTabs>
      <LayoutsContainer v-if="showSeeMore" width="full">
        <PartsSeeMore
          align="center"
          href="/news"
          development-key="home-link-see_more"
          @click="setActiveTabId(activeTabId)"
        />
      </LayoutsContainer>
    </LayoutsContainer>
  </div>
</template>

<script setup lang="ts">
import { type NewsType, NewsTypeEnum } from '~/stores/news.model';
import { useNewsStore } from '~/stores/news.store';
import type { ArticleItem } from '~/components/ArticleItem.vue';

const newsStore = useNewsStore();
const { createNewsArticleItems } = useTransformViewData();
const { setActiveTabId } = useActiveTabId();
const activeTabId = ref<NewsType>(NewsTypeEnum.Announcement); // デフォルトタブ設定
const showSeeMore = computed(() => {
  if (activeTabId.value === NewsTypeEnum.Announcement) return newsArticleList.length >= 3;
  if (activeTabId.value === NewsTypeEnum.PressRelease) return pressReleaseArticleList.length >= 3;
  return systemArticleList.length >= 3;
});

const tabList: { id: NewsType; title: string }[] = [
  { id: NewsTypeEnum.Announcement, title: 'home-label-notice' },
  { id: NewsTypeEnum.PressRelease, title: 'home-label-press_release' },
  { id: NewsTypeEnum.MaintenanceInfo, title: 'home-label-system_maintenance' },
];

/** ニュースリスト(プレスリリース) 上から3件だけ取得 */
const pressReleaseArticleList: ArticleItem[] = createNewsArticleItems(
  newsStore.pressReleaseList.slice(0, 3),
  NewsTypeEnum.PressRelease,
);

/** ニュースリスト(システム) 上から3件だけ取得 */
const systemArticleList: ArticleItem[] = createNewsArticleItems(
  newsStore.maintenanceInfoList.slice(0, 3),
  NewsTypeEnum.MaintenanceInfo,
);

/** ニュースリスト 上から3件だけ取得 */
const newsArticleList: ArticleItem[] = createNewsArticleItems(
  newsStore.announcementList.slice(0, 3),
  NewsTypeEnum.Announcement,
);
</script>

<style lang="scss" scoped>
.KoHome_News {
  > .banner {
    @include on-hover-opacity;
  }
}
</style>
