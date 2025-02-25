<template>
  <KtHome />
</template>

<script setup lang="ts">
const isLoggedIn = ref(false);
const fundsStore = useFundsStore();
const promotionsStore = usePromotionsStore();
const newsStore = useNewsStore();
const knowledgeStore = useKnowledgeStore();

definePageMeta({
  layout: 'portal',
});

await Promise.all([
  isLoggedIn.value &&
    useCallOnceDataSafe<true>(CallOnceDataKey.FundList, () =>
      fundsStore.fetchFundList().then(() => true),
    ),
  useCallOnceDataSafe<true>(CallOnceDataKey.OpeningPromotionList, () =>
    promotionsStore.fetchOpeningPromotionList(false).then(() => true),
  ),
  useCallOnceDataSafe<true>(CallOnceDataKey.NewsList, () =>
    Promise.all([
      newsStore.fetchAnnouncementList(false),
      newsStore.fetchPressReleaseList(false),
      newsStore.fetchMaintenanceInfoList(false),
    ]).then(() => true),
  ),
  useCallOnceDataSafe<true>(CallOnceDataKey.HomeArticle, () =>
    knowledgeStore.fetchHomeArticleList().then(() => true),
  ),
  useAsyncDataSafe<true>(AsyncDataKey.HeadNews, () => newsStore.fetchHeadNews().then(() => true)),
]);
</script>

<style scoped lang="scss">
.Demo {
  padding: func.rem(0);
}
</style>
