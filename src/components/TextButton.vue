<template>
  <div
    class="text-button"
    :style="{
      background: `#${hexColor}`,
    }"
    @click="performClick"
  >
    <p class="text-button-text uppercase">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    hexColor: { type: String, required: false },
  },
  methods: {
    performClick() {
      navigator.vibrate(200);
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.text-button {
  display: flex;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50px;
  box-shadow: 0px 4px 0px 0px #220202;
}

.text-button:hover {
  cursor: pointer;
}

.text-button-text {
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: bold;
}
</style>
