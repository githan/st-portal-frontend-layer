
<i18n lang="yaml">
  ja:
    funds: ファンドを探す
    promotions: キャンペーン
    news: ニュース
    knowledge: 不動産STを知る
    asset-management: 資産サマリ―
    support-others: サポート・その他
  en:
    funds: Find Funds
    promotions: Campaign
    news: News
    knowledge: Knowledge
    assets-management: Assets
    support-others: Support
</i18n>

<template>
  <header
    class="KoTheHeader"
    :class="[
      `_${props.variant}`,
      {
        _login: isLoggedIn,
        '_menu-opened': isOpenSubMenuFull,
      },
    ]"
  >
    <ProvidersThemeProvider theme="dark">
      <template v-if="$slots.before">
        <slot name="before"></slot>
      </template>
      <div class="KoTheHeader_Inner">
        <div class="KoTheHeader_MainContainer">
          <component
            :is="props.logoLinkUrl ? GlobalLink : 'div'"
            :to="props.logoLinkUrl || undefined"
            class="logo"
          >
            <KaLogo />
          </component>

          <template v-if="props.variant !== 'simple'">
            <nav class="KoTheHeader_Nav" :aria-label="$t('header-aria_label-main_menu')">
              <ul class="KoTheHeader_MenuBar">
                <template v-for="menu in MENU_LIST" :key="menu.id">
                  <li class="KoTheHeader_MenuBarItem">
                    <template v-if="!menu.submenu">
                      <template v-if="!menu.disabled">
                        <PartsGlobalLink
                          :to="!menu.disabled ? menu.href : undefined"
                          :tabindex="!menu.disabled ? 0 : -1"
                          :class="[
                            'KoTheHeader_MenuItem',
                            {
                              _disabled: menu.disabled,
                            },
                          ]"
                          @click="sendClickMeasurement(menu.name)"
                          >{{ t(menu.name)
                          }}<template v-if="menu.tag">
                            <HeaderTag>{{ t(menu.tag) }}</HeaderTag>
                          </template></PartsGlobalLink
                        >
                      </template>
                      <template v-else>
                        <button type="button" disabled class="KoTheHeader_MenuItem _disabled">
                          {{ t(menu.name) }}
                          <template v-if="menu.tag">
                            <HeaderTag variant="secondary" color="grey-500">{{
                              t(menu.tag)
                            }}</HeaderTag>
                          </template>
                        </button>
                      </template>
                    </template>
                    <template v-else-if="menu.id === 'knowledge' || menu.id === 'support'">
                      <button
                        type="button"
                        :tabindex="!menu.disabled ? 0 : -1"
                        :disabled="menu.disabled"
                        aria-haspopup="true"
                        :aria-controls="`header-submenu-${menu.id}`"
                        :aria-expanded="openedSubmenuId === menu.id"
                        :class="[
                          'KoTheHeader_MenuItem',
                          {
                            _disabled: menu.disabled,
                          },
                        ]"
                        @click="handleDropdownClick(menu.id)"
                      >
                        {{ t(menu.name) }}
                        <PartsIcon
                          :name="openedSubmenuId !== menu.id ? 'chevron-down' : 'chevron-up'"
                          :size="16"
                          color="white"
                          aria-hidden="true"
                        />
                        <template v-if="menu.tag">
                          <HeaderTag
                            :variant="menu.disabled ? 'secondary' : undefined"
                            :color="menu.disabled ? 'grey-500' : undefined"
                            >{{ t(menu.tag) }}</HeaderTag
                          >
                        </template>
                      </button>
                      <Transition
                        name="KoTheHeader_SubMenuSupportContainer"
                        enter-from-class="_enterFrom"
                        leave-to-class="_leaveTo"
                        :duration="300"
                      >
                        <div
                          v-show="openedSubmenuId === menu.id"
                          :id="`header-submenu-${menu.id}`"
                          role="menu"
                          class="KoTheHeader_SubMenuSupportContainer"
                        >
                          <HeaderSubMenu
                            :variant="menu.id"
                            :is-registered-passkey="isRegisteredPasskey"
                            :carousel-banner-list="carouselBannerList"
                            :login="isLoggedIn"
                            @close-membership-cancel-modal="openedSubmenuId = undefined"
                          />
                        </div>
                      </Transition>
                    </template>
                  </li>
                </template>
              </ul>
            </nav>

            <div class="KoTheHeader_ButtonWrapper">
              <!-- ログイン・新規登録ボタン：未ログイン時に表示 -->
              <template v-if="!isLoggedIn">
                <LayoutsButtonContainer variant="horizontal">
                  <div class="login u-flex-shrink-0">
                    <PartsButton
                      as="a"
                      href="/login"
                      variant="secondary"
                      size="small"
                      class="u-whitespace-nowrap"
                      development-key="header-button-login"
                      >{{ $t('header-button-login') }}</PartsButton
                    >
                  </div>
                  <div class="register u-hidden u-md-block u-flex-shrink-0">
                    <PartsButton
                      as="a"
                      href="/register"
                      variant="primary"
                      size="small"
                      development-key="header-button-register"
                      >{{ $t('header-button-register') }}</PartsButton
                    >
                  </div>
                </LayoutsButtonContainer>
              </template>

              <!-- アイコン：ログイン時に表示 -->
              <template v-else>
                <div class="KoTheHeader_IconButtonWrapper">
                  <!-- 通知アイコン -->
                  <template v-if="props.notificationIcon">
                    <PartsNotification
                      :count="activeUser.notificationUnreadCount"
                      :title="$t('header-tooltip-notification')"
                      class="u-self-stretch"
                    />
                  </template>
                  <!-- お気に入りアイコン -->
                  <template v-if="props.favoriteIcon">
                    <button
                      type="button"
                      :aria-label="$t('header-aria_label-favorite')"
                      class="KoTheHeader_IconButton"
                      @click="handleBookmarkClick"
                    >
                      <PartsIcon
                        :name="isFavorite ? 'heart-filled' : 'heart-outlined'"
                        :size="24"
                        color="white"
                      />
                    </button>
                  </template>
                  <!-- Shareアイコン -->
                  <template v-if="props.shareUrl && isSupportedWebShareApi && isSpLayout">
                    <button
                      type="button"
                      :aria-label="$t('header-aria_label-share')"
                      class="KoTheHeader_IconButton"
                      @click="props.shareUrl && shareViaWebShare(props.shareUrl)"
                    >
                      <PartsIcon name="share" :size="24" color="white" />
                    </button>
                  </template>
                </div>
              </template>

              <!-- メニューアイコン：ウインドウ幅1200px未満で表示 -->
              <div class="KoTheHeader_IconButtonWrapper _menu">
                <button
                  ref="menuIconRef"
                  type="button"
                  :aria-label="
                    !isOpenSubMenuFull
                      ? $t('header-aria_label-open_main_menu')
                      : $t('header-aria_label-close_main_menu')
                  "
                  aria-controls="header-submenu-full"
                  :aria-expanded="isOpenSubMenuFull"
                  class="KoTheHeader_IconButton"
                  @click="handleMenuClick"
                >
                  <template v-if="isOpenSubMenuFull">
                    <PartsIcon name="close" color="white" :size="24" aria-hidden="true" />
                  </template>
                  <template v-else-if="!isLoggedIn">
                    <PartsIcon
                      name="menu"
                      color="white"
                      :size="24"
                      aria-hidden="true"
                      :title="$t('header-tooltip-profile_image')"
                    />
                  </template>
                  <template v-else>
                    <PartsAvatar
                      :src="activeUser.icon"
                      :size="24"
                      :alt="$t('header-alt-profile_image')"
                      :title="$t('header-tooltip-profile_image')"
                    />
                  </template>
                </button>

                <Transition
                  name="KoTheHeader_SubMenuUserContainer"
                  enter-from-class="_enterFrom"
                  leave-to-class="_leaveTo"
                  :duration="300"
                >
                  <div
                    v-show="isOpenSubMenuFull"
                    id="header-submenu-full"
                    ref="subMenuFullRef"
                    role="menu"
                    class="KoTheHeader_SubMenuUserContainer"
                  >
                    <HeaderSubMenu
                      variant="compact"
                      :is-registered-passkey="isRegisteredPasskey"
                      :carousel-banner-list="carouselBannerList"
                      :login="isLoggedIn"
                      class="KoTheHeader_SubMenu _compact"
                      @close-membership-cancel-modal="closeSubMenuFull"
                      @in-logout="isOpenSubMenuFull = false"
                    />
                    <HeaderSubMenu
                      variant="full"
                      :is-registered-passkey="isRegisteredPasskey"
                      :carousel-banner-list="carouselBannerList"
                      :login="isLoggedIn"
                      class="KoTheHeader_SubMenu _full"
                      @close-membership-cancel-modal="closeSubMenuFull"
                      @in-logout="isOpenSubMenuFull = false"
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </template>
        </div>
        <template v-if="$slots.default">
          <div class="KoTheHeader_SubContainer">
            <slot></slot>
          </div>
        </template>
      </div>

      <div
        v-show="openedSubmenuId || isOpenSubMenuFull"
        role="button"
        aria-hidden="true"
        class="KoTheHeader_SubMenuOverlay"
        @click="handleOverlayClick"
      ></div>
    </ProvidersThemeProvider>
  </header>
