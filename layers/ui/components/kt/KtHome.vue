<template>
  <div class="KtHome">
    <div class="visual-container">
      <KoHomeMainVisual />
    </div>
    <div class="background-gradation">
      <KoContainer width="wide">
        <aside class="banner-container">
          <KoHomeBanner />
        </aside>
        <section class="advertise-container">
          <KoHomeAdvertiseNumber />
        </section>
      </KoContainer>
    </div>
    <section class="introduction-container">
      <KoContainer width="wide">
        <KoHomeIntroduction />
      </KoContainer>
    </section>
    <section class="campaign-container">
      <KoContainer width="wide">
        <KoHomeCampaign />
      </KoContainer>
    </section>
    <section class="knowledge-container">
      <KoContainer width="wide">
        <KoHomeKnowledge />
      </KoContainer>
    </section>
    <section class="news-container">
      <KoContainer width="wide">
        <KoHomeNews />
      </KoContainer>
    </section>
    <section class="sns-container">
      <KoHomeSns />
    </section>
  </div>
</template>
<script setup lang="ts">
const { isSpLayout } = useDetectSpLayout();
</script>
<style scoped lang="scss">
/** @mixin section-padding: セクションの上下余白を指定 */
@mixin section-padding {
  padding-top: func.rem(56);
  padding-bottom: func.rem(56);

  @include mq(pc) {
    padding-top: func.rem(144);
    padding-bottom: func.rem(144);
  }
}

.KtHome {
  .visual-container {
    background-color: var(--color-kdx-blue-900);

    &._image {
      @include mq(pc) {
        margin-top: calc(var(--header-height) * 1px);
      }
    }
  }

  .background-gradation {
    padding-top: func.rem(32);
    background-image: linear-gradient(
      279deg,
      var(--color-grey-800) 4.11%,
      #232e42 52.03%,
      var(--color-grey-800) 97.1%
    );

    @include mq(pc) {
      padding-top: func.rem(56);
    }

    .banner-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .advertise-container {
      @include section-padding;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }

  .introduction-container {
    position: relative;
    background-image: linear-gradient(
        290deg,
        rgb(20 20 20 / 90%) 1.13%,
        rgb(35 46 66 / 90%) 49.24%,
        rgb(20 20 20 / 90%) 99.48%
      ),
      url('/images/home/bg-introduction.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow:
      0 0 1px 0 rgb(255 255 255 / 35%) inset,
      0 0.25px 0.5px -1.5px rgb(255 255 255 / 35%) inset;

    @include section-padding;

    &::before {
      position: absolute;
      inset: 0;
      content: '';
      background:
        linear-gradient(112deg, rgb(20 20 20 / 0%) 0%, rgb(20 20 20 / 21%) 100%),
        url('@/assets/images/texture-noise-20.png') no-repeat center/cover;
      backdrop-filter: blur(9px);
    }
  }

  .campaign-container {
    @include section-padding;
  }

  .knowledge-container {
    @include section-padding;
    border-top: 1px solid var(--color-grey-200);
  }

  .news-container {
    @include section-padding;
    background-color: var(--color-grey-800);
  }

  .sns-container {
    padding-top: func.rem(56);
    padding-bottom: func.rem(56);

    @include mq(pc) {
      padding-top: func.rem(64);
      padding-bottom: func.rem(64);
    }
  }
}
</style>
