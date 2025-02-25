<template>
  <div class="KmTabs" :class="[`_${theme}`]">
    <template v-if="props.tabList.length">
      <div class="list-wrapper">
        <div
          ref="tabListRef"
          role="tablist"
          class="tab-list"
          :class="[scrollableRight && '_scrollableRight', scrollableLeft && '_scrollableLeft']"
        >
          <template v-for="(tab, index) in props.tabList" :key="index">
            <button
              :id="`${id}-tab-${tab.id}`"
              ref="tabRefs"
              type="button"
              role="tab"
              :aria-selected="tab.id === activeTabId"
              :aria-controls="`${id}-tabpanel-${tab.id}`"
              class="tab"
              :tabindex="tab.id === activeTabId ? 0 : -1"
              @click="
                handleClickTab(tab.id);
                sendClickMeasurement(tab.title);
              "
              @keydown="handleKeydown"
            >
              <template v-if="tab.icon">
                <KaIcon :name="tab.icon" :size="24" class="tab-icon" />
              </template>
              {{ t(tab.title) }}
            </button>
          </template>
        </div>
      </div>
    </template>

    <template v-for="(tab, index) in props.tabList" :key="index">
      <div
        v-show="tab.id === activeTabId"
        :id="`${id}-tabpanel-${tab.id}`"
        role="tabpanel"
        :aria-labelledby="`${id}-tab-${tab.id}`"
        :aria-hidden="tab.id !== activeTabId"
        class="tab-panel"
      >
        <slot :name="tab.id" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ICON_LIST } from '@/components/parts/Icon.vue';
/** Tabsのprops */
type Props = {
  /** タブリスト */
  tabList: {
    id: string;
    title: string;
    icon?: (typeof ICON_LIST)[number];
  }[];
  /** アクティブタブのID */
  activeTabId?: string;
  /** テーマ */
  theme?: 'light' | 'dark';
};

const props = withDefaults(defineProps<Props>(), {
  activeTabId: undefined,
  theme: 'light',
});

const { t } = useI18n();

const { query } = useRoute();

/** タブの数 */
const tabLength = computed(() => props.tabList.length);

/** IDを生成 */
const id = useId();

/** タブのref */
const tabRefs: Ref<Array<HTMLButtonElement>> = ref([]);

/** タブリストのref */
const tabListRef = ref<HTMLElement | null>(null);

/** tablistの右にスクロール可能フラグ */
const scrollableRight = ref(false);

/** tablistの左にスクロール可能フラグ */
const scrollableLeft = ref(false);

/**
 * URLクエリに基づいてタブを選択
 */
const getTabIdFromQuery = () => {
  return props.tabList.find(tab => tab.id === query.tabId)?.id;
};

/** アクティブタブのID */
const activeTabId = ref(getTabIdFromQuery() ?? props.activeTabId ?? props.tabList[0]?.id ?? '');

/**
 * タブを切り替える
 * @param id アクティブにするタブのID
 */
const emit = defineEmits<{
  (e: 'id', val: string): void;
}>();
const handleClickTab = (id: string) => {
  activeTabId.value = id;
  emit('id', id);
};

/**
 * タブフォーカス時にキーボード操作した際の処理
 * @param event キーボードイベント
 */
const handleKeydown = (event: KeyboardEvent) => {
  let newIndex = props.tabList.findIndex(tab => tab.id === activeTabId.value);
  switch (event.key) {
    case 'ArrowRight':
      newIndex = (newIndex + 1) % tabLength.value;
      break;
    case 'ArrowLeft':
      newIndex = (newIndex - 1 + tabLength.value) % tabLength.value;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = tabLength.value - 1;
      break;
  }
  activeTabId.value = props.tabList[newIndex].id;
  tabRefs.value[newIndex].focus();
};

/**
 * タブリストがスクロール可能か判定する
 */
const detectScrollable = () => {
  if (!tabListRef.value) return;
  const tablist = tabListRef.value;
  scrollableRight.value = tablist.scrollWidth > tablist.clientWidth + tablist.scrollLeft;
  scrollableLeft.value = tablist.scrollLeft > 0;
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', detectScrollable);
  }
  if (tabListRef.value) {
    tabListRef.value.addEventListener('scroll', detectScrollable);
  }
  detectScrollable();
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', detectScrollable);
  }
  if (tabListRef.value) {
    tabListRef.value.removeEventListener('scroll', detectScrollable);
  }
});

watch(
  tabRefs,
  () => {
    detectScrollable();
  },
  { immediate: true },
);

/** クリック計測 */
const { sendClickMeasurement } = useMeasurements();
</script>

<style lang="scss" scoped>
.KmTabs {
  .list-wrapper {
    border-bottom: 1px solid var(--color-grey-200);

    @include full-width;

    @include mq(pc) {
      margin-right: 0;
      margin-left: 0;
    }
  }

  .tab-list {
    padding-right: func.rem(16);
    padding-left: func.rem(16);
    margin-bottom: -1px;
    overflow-x: auto;
    overscroll-behavior: none;
    font-size: 0;
    line-height: 0;
    white-space: nowrap;

    @include hide-scrollbar;

    @include mq(pc) {
      padding-right: 0;
      padding-left: 0;
    }
    &._scrollableRight {
      @include scrollable-gradation(right);
    }
    &._scrollableLeft {
      @include scrollable-gradation(left);
    }
    &._scrollableRight._scrollableLeft {
      @include scrollable-gradation(both);
    }

    > .tab {
      position: relative;
      display: inline-flex;
      gap: func.rem(4);
      align-items: center;
      padding: func.rem(12) var(--focus-ring-width);
      margin-right: calc(func.rem(12) - var(--focus-ring-width));
      margin-left: calc(func.rem(12) - var(--focus-ring-width));
      font-family: var(--font-default);
      font-size: func.rem(14);
      font-weight: 400;
      line-height: 1.5;
      color: var(--color-grey-600);
      border-bottom: 2px solid transparent;
      outline-offset: calc(var(--focus-ring-width) * -1);

      @include mq(pc) {
        margin-right: calc(func.dynamic-calc-md(12, 36) - var(--focus-ring-width));
        margin-left: calc(func.dynamic-calc-md(12, 36) - var(--focus-ring-width));
        font-size: func.dynamic-calc-md(14, 18);

        @include letter-spacing(-3);
      }
      &[aria-selected='true'] {
        font-weight: 700;
        color: var(--color-grey-800);
        border-bottom-color: currentcolor;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .tab-icon {
    background-color: currentcolor;
  }

  .tab-panel {
    padding-top: func.rem(24);
  }

  &._dark {
    .list-wrapper {
      border-bottom-color: var(--color-grey-400);
    }
    .tab-list > .tab {
      color: var(--color-white);
    }
  }
}
</style>
