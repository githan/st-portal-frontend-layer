<template>
  <div
    class="KmCarousel"
    :class="[
      {
        _fullWidth: isFullWidth,
        _gallery: props.gallery,
        _scrollbar: props.scrollbarPc && !isSpLayout,
        _paginationInner:
          props.pagination !== 'fraction' && props.paginationOffset && props.paginationOffset < 0,
        _locked: isLocked,
      },
      `_pagination-${props.pagination}`,
    ]"
    :style="{
      '--pagination-offset':
        props.pagination === 'fraction' || isLocked ? 0 : props.paginationOffset,
      ...(props.slideWidth !== undefined
        ? { '--slide-width': `${props.slideWidth}px` }
        : undefined),
    }"
  >
    <template v-if="(isSpLayout && props.spOnly) || !props.spOnly">
      <Swiper
        :effect="props.gallery || props.effect === 'fade' ? 'fade' : undefined"
        :slides-per-view="props.slidesPerViewSp"
        :space-between="props.spaceBetween"
        :loop="props.loop"
        :autoplay="props.autoplay ? { delay: props.autoplayDelay } : false"
        :modules="modules"
        :pagination="paginationConfig"
        :navigation="
          props.navigation || props.scrollbarPc
            ? {
                prevEl: '.Carousel_NavigationPrev',
                nextEl: '.Carousel_NavigationNext',
                disabledClass: '_disabled',
                lockClass: '_lock',
              }
            : false
        "
        :scrollbar="
          props.scrollbarPc
            ? {
                el: '.Carousel_Scrollbar',
                dragClass: 'Carousel_ScrollbarThumb',
                lockClass: '_lock',
                enabled: false,
                draggable: true,
              }
            : false
        "
        :centered-slides="props.centeredSlides"
        :fade-effect="{
          crossFade: props.gallery || props.effect === 'fade',
        }"
        :breakpoints="{
          '768': {
            slidesPerView: props.slidesPerViewPc,
            spaceBetween: 24,
            centeredSlides: false,
            ...(props.scrollbarPc && {
              pagination: {
                enabled: false,
              },
              scrollbar: {
                enabled: true,
              },
            }),
          },
        }"
        :class="[
          'Carousel_Swiper',
          {
            _centeredSlides: props.centeredSlides,
            _leftAlignedSlides: props.leftAlignedSlides,
          },
        ]"
        @init="removeExcessSlides"
        @swiper="setSwiperInstance"
      >
        <slot></slot>

        <template v-if="props.gallery">
          <div class="pagination"></div>
        </template>

        <template v-if="props.scrollbarPc">
          <div class="Carousel_ScrollbarArea">
            <div class="Carousel_Scrollbar"></div>
            <div class="Carousel_ScrollNavigation">
              <button
                type="button"
                class="Carousel_NavigationPrev"
                :aria-label="$t('common_parts-aria_label-display_previous_slide')"
              >
                <PartsIcon name="chevron-left" :size="20" color="kdx-blue-500" />
              </button>
              <button
                type="button"
                class="Carousel_NavigationNext"
                :aria-label="$t('common_parts-aria_label-display_next_slide')"
              >
                <PartsIcon name="chevron-right" :size="20" color="kdx-blue-500" />
              </button>
            </div>
          </div>
        </template>
      </Swiper>

      <template v-if="props.navigation">
        <ProvidersThemeProvider theme="dark">
          <div class="Carousel_NavigationPrev">
            <PartsIconButton
              size="medium"
              icon="chevron-left"
              :aria-label="$t('common_parts-aria_label-display_previous_slide')"
            />
          </div>
          <div class="Carousel_NavigationNext">
            <PartsIconButton
              size="medium"
              icon="chevron-right"
              :aria-label="$t('common_parts-aria_label-display_next_slide')"
            />
          </div>
        </ProvidersThemeProvider>
      </template>
    </template>

    <template v-else>
      <div
        :class="[
          'Carousel_Column',
          props.centeredSlides ? '_centeredSlides' : '',
          props.leftAlignedSlides ? '_leftAlignedSlides' : '',
        ]"
      >
        <slot></slot>
      </div>
    </template>
  </div>
