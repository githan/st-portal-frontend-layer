<i18n lang="yaml">
  ja:
    why-kdx: なぜKDXが選ばれるのか？
    note1: 不動産証券化ビジネスの黎明期である1995年、金融と不動産の専門家が集まりKDX（ケネディクス）は創業しました。以来30年間、顧客へ最適な投資機会を提供することをコーポレートミッションとし、不動産ファンドを通じて数多くの取り組みに挑戦してきましたが、このような取り組みは主に機関投資家（プロ）を対象とし、個人投資家への提供機会は限定的でした。
    note2: この度、法改正や技術の進化に伴い、その機会をようやく、個人の皆さまに広く提供できるようになりました。
    note3: 豊富な実績に基づく強固なネットワークや実績に裏打ちされたアセットマネジャーとしての高い運用能力を武器に、今まで機関投資家しかアクセス出来なかったような資産規模やアセットクラスの不動産を、個人の皆さまへも開放していきます。
    note4: KDXグループは目まぐるしく環境が変化する中、時代を見据え、新たな投資機会の提供に資するべく、今後も挑戦を続けます。
  en:
    why-kdx: Why KDX?
</i18n>

<template>
  <div class="KoHome_Introduction u-grid u-gap-y-xl u-md-gap-y-4xl">
    <KaHeading variant="h2" theme="dark">{{ t('why-kdx') }}</KaHeading>
    <div class="u-grid u-md-grid-cols-2 u-gap-xl u-md-gap-2xl u-lg-gap-7xl">
      <KoHomeIntroductionList />
      <KaText theme="dark">
        {{ t('note1') }}<br />
        <br />
        {{ t('note2') }}<br />
        <br />
        {{ t('note3') }}<br />
        <br />
        {{ t('note4') }}
      </KaText>
    </div>
  </div>
</template>

<script setup lang="ts">
import KoHomeIntroductionList from './KoHomeIntroductionList.vue';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.KoHome_Introduction {
  position: relative;
  z-index: 1;
}
</style>
