<template>
  <div id="game">
    <div class="flex justify-between items-center p-4 bg-gray-100">
      <p class="text-sm uppercase text-gray-500">Mnemosyne</p>
      <p class="text-sm font-bold uppercase text-gray-800">
        Score &bull; {{ score }}
      </p>
    </div>
    <div class="p-4">
      <p class="text-sm uppercase text-gray-500">Next char</p>
      <p class="text-8xl text-gray-900">{{ currentCharacter }}</p>
    </div>
    <div class="px-4 mt-10">
      <textarea
        v-model="userEntry"
        rows="10"
        resize="none"
        class="w-full"
        @input="submitEntry"
      ></textarea>
    </div>
  </div>
</template>

<script>
import rs from "randomstring";

export default {
  name: "Game",
  data() {
    return {
      score: 0,
      word: "",
      wordSoFar: "",
      currentCharacter: "a",
      currentCharacterIndex: 0,
      userEntry: "",
      settings: {
        charset: "alphabetic",
      },
    };
  },
  methods: {
    setCurrentCharacter() {
      this.wordSoFar = this.word.substring(0, this.currentCharacterIndex + 1);
      this.currentCharacter = this.word[this.currentCharacterIndex];
      this.userEntry = "";
    },
    submitEntry() {
      console.log({ wordSoFar: this.wordSoFar });
      if (this.userEntry.length == this.wordSoFar.length) {
        if (this.userEntry == this.wordSoFar) {
          this.currentCharacterIndex++;
          this.score++;
          this.setCurrentCharacter();
        }
      }
    },
  },
  mounted() {
    this.word = rs.generate({ length: 1000, charset: this.settings.charset });
    this.setCurrentCharacter();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#game {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
