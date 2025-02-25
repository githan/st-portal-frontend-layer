import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import KaButtonIcon from '../button/KaButtonIcon.vue';

describe('KaButtonIcon', () => {
  // 基本的なレンダリングテスト
  it('正しくレンダリングされること', () => {
    const wrapper = mount(KaButtonIcon, {
      slots: {
        default: 'ボタンテキスト',
      },
    });
    expect(wrapper.text()).toBe('ボタンテキスト');
    expect(wrapper.classes()).toContain('KaButtonIcon');
  });
});
