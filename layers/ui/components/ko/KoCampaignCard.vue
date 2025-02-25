<template>
  <component
    :is="component"
    :to="props.item.detailPageUrl"
    :target="props.item.detailPageUrl && props.item.detailPageExternal ? '_blank' : undefined"
    :type="component === 'button' ? 'button' : undefined"
    class="KoCampaignCard"
    :class="[
      'ArticleItem u-w-full',
      `_${props.variant}`,
      `_${layout}`,
      `_${theme}`,
      {
        _clickable: component !== 'span',
        _visited: props.item.visited,
      },
    ]"
    @click="props.item.clickHandler?.()"
  >
    <article class="ArticleItem_Content">
      <template v-if="isShowThumbnail">
        <div class="ArticleItem_ImageContainer u-flex-shrink-0">
          <template v-if="props.item.thumbnailUrl">
            <KaImage
              :src="props.item.thumbnailUrl"
              :width="layout === 'horizontal' ? '250' : '720'"
              :sizes="layout === 'horizontal' ? '134px md:250px' : '720px'"
              lazy
              :alt="props.item.thumbnailUrlAlt"
              :variant="props.item.thumbnailType"
              crop="thumbnail"
              class="u-w-full"
            />
          </template>
        </div>
      </template>

      <div class="ArticleItem_Body u-flex u-flex-direction-column u-gap-sm">
        <template v-if="props.item.title">
          <p
            :class="[
              'ArticleItem_Title',
              {
                _truncate: isTruncateTitle,
              },
            ]"
          >
            <template v-if="props.item.locked === true">
              <PartsIcon
                class="ArticleItem_LockIcon"
                name="lock"
                :size="20"
                color="gold-500"
                :aria-label="$t('article_item-tooltip-locked')"
              />
            </template>
            <template v-else-if="props.item.locked === false">
              <PartsIcon
                class="ArticleItem_LockIcon"
                name="unlock"
                :size="20"
                color="grey-400"
                :aria-label="$t('article_item-tooltip-not_locked')"
              />
            </template>
            {{ props.item.title }}
          </p>
        </template>
        <PartsArticleMeta>
          <template v-if="props.item.datetime1 || props.item.datetime2" #datetime>
            <PartsDatetime
              :start-datetime="startDatetime"
              :end-datetime="endDatetime"
              :show-tilde="isShowTilde"
            />
          </template>
          <template v-if="props.item.tags" #tags>
            <template v-if="props.item.tags.important">
              <PartsTag variant="primary" color="blue" size="small">{{
                $t('article_item-label-important')
              }}</PartsTag>
            </template>
            <template v-if="props.item.tags.new">
              <PartsTag variant="secondary" color="blue" size="small">{{
                $t('article_item-label-new')
              }}</PartsTag>
            </template>
            <template v-if="props.item.tags.noEntry">
              <PartsTag variant="secondary" color="blue" size="small">{{
                $t('article_item-label-no_entry')
              }}</PartsTag>
            </template>
            <template v-if="props.item.tags.applied">
              <PartsTag variant="primary" color="black" size="small">{{
                $t('article_item-label-applied')
              }}</PartsTag>
            </template>
          </template>
          <template v-if="props.item.hashTag" #hashtags>
            <PartsHashTag>{{ props.item.hashTag }}</PartsHashTag>
          </template>
        </PartsArticleMeta>
      </div>
    </article>
  </component>
</template>

<script lang="ts">
import type { ThemeProviderProps } from '@/components/providers/ThemeProvider.vue';

/** ArticleItemのitem prop */
export interface ArticleItem {
  /** 日付 */
  datetime1?: {
    /** 年 */
    year: string;
    /** 月 */
    month: string;
    /** 日 */
    date: string;
    /** 時 */
    hour?: string;
    /** 分 */
    minutes?: string;
  };
  /**
   * 日付
   * こちらが設定されると期間（YYYY/MM/DD〜YYYY/MM/DD）の表記となる
   */
  datetime2?: {
    /** 年 */
    year: string;
    /** 月 */
    month: string;
    /** 日 */
    date: string;
  };
  /** 記事のタグ */
  tags?: {
    /** 重要タグ */
    important?: boolean;
    /** 新着タグ */
    new?: boolean;
    /** 応募済タグ */
    applied?: boolean;
    /** エントリー不要タグ */
    noEntry?: boolean;
  };
  /** 記事タイトル */
  title?: string;
  /** サムネイルURL */
  thumbnailUrl?: string;
  /** サムネイルURL代替テキスト */
  thumbnailUrlAlt?: string;
  /** サムネイルタイプ */
  thumbnailType?: 'basic' | 'movie';
  /** 詳細ページへのリンクURL */
  detailPageUrl?: string;
  /** 詳細ページへのリンクの外部ページフラグ */
  detailPageExternal?: boolean;
  /** :visitedフラグ */
  visited?: boolean;
  /** 会員限定表示フラグ */
  locked?: boolean;
  /** ハッシュタグ */
  hashTag?: string;
  /** Articleクリック時のアクション */
  clickHandler?: () => void;
}
</script>

