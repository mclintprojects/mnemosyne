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
  background: #e1ddda;
  box-shadow: 0px 4px 0px 0px #111111;
  transition: all 700ms;
}

.keypad:hover {
  cursor: pointer;
}

p {
  color: #5c5c5c;
  font-size: 32px;
  line-height: normal;
}

@media screen and (max-device-width: 375px) {
  .keypad {
    height: 24px;
    width: 30px;
    padding: 20px 24px;
  }

  p {
    font-size: 24px;
  }
}

@media screen and (max-width: 812px) {
}
</style>
