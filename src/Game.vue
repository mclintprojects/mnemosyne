<template>
  <div class="scene">
    <div id="game" class="shadow-2xl">
      <div class="text-white">
        <p class="font-bold uppercase">M1</p>
        <p class="text-sm text-gray-300">Game player</p>
      </div>
      <div class="screen mt-6">
        <div class="flex items-center justify-between">
          <div class="flex">
            <div class="flex items-center mr-3">
              <img src="./assets/images/heart.svg" />
              <p class="ml-2">{{ livesRemaining }}</p>
            </div>
            <div class="flex items-center">
              <img src="./assets/images/medal-star.svg" />
              <p class="ml-2">{{ score }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <img src="./assets/images/text.svg" />
            <p class="ml-2">
              {{ lengthOfTextSoFar }} digit{{
                lengthOfTextSoFar > 1 ? "s" : ""
              }}
            </p>
          </div>
        </div>
        <div
          class="w-full flex justify-center items-center"
          style="height: 88px"
        >
          <div v-if="gameplayState == 'inplay'">
            <p class="text-3xl font-bold text-center">{{ currentDigit }}</p>
            <p class="text-sm uppercase">current digit</p>
          </div>
          <div v-if="gameplayState == 'correct_guess'">
            <img src="./assets/images/verify.svg" class="mx-auto" />
            <p class="text-sm mt-2">Damn, you're good!</p>
          </div>
          <div v-if="gameplayState == 'wrong_guess'">
            <img src="./assets/images/incorrect.svg" class="mx-auto" />
            <p class="text-sm mt-2">That ain’t it!</p>
          </div>
          <div v-if="gameplayState == 'game_over'">
            <img src="./assets/images/judge.svg" class="mx-auto" />
            <p class="text-sm mt-2">Game over!</p>
          </div>
        </div>
        <div>
          <p class="text-sm uppercase">Your entry</p>
          <p>{{ shortenedRecollectionSoFar }}</p>
        </div>
      </div>
      <div class="buttons"></div>
      <div class="keypads mt-16">
        <div class="keypads-h-grid">
          <key-pad :value="1" />
          <key-pad :value="2" />
          <key-pad :value="3" />
        </div>
        <div class="keypads-h-grid">
          <key-pad :value="4" />
          <key-pad :value="5" />
          <key-pad :value="6" />
        </div>
        <div class="keypads-h-grid">
          <key-pad :value="7" />
          <key-pad :value="6" />
          <key-pad :value="8" />
        </div>
        <div class="keypads-h-grid">
          <key-pad :value="1" />
          <key-pad :value="0" />
          <key-pad :value="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rs from "randomstring";
import KeyPad from "./components/KeyPad.vue";

export default {
  components: { KeyPad },
  name: "Game",
  computed: {
    lengthOfTextSoFar() {
      return this.textSoFar.length;
    },
    isValidRecollectionSoFar() {
      const expected = this.text.substring(0, this.userEntry.length);
      return this.userEntry == expected;
    },
    shortenedRecollectionSoFar() {
      return `...${this.userEntry.substring(
        Math.max(0, this.userEntry.length - 10)
      )}`;
    },
  },
  data() {
    return {
      score: 0,
      text: "",
      textSoFar: "",
      currentDigit: "a",
      currentCharacterIndex: 0,
      userEntry: "",
      livesRemaining: 3,
      gameplayState: "game_over",
      settings: {
        charset: "numeric",
      },
    };
  },
  methods: {
    setCurrentCharacter() {
      this.textSoFar = this.word.substring(0, this.currentCharacterIndex + 1);
      this.currentDigit = this.word[this.currentCharacterIndex];
      this.userEntry = "";
    },
    submitEntry() {
      if (this.userEntry.length == this.textSoFar.length) {
        if (this.userEntry == this.textSoFar) {
          this.currentCharacterIndex++;
          this.score++;
          this.setCurrentCharacter();

          this.$toasted.success("Correct!");
        } else {
          this.$toasted.error("Incorrect guess. Try again!");
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
.scene {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#game {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: var(--background-color);
  width: 390px;
  margin: 0 auto;
  height: 844px;
  padding: 24px;
  border-radius: 20px;
}

.screen {
  background-color: #67b094;
  border-radius: 6px;
  width: 100%;
  padding: 24px;
  height: 197px;
  color: var(--secondary-text-color);
}

.keypads {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 24px;
}

.keypads-h-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
</style>
