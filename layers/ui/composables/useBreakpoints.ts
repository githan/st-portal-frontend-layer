import { useBreakpoints } from '@vueuse/core';

/** モバイルブレイクポイント */
export const mobileBreakpoint = 768;
/** デスクトップブレイクポイント */
export const desktopBreakpoint = 1024;

/**
 * ブレイクポイントを返す
 * @returns ブレイクポイント
 */
export default function () {
  const breakpoints = useBreakpoints({
    mobile: mobileBreakpoint,
    desktop: desktopBreakpoint,
  });

  const isSp = breakpoints.smaller('mobile');
  const isTb = breakpoints.between('mobile', 'desktop');
  const isPc = breakpoints.greater('desktop');

  return {
    isSp,
    isTb,
    isPc,
  };
}
