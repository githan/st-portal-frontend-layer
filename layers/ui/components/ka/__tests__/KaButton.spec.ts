import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import KaButton from '../button/KaButton.vue';

describe('KaButton', () => {
  // 基本的なレンダリングテスト
  it('正しくレンダリングされること', () => {
    const wrapper = mount(KaButton, {
      slots: {
        default: 'ボタンテキスト',
      },
    });
    expect(wrapper.text()).toBe('ボタンテキスト');
    expect(wrapper.classes()).toContain('KaButton');
  });

  // プロパティテスト
  it('サイズプロパティが正しく適用されること', () => {
    const wrapper = mount(KaButton, {
      props: {
        size: 'small',
      },
    });
    expect(wrapper.classes()).toContain('_small');
  });

  it('バリアントプロパティが正しく適用されること', () => {
    const wrapper = mount(KaButton, {
      props: {
        variant: 'secondary',
      },
    });
    expect(wrapper.classes()).toContain('_secondary');
  });

  // 無効状態のテスト
  it('無効状態が正しく適用されること', () => {
    const wrapper = mount(KaButton, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.classes()).toContain('_disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  // クリックイベントのテスト
  it('クリックイベントが正しく発火すること', async () => {
    const wrapper = mount(KaButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('無効状態でクリックイベントが発火しないこと', async () => {
    const wrapper = mount(KaButton, {
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });
});