</template>

<script lang="ts" setup>
import GlobalLink from '@/components/parts/GlobalLink.vue';
import type { CarouselBanner } from '@/stores/promotions.model';

/** Headerのprops */
interface HeaderProps {
  /** バリエーション */
  variant?: 'basic' | 'simple' | 'gradation';
  /** 通知アイコンの有無（ログイン時のみ表示） */
  notificationIcon?: boolean;
  /** お気に入りアイコンの有無（ログイン時かつSPレイアウト時のみ表示） */
  favoriteIcon?: boolean;
  /** シェアしたいページのURL（ログイン時かつウェブ共有API対応時かつSPレイアウト時のみ表示） */
  shareUrl?: string;
  /** お気に入り状態（ログイン時かつSPレイアウト時のみ表示） */
  isFavorite?: boolean;
  /**
   * ロゴ押下時の遷移先
   * 空文字もしくはfalseを指定するとロゴをリンク化しない
   */
  logoLinkUrl?: string | false;
}

const props = withDefaults(defineProps<HeaderProps>(), {
  variant: 'basic',
  notificationIcon: true,
  favoriteIcon: false,
  shareUrl: undefined,
  isFavorite: undefined,
  logoLinkUrl: '/',
});

const emit = defineEmits(['clickFavorite']);
const router = useRouter();

