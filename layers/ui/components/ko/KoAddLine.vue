<template>
  <KoNotes class="KoAddLine" :title="$t('home-label-line_title')">
    <KaText
      :align="isSpLayout ? 'left' : 'center'"
      color="grey-700"
      :size="{ base: 'small', md: 'medium' }"
      >{{ $t('home-text-line_note1') }}<br class="u-hidden u-md-block" />{{
        $t('home-text-line_note2')
      }}
    </KaText>
    <!-- LINEお友達登録URL -->
    <KaLink class="KoAddLine_Button" :href="SNSLink.line" :external="true">
      <KaButton size="medium" development-key="home-button-add_friend">{{
        $t('home-button-add_friend')
      }}</KaButton>
    </KaLink>
  </KoNotes>
</template>

<script lang="ts" setup>
const { isSpLayout } = useDetectSpLayout();
const {
  public: { SNSLink },
} = useRuntimeConfig();
</script>

<style lang="scss" scoped>
.KoAddLine {
  width: 100%;
}
</style>
