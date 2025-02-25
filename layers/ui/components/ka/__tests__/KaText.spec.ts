import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import KaText from '../KaText.vue';

describe('KaText', () => {
  it('正しくレンダリングされること', () => {
    const wrapper = mount(KaText, {
      slots: {
        default: 'テストテキスト',
      },
    });
    expect(wrapper.text()).toBe('テストテキスト');
    expect(wrapper.classes()).toContain('KaText');
  });
  it('テキストが正しくレンダリングされること', () => {
    const wrapper = mount(KaText, {
      slots: {
        default: 'テストテキスト',
      },
    });
    expect(wrapper.text()).toBe('テストテキスト');
  });

  it('サイズプロパティが正しく適用されること', () => {
    const wrapper = mount(KaText, {
      props: {
        size: 'large',
      },
    });
    expect(wrapper.classes()).toContain('_large');
  });
});