</template>


<script lang="ts" setup>
import {
  Autoplay,
  EffectFade,
  Manipulation,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';
import { Swiper } from 'swiper/vue';
import type SwiperClass from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import type { PaginationOptions } from 'swiper/types';

/**
 * 使い方
 * slot内に SwiperSlideコンポーネントを入れて使用します。
 * コンポーネントを使用するページで 'SwiperSlide' をインポートしてください。
 * import { SwiperSlide } from 'swiper/vue';
 *
 * 使用例
 * <Carousel>
 *   <SwiperSlide>スライドコンテンツ</SwiperSlide>
 *   <SwiperSlide>スライドコンテンツ</SwiperSlide>
 *   <SwiperSlide>スライドコンテンツ</SwiperSlide>
 * </Carousel>
 */

/** Carouselのprops */
type CarouselProps = {
  /** SP時の1ビューあたりのスライド数 */
  slidesPerViewSp?: number | 'auto';
  /** PC時の1ビューあたりのスライド数 */
  slidesPerViewPc?: number | 'auto';
  /**
   * スライドの幅
   * slidesPerViewSp, slidesPerViewPc が設定されているとそれらが優先される
   */
  slideWidth?: number;
  /** スライド間の距離（px） */
  spaceBetween?: number;
  /** スライドをループさせる */
  loop?: boolean;
  /** 自動再生 */
  autoplay?: boolean;
  /** 自動再生時のスライド間の時間 */
  autoplayDelay?: number;
  /** SP時全幅表示（メインビジュアル） */
  fullWidth?: boolean;
  /** 画像ギャラリー表示 */
  gallery?: boolean;
  /** 表示するスライドインデックス */
  slideIndex?: number;
  /** 最大スライド数 */
  maxLength?: number;
  /**
   * ページネーションの種類
   * default: 押下可能なバーをスライド分表示
   * fraction: 現在のページ/総ページ数 で表示 押下不可
   */
  pagination?: 'default' | 'fraction' | 'none';
  /** ページネーションとスライドの間の距離 */
  paginationOffset?: number;
  /** ページネーションのサイズ */
  paginationSize?: 'small' | 'medium';
  /** ナビゲーションを表示させる */
  navigation?: boolean;
  /** PC時にスクロールバーを表示させる */
  scrollbarPc?: boolean;
  /** スライドをセンター配置にする */
  centeredSlides?: boolean;
  /** スライドを左寄せにする */
  leftAlignedSlides?: boolean;
  /** SP時のみカルーセルを有効化する。PC時はカラムレイアウト */
  spOnly?: boolean;
  /** スライド時のエフェクト */
  effect?: 'default' | 'fade';
};

const props = withDefaults(defineProps<CarouselProps>(), {
  slidesPerViewSp: 'auto',
  slidesPerViewPc: 'auto',
  slideWidth: undefined,
  spaceBetween: 12,
  loop: false,
  autoplay: false,
  autoplayDelay: 3000,
  fullWidth: false,
  gallery: false,
  slideIndex: undefined,
  maxLength: 5,
  pagination: 'default',
  paginationOffset: undefined,
  paginationSize: undefined,
  navigation: false,
  scrollbarPc: false,
  centeredSlides: false,
  leftAlignedSlides: false,
  spOnly: false,
  effect: 'default',
});

/** 追加モジュールを設定 */
const modules = computed(() => {
  const activeModules = [Manipulation];
  if (props.autoplay) {
    activeModules.push(Autoplay);
  }
  if (props.pagination) {
    activeModules.push(Pagination);
  }
  if (props.navigation || props.scrollbarPc) {
    activeModules.push(Navigation);
  }
  if (props.scrollbarPc) {
    activeModules.push(Scrollbar);
  }
  if (props.gallery || props.effect === 'fade') {
    activeModules.push(EffectFade);
  }
  return activeModules;
});

const { isSpLayout } = useDetectSpLayout();

/** Swiperインスタンス */
const swiperInstance = ref<SwiperClass | null>(null);

/** ページネーション、スクロールバー有無フラグ */
const isLocked = ref<boolean | undefined>();

/** ページネーション設定 */
const paginationConfig = computed<boolean | PaginationOptions | undefined>(() => {
  switch (props.pagination) {
    case 'fraction':
      return {
        type: 'fraction',
        ...(props.gallery && { el: '.pagination' }),
        renderFraction: (currentClass, totalClass) => {
          return `<span aria-hidden="true"><span class="${currentClass}"></span>/<span class="${totalClass}"></span></span><span aria-atomic="true" aria-live="polite" class="u-visually-hidden">全<span class="${totalClass}"></span>スライド 表示しているスライド番号: <span class="${currentClass}"></span></span>`;
        },
        enabled: true,
      };
    case 'none':
      return false;
    default:
      return {
        clickable: true,
        horizontalClass: '_horizontal',
        lockClass: '_lock',
        bulletClass: [
          'Carousel_PaginationBullet',
          props.paginationSize && `_${props.paginationSize}`,
        ].join(' '),
        bulletActiveClass: '_active',
        renderBullet: (index, className) => {
          return `<button type="button" class="${className}" aria-label="${
            index + 1
          }枚目のスライドを表示"></button>`;
        },
        enabled: true,
      };
  }
});

/** SP時全幅設定 */
const isFullWidth = computed(
  () => props.centeredSlides || props.leftAlignedSlides || props.fullWidth,
);

/**
 * スライド数をmaxLengthに制限する
 * @param swiper SwiperClass
 */
const removeExcessSlides = (swiper: SwiperClass) => {
  const { length } = swiper.slides;
  if (length > props.maxLength) {
    const excessSlides = length - props.maxLength;
    for (let i = 0; i < excessSlides; i++) {
      swiper.removeSlide(props.maxLength);
    }
  }
};

/**
 * swiperInstanceを設定する
 * @param swiper SwiperClass
 */
const setSwiperInstance = (swiper: SwiperClass) => {
  swiperInstance.value = swiper;
};

onMounted(() => {
  swiperInstance.value?.slideTo(props.slideIndex || 0, 0);
  swiperInstance.value?.update();
});

// ページネーション、スクロールバー有無フラグを更新
watch(
  () => swiperInstance.value?.isLocked,
  newValue => {
    isLocked.value = newValue;
  },
);
</script>

<style lang="scss">
/** NOTE: swiperクラス（.swiper-）をカスタマイズするためscopedを外しています */

// ページネーションの高さ
$pagination-height: 2;

// スクロールバーの高さ
$scrollbar-height: 20;

/* stylelint-disable selector-class-pattern */
.KmCarousel {
  $this: &;

  /** SP時全幅表示 */
  &._fullWidth {
    position: relative;

    @include mq(sp) {
      @include full-width;
    }
  }

  /** 画像ギャラリー表示 */
  &._gallery {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @include mq(pc) {
      padding: 0 func.rem(123);
      margin: 0 auto;
      #{$this}_Swiper {
        position: static;
        max-width: 1200px;
      }
    }

    @include mq(sp) {
      #{$this}_NavigationPrev,
      #{$this}_NavigationNext {
        display: none;
      }
    }
    .pagination {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: func.rem(56);
      padding: func.rem(16) func.rem(56);
      font-family: var(--font-alphanumeric);
      color: var(--color-grey-50);
      text-align: center;

      @include text(body2);
    }

    .swiper-wrapper {
      align-items: center;
    }
  }

  /** カルーセル無効時のカラムレイアウト */
  &_Column {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: func.rem(24);
    &._leftAlignedSlides {
      gap: func.rem(40) func.rem(24);
    }
  }

  .swiper-slide {
    width: var(--slide-width, 100%);

    .Image {
      width: 100%;
    }
  }
}