const { t } = useI18n();

/** クリック計測 */
const { sendClickMeasurement } = useMeasurements();

/** キャンペーン一覧 */
const promotionsStore = usePromotionsStore();
const { openingPromotionList } = storeToRefs(promotionsStore);

/** ログイン判定 */
const { accessToken } = useAuthStore();
const isLoggedIn = ref(accessToken !== '' && accessToken !== undefined);

/** キャッシュされたパスキー取得 */
const { data: cachedPasskeyList } = useNuxtData<unknown[]>(CallOnceDataKey.PasskeyList);
const isRegisteredPasskey = ref(
  cachedPasskeyList.value !== null &&
    cachedPasskeyList.value !== undefined &&
    cachedPasskeyList.value.length > 0,
);

const userStore = useUserStore();
const { activeUser } = storeToRefs(userStore);

/** バナー設定 */
const carouselBannerList: CarouselBanner[] = [];
/** キャンペーン一覧 上から5件取得 */
for (const promotion of openingPromotionList.value.slice(0, 5)) {
  const carouselBanner: CarouselBanner = {
    src: promotion.originalTopImageUrl,
    to: `/promotions/${promotion.slug}`,
    alt: promotion.topImageAltText,
  };
  carouselBannerList.push(carouselBanner);
}

/** subMenuFull要素 */
const subMenuFullRef = ref<HTMLElement>();

/** サブメニューボタン要素 */
const menuIconRef = ref<HTMLButtonElement>();

/**
 * フォーカスされている要素
 * ドロップダウンにフォーカスを戻すために使用
 */
const activeElement = ref<HTMLElement>();

const { isSpLayout } = useDetectSpLayout();

const { activateScrollLock, deactivateScrollLock } = useScrollLock();

const { activateFocusTrap, deactivateFocusTrap } = useFocusTrap(subMenuFullRef);

/** 開いているサブメニューのID */
const openedSubmenuId = ref<string>();

/** メニュー開閉フラグ */
const isOpenSubMenuFull = ref(false);

/** ウェブ共有APIのサポート状態 */
const isSupportedWebShareApi = ref(false);

/** グローバルメニュー */
const MENU_LIST: {
  id: string;
  name: string;
  href?: string;
  submenu?: boolean;
  disabled?: boolean;
  tag?: string;
}[] = [
  {
    id: 'funds',
    name: 'funds',
    href: '/funds',
  },
  {
    id: 'promotions',
    name: 'promotions',
    href: '/promotions',
  },
  {
    id: 'news',
    name: 'news',
    href: '/news',
  },
  {
    id: 'knowledge',
    name: 'knowledge',
    submenu: true,
  },
  {
    id: 'asset',
    name: 'asset-management',
    href: '/asset',
    // disabled: true, // NOTE: 公開前
    // tag: 'header-label-upcoming', // NOTE: 公開前
    tag: 'New', // NOTE: 公開後
  },
  {
    id: 'support',
    name: 'support-others',
    submenu: true,
  },
];

