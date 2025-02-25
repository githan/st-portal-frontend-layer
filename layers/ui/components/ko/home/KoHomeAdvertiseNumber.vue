<i18n lang="yaml">
  ja:
    title: KDX不動産ST実績
    total-st-asset-size: 資産規模合計
    domestic: 国内
    no-text: 第
    rank-text: 位
    about-text: 約
    appeal-number1: 1,390億円
    appeal-number2: 12本
    appeal-number3: 134億
    number-st-issues: 発行本数
    st-issue-amount: 最大発行価額
    open-recruitment-type: 公募型
    real-estate-st-issue: 不動産ST発行
    odx: ODXでの取扱銘柄組成
    first-in-japan: 国内初
    notice-date: 2024年4月時点の情報です
    notice-st-asset-size: KDXグループが運用等を受託する不動産STに係る裏付不動産の資産規模を合計した金額です。
    notice-st-issue-amount: 国内発行済み不動産STの募集1回における発行価額を銘柄別に比較した結果です。
    notice-odx: ODX（大阪デジタルエクスチェンジ株式会社）が運営する私設取引システム「START」での取扱いを指しています。
  en:
    title: KDX Real Estate ST Achievement
</i18n>

<template>
  <div class="KoHome_AdvertiseNumber u-grid u-gap-y-xl u-md-gap-y-4xl">
    <KaHeading variant="h2" theme="dark">{{ t('title') }}<sup class="title-sup">※1</sup></KaHeading>
    <dl class="advertise-list">
      <div class="item u-md-gap-sm u-lg-gap-0">
        <dt class="advertise-title">{{ t('total-st-asset-size') }}<sup class="sup">※2</sup></dt>
        <dd class="item-highlight _decoration u-align-center u-md-align-end u-lg-align-center">
          <span class="text-wrapper">
            <span class="item-rank">{{ t('domestic') }}</span>
            <span class="text"
              >{{ t('no-text') }}<strong class="strong-text">1</strong>{{ t('rank-text') }}</span
            >
          </span>
        </dd>
        <dd class="item-data">
          <span class="prefix">{{ t('about-text') }}</span
          >{{ t('appeal-number1') }}
        </dd>
      </div>
      <div class="item u-gap-sm u-lg-gap-0">
        <dt class="advertise-title">
          {{ t('number-st-issues') }}
        </dt>
        <dd class="item-highlight _decoration u-align-end u-lg-align-center">
          <span class="text-wrapper">
            <span class="item-rank">{{ t('domestic') }}</span>
            <span class="text"
              >{{ t('no-text') }}<strong class="strong-text">1</strong>{{ t('rank-text') }}</span
            >
          </span>
        </dd>
        <dd class="item-data">
          {{ t('appeal-number2') }}
        </dd>
      </div>
      <div class="item u-gap-sm u-lg-gap-0">
        <dt class="advertise-title">{{ t('st-issue-amount') }}<sup class="sup">※3</sup></dt>
        <dd class="item-highlight _decoration u-align-end u-lg-align-center">
          <span class="text-wrapper">
            <span class="item-rank">{{ t('domestic') }}</span>
            <span class="text"
              >{{ t('no-text') }}<strong class="strong-text">1</strong>{{ t('rank-text') }}</span
            >
          </span>
        </dd>
        <dd class="item-data">
          {{ t('appeal-number3') }}
        </dd>
      </div>
      <div class="item u-gap-xs u-md-gap-sm u-lg-gap-md">
        <dt class="advertise-title">
          {{ t('open-recruitment-type') }}<br class="u-md-hidden" />{{ t('real-estate-st-issue') }}
        </dt>
        <dd class="item-highlight">
          <span class="text _large">{{ t('first-in-japan') }}</span>
        </dd>
      </div>
      <div class="item u-gap-xs u-md-gap-sm u-lg-gap-md">
        <dt class="advertise-title">
          {{ t('odx') }}<br class="u-md-hidden" /><sup class="sup">※4</sup>
        </dt>
        <dd class="item-highlight">
          <span class="text _large">{{ t('first-in-japan') }}</span>
        </dd>
      </div>
    </dl>
    <ul class="notice-list u-grid u-gap-2xs">
      <li class="item">
        {{ t('notice-date') }}
      </li>
      <li class="item">
        {{ t('notice-st-asset-size') }}
      </li>
      <li class="item">
        {{ t('notice-st-issue-amount') }}
      </li>
      <li class="item">
        {{ t('notice-odx') }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.KoHome_AdvertiseNumber {
  width: 100%;
  max-width: 1200px;

  .title-sup {
    top: 0.8em;
    display: inline-flex;
    margin-right: func.rem(-8);
    font-size: func.rem(11);
    font-weight: 500;
    vertical-align: top;
  }

  .advertise-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: func.rem(16);

    @include mq(pc) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: func.rem(24);
    }

    > .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: func.rem(164);
      padding-top: func.rem(24);
      padding-bottom: func.rem(24);
      background-image: radial-gradient(
        371.89% 134.33% at 3.21% 1.26%,
        rgb(255 255 255 / 7%) 0%,
        rgb(217 217 217 / 0%) 100%
      );
      border: 1px solid rgba(#fff, 0.2);
      border-radius: func.rem(5);

      &:first-child {
        grid-column: 1 / span 2;
        padding-right: func.rem(16);
        padding-left: func.rem(16);
      }

      @include mq(pc) {
        &:nth-child(1) {
          grid-column: 1 / span 2;
        }

        &:nth-child(2) {
          grid-column: 3 / span 2;
        }

        &:nth-child(3) {
          grid-column: 5 / span 2;
        }

        &:nth-child(4) {
          grid-column: 1 / span 3;
        }

        &:nth-child(5) {
          grid-column: 4 / span 3;
        }
      }

      @include mq(lg) {
        min-height: func.rem(160);
        padding-right: func.rem(16);
        padding-left: func.rem(16);
      }
    }

    .advertise-title {
      font-size: func.rem(16);
      font-weight: 500;
      line-height: 1.25;
      color: var(--color-grey-200);
      text-align: center;
      letter-spacing: func.px-to-em(0.016, 16);

      @include mq(lg) {
        font-size: func.rem(18);
        line-height: calc(24 / 18);
        letter-spacing: func.px-to-em(0.027, 18);
      }
    }

    .item-highlight {
      color: var(--color-gold-300);

      &._decoration {
        display: flex;
        gap: func.rem(4);
        margin-top: 0;

        @include mq(lg) {
          gap: func.rem(32);
        }

        .item:first-child & {
          @include mq(sp) {
            gap: func.rem(24);
          }

          @include mq(lg) {
            gap: func.rem(32);
          }
        }

        &::before,
        &::after {
          display: inline-block;
          width: func.rem(27.35);
          height: func.rem(64);
          content: '';
          background: url('/images/decoration-olive.svg') no-repeat center/contain;

          @include mq(lg) {
            width: func.rem(51);
            height: func.rem(120);
          }

          .item:first-child & {
            @include mq(sp) {
              width: func.rem(51);
              height: func.rem(120);
            }
          }
        }

        &::after {
          transform: scale(-1, 1);
        }
      }
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: func.rem(4);
      line-height: 1;

      @include mq(pc) {
        margin-top: func.rem(-16);
      }

      .item:first-child & {
        margin-top: func.rem(-16);
      }
    }

    .item-rank {
      font-family: var(--font-mincho);
      font-size: func.rem(16);
      font-weight: 700;
      line-height: 1;
      color: var(--color-gold-300);
      text-align: center;

      @include mq(lg) {
        font-size: func.rem(20);
      }

      .item:first-child & {
        @include mq(sp) {
          font-size: func.rem(20);
        }
      }
    }

    .text {
      display: flex;
      column-gap: func.rem(4);
      align-items: baseline;
      font-family: var(--font-mincho);
      font-size: func.rem(20);
      font-weight: 700;
      line-height: 1;
      color: var(--color-gold-300);

      &._large {
        font-size: func.rem(32);

        @include mq(lg) {
          font-size: func.rem(40);
        }
      }
    }

    .strong-text {
      font-size: func.rem(56);
    }

    .item-data {
      display: flex;
      gap: func.rem(8);
      align-items: baseline;
      margin-top: func.rem(-8);
      font-size: func.rem(20);
      font-weight: 500;
      line-height: 1.4;
      color: var(--color-grey-200);

      @include mq(lg) {
        font-size: func.rem(24);
        line-height: calc(32 / 24);
      }

      .prefix {
        @include text(body3);
        color: var(--color-grey-200);

        @include mq(lg) {
          @include text(body1);
        }
      }
    }
  }

  .notice-list {
    @include text(body3);
    color: var(--color-white);

    > .item {
      display: flex;
      column-gap: func.rem(8);
      align-items: baseline;
      color: var(--color-white);
      counter-increment: counter;

      @include text(body3);

      &::before {
        flex-shrink: 0;
        content: '※' counter(counter);
      }
    }
  }
}
</style>
