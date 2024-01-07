<template>
  <div class="keypad" @click="performClick">
    <p class="font-bold">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, required: true },
  },
  methods: {
    performClick() {
      navigator.vibrate(200);
      this.$emit("keypress", this.value);
    },
  },
};
</script>

<style scoped>
.keypad {
  height: 66px;
  width: 80px;
  padding: 33px 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0px -6px 0px 0px #111111;
  transition: all 700ms;
}

.keypad:hover {
  cursor: pointer;
}

p {
  color: #717171;
  font-size: 32px;
  line-height: normal;
  user-select: none;
}

@media screen and (max-device-width: 375px) {
  .keypad {
    height: 24px;
    width: 40px;
    padding: 20px 34px;
  }

  p {
    font-size: 24px;
  }
}

@media screen and (max-width: 812px) {
}
</style>
