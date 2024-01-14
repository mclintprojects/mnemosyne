<template>
  <div class="icon-button" @click="performClick">
    <img :src="require(`@/assets/images/${src}`)" />
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
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
.icon-button {
  display: flex;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50px;
  background: #ff7a7a;
  box-shadow: 0px 4px 0px 0px #220202;
  user-select: none;
}
</style>
