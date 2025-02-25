<template>
  <component
    :is="component"
    class="KaImage"
    :class="[props.crop && `_crop-${props.crop}`]"
    :src="isNuxtImg ? `${image.assetBaseOrigin(props.src)}` : props.src"
    :format="isNuxtImg && !isSvg ? 'webp' : undefined"
    :alt="props.alt"
    :width="props.width ?? '100%'"
    :height="props.height"
    :sizes="props.sizes"
    :loading="props.lazy ? 'lazy' : undefined"
    :preload="isPreload || undefined"
    :quality="isNuxtImg ? props.quality : undefined"
    :crossorigin="props.crossOrigin"
  />
</template>

<script lang="ts" setup>
import type { ImgHTMLAttributes } from 'vue';

type Props = {
  /** 画像パス */
  src: string;
  /** 代替テキスト */
  alt?: string;
  /** 画像幅 */
  width?: ImgHTMLAttributes['width'] | string;
  /** 画像高 */
  height?: ImgHTMLAttributes['height'] | string;
  /** NuxtImgのsizesを指定 */
  sizes?: string;
  /** 画像の切り抜き */
  crop?: 'thumbnail';
  /**
   * 遅延読み込み
   * 基本的にはレイアウトシフトを避けるためにwidth&heightもしくはwidth&cropが指定されている場合のみ適用する
   * また、ファーストビューに設置する大きい画像（メイン画像）等には使用しない(LCP)
   */
  lazy?: boolean;
  /** NuxtImgのプリロードフラグ */
  preload?: boolean;
  /** NuxtImgで生成される画像の品質 */
  quality?: number;
  /** crossOrigin属性 */
  crossOrigin?: 'anonymous' | 'use-credentials';
};

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  width: undefined,
  height: undefined,
  sizes: undefined,
  crop: undefined,
  lazy: false,
  preload: false,
  quality: undefined,
  crossOrigin: undefined,
});

const image = useNuxtImage();

/** NuxtImgを使用するか */
const isNuxtImg = computed(() => !props.src.match(useRuntimeConfig().app.buildAssetsDir));

/** SVGフラグ */
const isSvg = props.src.endsWith('.svg');

/** 使用するタグを返却 */
const component = computed(() => (isNuxtImg.value ? resolveComponent('NuxtImg') : 'img'));

/** プリロードフラグ */
const isPreload = props.preload && isNuxtImg;
</script>

<style lang="scss" scoped>
.KaImage {
  max-width: 100%;

  &._crop-thumbnail {
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}
</style>
