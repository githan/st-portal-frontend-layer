<i18n lang="yaml">
  ja:
    title: 公式アカウントをフォロー
    note1: 公式アカウントにて、KDXの不動産セキュリティ・トークンに関する最新情報や、
    note2: お得なキャンペーン情報を随時お届けします。
  en:
    title: Follow the official account
</i18n>

<template>
  <KoNotes class="KoSns" :title="t('title')" color="white">
    <KaText size="small" color="grey-700" :text-align="{ base: 'left', md: 'center' }">
      {{ t('note1') }}<br class="u-hidden u-md-block" />{{ t('note2') }}
    </KaText>
    <KmSnsButtons variant="follow" class="u-justify-center" />
  </KoNotes>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.KoSns {
  width: 100%;
}
</style>
