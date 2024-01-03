<template>
  <div class="icon-button" @click="$emit('click')">
    <img :src="require(`@/assets/images/${src}`)" />
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    hexColor: { type: String, required: false },
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
  background: #ff2323;
  box-shadow: 0px -6px 0px 0px #220202;
  user-select: none;
}
</style>
