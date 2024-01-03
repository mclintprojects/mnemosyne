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
      this.$emit("keypress", this.value);
    },
  },
};
</script>

<style scoped>
.keypad {
  height: 86px;
  width: 100px;
  padding: 33px 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0px -6px 0px 0px #818181;
  transition: all 700ms;
}

.keypad:hover {
  cursor: pointer;
}

p {
  color: #717171;
  font-size: 48px;
  line-height: normal;
  user-select: none;
}
</style>
