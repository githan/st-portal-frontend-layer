
<template>
  <footer class="Footer u-flex u-justify-center">
    <ProvidersThemeProvider theme="dark">
      <div class="Footer_Content u-grid u-gap-xl u-md-gap-5xl u-w-full">
        <div class="u-grid u-gap-2xl">
          <PartsGlobalLink to="/" type="button" class="u-w-fit">
            <PartsLogo size="large" />
          </PartsGlobalLink>
          <div class="u-grid u-grid-cols-6 u-md-grid-cols-12 u-gap-2xl u-md-gap-2xl u-align-start">
            <template v-for="(group, index) in FooterLinkItems" :key="index">
              <div
                :class="[
                  'u-grid u-col-span-3 u-gap-sm u-md-gap-md',
                  {
                    'u-col-span-6 u-order-2 u-md-order-0': group.type === 'rules',
                  },
                ]"
              >
                <PartsText size="small" bold color="white">{{ group.title }}</PartsText>
                <ul
                  :class="[
                    'u-grid u-gap-x-2xl u-gap-y-sm u-md-gap-y-md',
                    group.type === 'rules' && 'u-grid-cols-2',
                  ]"
                >
                  <template v-for="(item, itemIndex) in group.links" :key="itemIndex">
                    <PartsText as="li" size="x-small" color="white">
                      <component
                        :is="item.href ? GlobalLink : 'button'"
                        :type="!item.href ? 'button' : undefined"
                        :to="item.href"
                        :target="item.href && item.external ? '_blank' : undefined"
                        class="Footer_Link"
                        @click="item.onClick?.()"
                        >{{ item.title }}</component
                      >
                    </PartsText>
                  </template>
                </ul>
              </div>
            </template>
          </div>
        </div>

        <div class="u-grid u-gap-md">
          <div class="u-grid u-gap-2xs">
            <PartsText size="small" color="grey-300">{{
              $t('footer-text-company_name')
            }}</PartsText>
            <PartsText size="x-small" color="grey-300"
              >{{ $t('footer-text-post_code') }}<br />
              {{ $t('footer-text-address') }}</PartsText
            >
          </div>
          <PartsText size="x-small" color="grey-300"
            >{{ $t('footer-text-business_license1') }}<br />
            {{ $t('footer-text-business_license2') }}<br />
            {{ $t('footer-text-business_license3') }}<br />
            {{ $t('footer-text-business_license4') }}<br />
            {{ $t('footer-text-business_license5') }}</PartsText
          >
          <PartsText size="x-small" color="grey-300">{{ $t('footer-text-note') }}</PartsText>
          <PartsText size="x-small" color="grey-300">{{
            t('common_parts-text-combined_value_explanation')
          }}</PartsText>
          <PartsText size="x-small" color="grey-300">{{
            $t('footer-text-company_name_en')
          }}</PartsText>
        </div>
      </div>
    </ProvidersThemeProvider>
  </footer>
</template>

<script lang="ts" setup>
import GlobalLink from '@/components/parts/GlobalLink.vue';
import { RuleEnum } from '@/stores/rules.model';
import type { Rule, RuleEnumType } from '@/stores/rules.model';

const { t } = useI18n();

const {
  public: { SNSLink, FAQLink },
} = useRuntimeConfig();

const rulesStore = useRulesStore();

/** 規約モーダル */
const { openRulesModal } = useRuleModal();
const onClickRuleModal = async (type: RuleEnumType) => {
  await rulesStore.fetchLatestRule(type);
  openRulesModal({
    name: rulesStore.latestRule.name,
    content: rulesStore.latestRule.content,
    onCancel: () => {
      rulesStore.latestRuleList = new Map<RuleEnumType, Rule>();
      rulesStore.latestRule = {} as Rule;
    },
  });
};

/** リンク設定 */
const FooterLinkItems: {
  type: string;
  title: string;
  links: {
    title: string;
    href?: string;
    external?: boolean;
    onClick?: () => void;
  }[];
}[] = [
  {
    type: 'support',
    title: t('footer-label-support_others'),
    links: [
      {
        title: t('footer-link-faq'),
        href: FAQLink.list,
        external: true,
      },
      {
        title: t('footer-link-inquiry'),
        href: '/inquiry',
      },
      {
        title: t('footer-link-operating_company'),
        href: 'https://www.kenedix-st.com/',
        external: true,
      },
    ],
  },
  {
    type: 'rules',
    title: t('footer-label-rules'),
    links: [
      {
        title: t('footer-link-terms_of_use'),
        onClick: () => {
          onClickRuleModal(RuleEnum.TermsOfUse);
        },
      },
      {
        title: t('footer-link-terms_of_sns_use'),
        onClick: () => {
          onClickRuleModal(RuleEnum.SnsTermsOfUse);
        },
      },
      {
        title: t('footer-link-privacy_policy'),
        onClick: () => {
          onClickRuleModal(RuleEnum.PrivacyPolicy);
        },
      },
      {
        title: t('footer-link-risk_explanation'),
        onClick: () => {
          onClickRuleModal(RuleEnum.RiskExplanation);
        },
      },
      {
        title: t('footer-link-about_the_data_integration'),
        onClick: () => {
          onClickRuleModal(RuleEnum.SecurityTokens);
        },
      },
      {
        title: t('footer-link-disclaimer'),
        onClick: () => {
          onClickRuleModal(RuleEnum.Disclaimer);
        },
      },
      {
        title: t('footer-link-terms_of_website_use'),
        onClick: () => {
          onClickRuleModal(RuleEnum.TermsOfWebsiteUse);
        },
      },
    ],
  },
  {
    type: 'sns',
    title: t('footer-label-sns'),
    links: [
      {
        title: t('footer-link-line'),
        href: SNSLink.line,
        external: true,
      },
      {
        title: t('footer-link-instagram'),
        href: SNSLink.instagram,
        external: true,
      },
      {
        title: t('footer-link-facebook'),
        href: SNSLink.facebook,
        external: true,
      },
      {
        title: t('footer-link-youtube'),
        href: SNSLink.youtube,
        external: true,
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.Footer {
  padding-bottom: calc(var(--fixed-nav-height) * 1px);
  background-color: var(--color-kdx-blue-900);
}

.Footer_Content {
  max-width: 1200px;
  padding: func.rem(96) func.rem(24) func.rem(64);

  @include mq(pc) {
    padding-top: func.rem(64);
    padding-right: func.dynamic-calc-md(20, 40);
    padding-left: func.dynamic-calc-md(20, 40);
  }
}

.Footer_Link {
  @include on-hover-opacity;
}
</style>