<script lang="ts" setup>
/** ArticleItemのprops */
interface ArticleItemProps {
  /** バリエーション */
  variant?: 'news' | 'notification' | 'article' | 'campaign' | 'knowledge';
  item: ArticleItem;
}

const props = withDefaults(defineProps<ArticleItemProps>(), {
  variant: 'news',
});

/** テーマ */
const theme = inject<ThemeProviderProps['theme']>('theme', 'light');

/** NuxtLinkかタグ名を返却 */
const component = computed(() => {
  if (props.item.detailPageUrl) return defineNuxtLink({});
  if (props.item.clickHandler) return 'button';
  return 'span';
});

/**
 * レイアウト
 * horizontal: 画像とコンテンツが横並び
 * vertical: 画像とコンテンツが縦並び
 */
const layout =
  props.variant === 'news' || props.variant === 'notification' || props.variant === 'article'
    ? 'horizontal'
    : 'vertical';

/** タイトル省略フラグ（4行以上） */
const isTruncateTitle =
  props.variant === 'news' ||
  props.variant === 'article' ||
  props.variant === 'campaign' ||
  props.variant === 'knowledge';

/** サムネイル表示フラグ */
const isShowThumbnail =
  !!props.item.thumbnailUrl &&
  (props.variant === 'news' ||
    props.variant === 'article' ||
    props.variant === 'campaign' ||
    props.variant === 'knowledge');

/** datetime1のhour, minute表示フラグ */
const isShowHourMinuteInDatetime1 =
  props.item.datetime1?.hour &&
  props.item.datetime1?.minutes &&
  (props.variant === 'news' || props.variant === 'notification');

/** 日時1 */
const startDatetime =
  // prettier-ignore
  props.item.datetime1
    ? `${props.item.datetime1.year.padStart(4, '0')}-${props.item.datetime1.month.padStart(2, '0')}-${props.item.datetime1.date.padStart(2, '0')}${isShowHourMinuteInDatetime1
      ? `T${props.item.datetime1.hour?.padStart(2, '0')}:${props.item.datetime1.minutes?.padStart(2, '0')}`
      : ''}`
    : undefined;

/** 日時2 */
const endDatetime =
  // prettier-ignore
  props.item.datetime2
    ? `${props.item.datetime2.year.padStart(4, '0')}-${props.item.datetime2.month.padStart(2, '0')}-${props.item.datetime2.date.padStart(2, '0')}`
    : undefined;

/** 「〜」表示フラグ */
const isShowTilde =
  (props.variant === 'campaign' && !!props.item.datetime1) || !!props.item.datetime2;
</script>

<style lang="scss" scoped>
.KoCampaignCard {
  display: block;

  &._clickable {
    @include on-hover-opacity;
  }
}

.ArticleItem_Content {
  display: flex;
  gap: func.rem(12);
  justify-content: space-between;

  .ArticleItem._horizontal & {
    align-items: center;

    @include mq(pc) {
      align-items: flex-start;
    }
  }

  .ArticleItem._vertical & {
    flex-direction: column;
  }

  .ArticleItem._news & {
    flex-direction: row-reverse;

    @include mq(pc) {
      gap: func.rem(40);
    }
  }
}

.ArticleItem_ImageContainer {
  .ArticleItem._horizontal & {
    width: 134px;

    @include mq(pc) {
      width: 250px;
    }
  }
}

.ArticleItem_Body {
  flex-basis: 100%;
  .ArticleItem._news & {
    @include mq(pc) {
      padding-top: func.rem(16);
    }
  }
}

.ArticleItem_Title {
  @include text(h5);

  &._truncate {
    @include truncate(3);
  }

  .ArticleItem._visited & {
    font-weight: 400;
  }
  .ArticleItem._light & {
    color: var(--color-grey-800);
  }
  .ArticleItem._dark & {
    color: var(--color-white);
  }
  .ArticleItem._light._visited & {
    color: var(--color-grey-500);
  }
}

.ArticleItem_LockIcon {
  vertical-align: func.rem(-3);
}
</style>