.Carousel_Swiper {
  position: relative;
  opacity: 0;
  transition: opacity 0.2s ease;

  .KmCarousel._pagination-default & {
    padding-bottom: max(calc(calc(var(--pagination-offset, 32) + $pagination-height) * 1px), 0px);
  }
  .KmCarousel._scrollbar & {
    padding-bottom: max(calc(calc(var(--pagination-offset, 56) + $scrollbar-height) * 1px), 0px);
  }
  .KmCarousel._locked & {
    padding-bottom: 0;
  }

  &.swiper-initialized {
    opacity: 1;
  }

  // 左寄せ
  &._leftAlignedSlides {
    @include mq(sp) {
      padding-right: func.dynamic-calc-sm(16, 24);
      padding-left: func.dynamic-calc-sm(16, 24);
    }
  }
}

.swiper-slide {
  // センター配置
  .Carousel_Swiper._centeredSlides & {
    width: calc(100% - func.rem(48));
  }
}

// Navigation
.Carousel_NavigationPrev,
.Carousel_NavigationNext {
  position: absolute;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  &._disabled {
    .IconButton {
      pointer-events: none;
      background-color: rgba(#fff, 0.15);
      .IconButton_Icon {
        background-color: var(--color-grey-400);
      }
    }
  }
  &._lock {
    display: none;
  }
}

.Carousel_NavigationPrev {
  left: func.rem(16);

  @include mq(pc) {
    left: func.rem(24);
  }
}

.Carousel_NavigationNext {
  right: func.rem(16);

  @include mq(pc) {
    right: func.rem(24);
  }
}

// Pagination (bullets)
.swiper-horizontal > .swiper-pagination-bullets {
  bottom: func.rem(-8);
  display: flex;
  flex-wrap: wrap;
  gap: func.rem(8);
  justify-content: center;
  font-size: 0;
  line-height: 1;
  &._lock {
    display: none;
  }

  .Carousel._paginationInner & {
    bottom: calc(var(--pagination-offset, 32) * -1px - func.rem(8));
  }
}

.Carousel_PaginationBullet {
  $bullet-height: func.rem(2);
  position: relative;
  width: func.rem(24);
  height: func.rem(18);

  &:not(._active) {
    @include on-hover-opacity;
  }

  @include mq(pc) {
    &:not(._small) {
      width: func.rem(40);
    }
  }

  &::before {
    position: absolute;
    top: calc(50% - $bullet-height / 2);
    left: 0;
    display: block;
    width: 100%;
    height: $bullet-height;
    content: '';
    background-color: var(--color-grey-200);
  }

  &._active {
    cursor: default;
    &::before {
      background-color: var(--color-cta-600);
    }
  }
}

// Pagination (fraction)
.swiper-pagination-fraction {
  bottom: 0;
}

// Scrollbar
.Carousel_ScrollbarArea {
  @include mq(sp) {
    display: none;
  }
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: func.rem(20);

  .Carousel._locked & {
    display: none;
  }
}

.Carousel_Scrollbar {
  @include mq(pc) {
    width: calc(100% - 56px);
    height: 2px;
    cursor: pointer;
    background-color: var(--color-grey-200);
    .Carousel_ScrollbarThumb {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: var(--color-cta-600);
      &::before {
        position: absolute;
        top: -9px;
        left: 0;
        width: 100%;
        height: 20px;
        content: '';
      }
    }
  }
  &._lock {
    display: none;
  }
}

.Carousel_ScrollNavigation {
  display: flex;
  column-gap: func.rem(8);
  align-items: center;
  .Carousel_NavigationPrev,
  .Carousel_NavigationNext {
    position: static;
    font-size: 0;
    line-height: 0;
    cursor: pointer;
    transform: translateY(0);
    &._disabled {
      pointer-events: none;
      ._chevron-left,
      ._chevron-right {
        background-color: var(--color-grey-400);
      }
    }
  }
  .Carousel_NavigationPrev {
    left: func.rem(16);
  }
  .Carousel_NavigationNext {
    right: func.rem(16);
  }
}
/* stylelint-enable selector-class-pattern */
</style>
