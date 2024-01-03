<template>
  <div
    class="label-button-container flex flex-col justify-center items-center"
    @click="$emit('click')"
  >
    <div class="label-button"></div>
    <p class="mt-1 text-sm text-gray-400 font-bold uppercase">{{ label }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
  },
};
</script>

<style scoped>
.label-button-container {
  user-select: none;
}

.label-button-container:hover {
  cursor: pointer;
}

.label-button {
  width: 24px;
  height: 24px;
  border-radius: 50px;
  background: rgb(113, 131, 141);
  box-shadow: 0px -3px 0px 0px #0f0f0f;
  transition: all 400ms;
}

.label-button:hover {
  background: rgb(139, 160, 172);
}

p {
  font-size: 12px;
}
</style>
