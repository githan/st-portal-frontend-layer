
<template>
  <div
    class="KmSns_Buttons u-flex u-gap-x-xs u-md-gap-x-lg"
    :class="[props.variant === 'share' && 'u-justify-between u-align-center']"
  >
    <ul class="list u-flex u-align-center u-gap-lg">
      <template
        v-for="(item, index) in props.variant === 'follow' ? followList : shareList"
        :key="index"
      >
        <template v-if="item.link">
          <li>
            <a
              :href="item.link"
              rel="nofollow noopener"
              target="_blank"
              class="icon"
              :title="$t(item.tooltip)"
            >
              <PartsImage
                width="32"
                height="32"
                :src="item.icon"
                lazy
                :alt="$t(item.name)"
                @click="sendClickMeasurement(item.tooltip)"
              />
            </a>
          </li>
        </template>
      </template>
    </ul>
    <template
      v-if="props.variant === 'share' && props.shareUrl && isSupportedWebShareApi && isSpLayout"
    >
      <div class="share-button">
        <PartsButton
          variant="secondary"
          size="small"
          icon-prepend="share"
          @click="props.shareUrl && shareViaWebShare(props.shareUrl)"
        >
          {{ $t('sns-button-share') }}
        </PartsButton>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import FacebookIcon from '@/assets/images/sns-icons/facebook.svg';
import InstagramIcon from '@/assets/images/sns-icons/instagram.png';
import LineIcon from '@/assets/images/sns-icons/line.svg';
import XIcon from '@/assets/images/sns-icons/x.svg';
import YoutubeIcon from '@/assets/images/sns-icons/youtube.svg';

/** クリック計測 */
const { sendClickMeasurement } = useMeasurements();

/** SNSAreaのprops */
type Props =
  | {
      /** SNSのタイプ */
      variant: 'follow';
      /** シェアしたいページのURL */
      shareUrl?: never;
    }
  | {
      /** SNSのタイプ */
      variant: 'share';
      /** シェアしたいページのURL */
      shareUrl: string;
    };

const {
  public: { SNSLink },
} = useRuntimeConfig();

const props = withDefaults(defineProps<Props>(), {
  shareUrl: undefined,
});

/** エンコードしたシェアURL */
const encodedShareUrl = computed(() =>
  props.shareUrl ? encodeURIComponent(props.shareUrl) : undefined,
);

/**
 * SNS情報を一元管理する配列
 * TODO: 公式アカウント情報をいただいてないため、フォロー用URLはアカウント作成時に埋める
 */
const snsList = computed(() => ({
  line: {
    name: 'sns-alt-line',
    icon: LineIcon,
    shareUrl:
      encodedShareUrl.value &&
      `https://social-plugins.line.me/lineit/share?url=${encodedShareUrl.value}`,
    shareTooltip: 'sns-tooltip-share_line',
    followUrl: SNSLink.line,
    followTooltip: 'sns-tooltip-follow_line',
  },
  instagram: {
    name: 'sns-alt-instagram',
    icon: InstagramIcon,
    followUrl: SNSLink.instagram,
    followTooltip: 'sns-tooltip-follow_instagram',
  },
  facebook: {
    name: 'sns-alt-facebook',
    icon: FacebookIcon,
    shareUrl:
      encodedShareUrl.value && `https://www.facebook.com/share.php?u=${encodedShareUrl.value}`,
    shareTooltip: 'sns-tooltip-share_facebook',
    followUrl: SNSLink.facebook,
    followTooltip: 'sns-tooltip-follow_facebook',
  },
  youtube: {
    name: 'sns-alt-youtube',
    icon: YoutubeIcon,
    followUrl: SNSLink.youtube,
    followTooltip: 'sns-tooltip-follow_youtube',
  },
  x: {
    name: 'sns-label-x',
    icon: XIcon,
    shareUrl: encodedShareUrl.value && `https://x.com/intent/tweet?url=${encodedShareUrl.value}`,
    shareTooltip: 'sns-tooltip-share_x',
  },
}));

/** SNSフォロー用リスト */
const followList = computed(() => [
  {
    name: snsList.value.line.name,
    icon: snsList.value.line.icon,
    link: snsList.value.line.followUrl,
    tooltip: snsList.value.line.followTooltip,
  },
  {
    name: snsList.value.instagram.name,
    icon: snsList.value.instagram.icon,
    link: snsList.value.instagram.followUrl,
    tooltip: snsList.value.instagram.followTooltip,
  },
  {
    name: snsList.value.facebook.name,
    icon: snsList.value.facebook.icon,
    link: snsList.value.facebook.followUrl,
    tooltip: snsList.value.facebook.followTooltip,
  },
  {
    name: snsList.value.youtube.name,
    icon: snsList.value.youtube.icon,
    link: snsList.value.youtube.followUrl,
    tooltip: snsList.value.youtube.followTooltip,
  },
]);

/** SNSシェア用リスト */
const shareList = computed(() => [
  {
    name: snsList.value.x.name,
    icon: snsList.value.x.icon,
    link: snsList.value.x.shareUrl,
    tooltip: snsList.value.x.shareTooltip,
  },
  {
    name: snsList.value.facebook.name,
    icon: snsList.value.facebook.icon,
    link: snsList.value.facebook.shareUrl,
    tooltip: snsList.value.facebook.shareTooltip,
  },
  {
    name: snsList.value.line.name,
    icon: snsList.value.line.icon,
    link: snsList.value.line.shareUrl,
    tooltip: snsList.value.line.shareTooltip,
  },
]);

/** ウェブ共有APIのサポート状態 */
const isSupportedWebShareApi = ref(false);

/** ウェブ共有APIのサポート状態を更新 */
const updateSupportedWebShareApi = () => {
  if (!props.shareUrl) return;
  isSupportedWebShareApi.value = detectSupportedWebShareApi(props.shareUrl);
};

const { isSpLayout } = useDetectSpLayout();

onMounted(() => {
  updateSupportedWebShareApi();
});
</script>

<style lang="scss" scoped>
.KmSns_Buttons {
  .share-button {
    width: func.rem(120);
  }

  .icon {
    @include on-hover-opacity;
  }
}
</style>