/**
 * サブメニューがあるグローバルメニューを押下時の処理
 * @param id dropdown ID
 */
const handleDropdownClick = (id: string) => {
  if (openedSubmenuId.value === id) {
    closeDropdownMenu();
    return;
  }
  openDropdownMenu(id);
};

/**
 * メニューアイコン押下時の処理
 */
const handleMenuClick = () => {
  openSubMenuFull();
};

/**
 * サブメニューを開く
 */
const openSubMenuFull = async () => {
  isOpenSubMenuFull.value = true;
  if (isSpLayout.value) {
    await nextTick();
    activateScrollLock();
    activateFocusTrap();
  }
  menuIconRef.value?.blur();
  // クリック計測
  sendClickMeasurement('header-aria_label-open_main_menu');
};

/**
 * サブメニューを閉じる
 */
const closeSubMenuFull = () => {
  isOpenSubMenuFull.value = false;
  if (isSpLayout.value) {
    deactivateScrollLock();
    deactivateFocusTrap();
  }
  menuIconRef.value?.focus();
  // クリック計測
  sendClickMeasurement('header-aria_label-close_main_menu');
};

/**
 * ドロップダウンメニューを開く
 * @param id dropdown ID
 */
const openDropdownMenu = (id: string) => {
  if (document.activeElement instanceof HTMLElement) {
    activeElement.value = document.activeElement;
  }
  openedSubmenuId.value = id;
  // クリック計測
  sendClickMeasurement(`header-label-${id}`);
};

/**
 * ドロップダウンメニューを閉じる
 */
const closeDropdownMenu = () => {
  openedSubmenuId.value = undefined;
  activeElement.value?.focus();
  activeElement.value = undefined;
};

/**
 * オーバーレイ押下時の処理
 */
const handleOverlayClick = () => {
  if (isOpenSubMenuFull.value) {
    closeSubMenuFull();
    return;
  }

  if (openedSubmenuId.value) {
    closeDropdownMenu();
  }
};

/**
 * Escキー押下時の処理
 * @param event イベントオブジェクト
 */
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (isOpenSubMenuFull.value) {
      event.preventDefault();
      closeSubMenuFull();
    }
    if (openedSubmenuId.value) {
      event.preventDefault();
      closeDropdownMenu();
    }
  }
};

/** お気に入りボタン押下時の処理 */
const handleBookmarkClick = () => {
  emit('clickFavorite');
};

/** ウェブ共有APIのサポート状態を更新 */
const updateSupportedWebShareApi = () => {
  if (!props.shareUrl) return;
  isSupportedWebShareApi.value = detectSupportedWebShareApi(props.shareUrl);
};

const routerAfterEachStop = router.afterEach((to, from) => {
  // リンク発火時にパスの変更がない場合はドロップダウンおよびサブメニューを閉じる
  if (to.path === from.path) {
    if (isOpenSubMenuFull.value) {
      closeSubMenuFull();
    }
    if (openedSubmenuId.value) {
      closeDropdownMenu();
    }
  }
});

watch(isSpLayout, newValue => {
  if (isOpenSubMenuFull.value) {
    if (newValue) {
      activateScrollLock();
      activateFocusTrap();
    } else {
      deactivateScrollLock();
      deactivateFocusTrap();
    }
  }
});

onMounted(() => {
  updateSupportedWebShareApi();
  window.addEventListener('keydown', handleEscKey);

  // activeUser.iconが存在する場合dataUrlIconを設定する 一度だけ実行
  if (activeUser.value.icon) callOnce(() => userStore.setDataUrlIcon());
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscKey);
  routerAfterEachStop();
});
</script>

<style lang="scss" scoped>
@use 'sass:map';

$header-max-width: 1600px;
$header-height: func.rem(56);

