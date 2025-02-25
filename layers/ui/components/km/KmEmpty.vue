<template>
  <div class="KmEmpty">
    <KaIcon name="empty" class="icon" />
    <KaHeading as="p" variant="h4" text-align="center"><slot></slot></KaHeading>
  </div>
</template>

<style lang="scss" scoped>
.KmEmpty {
  display: flex;
  flex-direction: column;
  row-gap: func.rem(16);
  align-items: center;
  padding: func.rem(24) func.rem(16);

  @include mq(pc) {
    padding-top: func.rem(56 - 24);
    padding-bottom: func.rem(64);
  }

  > .icon {
    width: func.rem(64);
    height: func.rem(64);

    @include mq(pc) {
      width: func.rem(96);
      height: func.rem(96);
    }
  }
}
</style>