.KoTheHeader {
  width: 100vw;

  &._basic,
  &._simple {
    background-color: var(--color-kdx-blue-900);
    box-shadow:
      0 4px 8px 0 rgb(20 20 20 / 15%),
      0 0 18px 0 rgb(20 20 20 / 5%);

    @include mq(pc) {
      box-shadow:
        0 4px 16px 0 rgb(20 20 20 / 5%),
        0 0 18px 0 rgb(20 20 20 / 5%);
    }
  }

  &._gradation {
    position: absolute;
    inset: 0;

    @include mq(sp) {
      &._menu-opened {
        position: static;
        background-color: var(--color-kdx-blue-900);
      }
    }
  }

  &_MainContainer {
    max-width: calc($header-max-width + func.rem(48)); // NOTE: 左右のpadding分幅を増やす
    min-height: $header-height;
    margin-inline: auto;

    @include mq(sp) {
      padding-right: func.dynamic-calc-sm(16, 24);
      padding-left: func.dynamic-calc-sm(16, 24);
    }

    @include mq(pc) {
      padding-right: func.rem(24);
      padding-left: func.rem(24);
    }

    .KoTheHeader._gradation & {
      @include mq(xl) {
        min-height: calc($header-height - 1px); // NOTE: border-bottom分高さを減らす
      }
    }
  }

  &_SubContainer {
    padding-right: func.rem(16);
    padding-left: func.rem(16);
  }

  .KoTheHeader_Inner {
    position: relative;

    > .KoTheHeader_MainContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    > .KoTheHeader_MainContainer > .logo {
      display: flex;
      flex-shrink: 0;
    }

    .KoTheHeader._gradation & {
      @include mq(xl) {
        border-bottom: 1px solid var(--color-grey-600);
      }

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        display: block;
        width: 100%;
        pointer-events: none;
        content: '';

        @include mq(sp) {
          height: func.rem(88);
          background-image: linear-gradient(
            to bottom,
            var(--color-grey-800) 10%,
            rgb(12 12 12 / 30%) 78.98%,
            transparent 100%
          );
        }

        @include mq(pc) {
          height: func.rem(160);
          background-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 34.76%,
            rgb(0 0 0 / 35%) 61.47%,
            rgb(0 0 0 / 0%) 100%
          );
        }
      }
    }

    @include mq(sp) {
      .KoTheHeader._gradation._menu-opened & {
        &::before {
          content: none;
        }
      }
    }
  }

  .KoTheHeader_ButtonWrapper {
    display: flex;
    flex-shrink: 0;
    gap: func.rem(24);
    align-items: center;
    align-self: stretch;
  }
}

.KoTheHeader_Nav {
  display: none;

  @include mq(xl) {
    display: block;
    align-self: stretch;
  }
}

.KoTheHeader_MenuBar {
  display: flex;
  gap: func.dynamic-calc-xl(24, 48);
  height: 100%;
  .KoTheHeader._login & {
    gap: func.dynamic-calc-xl(24, 64);
  }
}

.KoTheHeader_MenuBarItem {
  position: relative;
}

.KoTheHeader_MenuItem {
  display: flex;
  gap: func.rem(4);
  align-items: center;
  height: 100%;
  font-size: func.rem(14);
  font-weight: 400;
  line-height: 1.4285;
  color: var(--color-grey-50);

  @include on-hover-opacity;

  &._disabled {
    color: var(--color-grey-500);
    pointer-events: none;
  }
}

.KoTheHeader_SubMenuSupportContainer {
  position: absolute;
  top: 100%;
  left: -16px;
  z-index: var(--z-index-header-submenu);
  display: block;
  width: 292px;
  transition: opacity 0.3s ease-out;

  &._enterFrom,
  &._leaveTo {
    opacity: 0;
  }
}

.KoTheHeader_SubMenuUserContainer {
  position: absolute;
  top: 100%;
  z-index: var(--z-index-header-submenu);
  display: block;
  // スクロール時でも動的に高さを取得するためdvhを使用
  max-height: calc(100dvh - $header-height);
  overflow-y: auto;
  transition: opacity 0.3s ease-out;

  @include custom-scrollbar;

  @include mq(sp) {
    right: calc(func.dynamic-calc-sm(16, 24) * -1);
    width: calc(var(--vw, 1vw) * 100);
  }

  @include mq(pc) {
    // scrollbar width
    right: func.rem(-8);
    width: min(390px, calc(var(--vw, 1vw) * 100));
  }

  &._enterFrom,
  &._leaveTo {
    opacity: 0;
  }
}

.KoTheHeader_SubMenu {
  &._full {
    @include mq(xl) {
      display: none;
    }
  }
  &._compact {
    display: none;

    @include mq(xl) {
      display: block;
    }
  }
}

.KoTheHeader_SubMenuOverlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-header-submenu-overlay);
  width: 100%;
  height: 100%;
}

.KoTheHeader_ButtonSignUp {
  display: none;

  @include mq(pc) {
    display: block;
  }
}

.KoTheHeader_IconButtonWrapper {
  display: flex;
  gap: func.rem(24);
  height: 100%;

  &._menu {
    position: relative;
    flex-shrink: 0;
    gap: 0;
    .KoTheHeader:not(._login) & {
      @include mq(xl) {
        display: none;
      }
    }
  }
}

.KoTheHeader_IconButton {
  display: flex;
  align-items: center;
  align-self: stretch;

  @include on-hover-opacity;
}
</style>
