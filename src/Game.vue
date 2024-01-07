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
              {{ lengthOfMemorizedTextSoFar }}
              memorized
            </p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center mt-6">
          <div v-if="gameplayState == 'inplay'">
            <p class="text-6xl font-bold text-center">{{ currentDigit }}</p>
            <p class="text-sm uppercase">memorize this!</p>
          </div>
          <div v-if="gameplayState == 'recollecting'" class="w-full">
            <p class="text-sm uppercase">what's the text so far?</p>
            <p class="text-2xl">
              <span class="blinking" v-if="userEntryArray.length == 0">_</span
              ><span v-else class="font-bold">{{
                shortenedRecollectionSoFar
              }}</span>
            </p>
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
      </div>
      <div class="mt-6 flex justify-end label-buttons">
        <label-button label="Restart" @click="restartGame" />
      </div>
      <div class="keypads mt-12">
        <div class="keypads-h-grid">
          <div class="keypads-h-grid-item">
            <key-pad :value="1" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="2" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="3" @keypress="handleKeyPress" />
          </div>
        </div>
        <div class="keypads-h-grid">
          <div class="keypads-h-grid-item">
            <key-pad :value="4" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="5" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="6" @keypress="handleKeyPress" />
          </div>
        </div>
        <div class="keypads-h-grid">
          <div class="keypads-h-grid-item">
            <key-pad :value="7" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="8" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="9" @keypress="handleKeyPress" />
          </div>
        </div>
        <div class="keypads-h-grid">
          <div class="keypads-h-grid-item">
            <icon-button src="eraser.svg" @click="deleteCharacter" />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="0" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <icon-button src="direct-right.svg" @click="submitEntry" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rs from "randomstring";
import KeyPad from "./components/KeyPad.vue";
import IconButton from "./components/IconButton.vue";
import LabelButton from "./components/LabelButton.vue";

export default {
  components: { KeyPad, IconButton, LabelButton },
  name: "Game",
  computed: {
    textSoFar() {
      return this.textSoFarArray.join("");
    },
    lengthOfTextSoFar() {
      return this.textSoFarArray.length;
    },
    lengthOfMemorizedTextSoFar() {
      return Math.max(0, this.lengthOfTextSoFar - 1);
    },
    isValidRecollectionSoFar() {
      const expected = this.text.substring(0, this.userEntry.length);
      return this.userEntry == expected;
    },
    shortenedRecollectionSoFar() {
      return `...${this.userEntryArray
        .slice(Math.max(0, this.userEntryArray.length - 10))
        .join("")}`;
    },
    userEntry() {
      return this.userEntryArray.join("");
    },
    acceptKeyPress() {
      return ["inplay", "recollecting"].includes(this.gameplayState);
    },
  },
  data() {
    return {
      score: 0,
      text: "",
      textSoFarArray: [],
      currentDigit: "a",
      currentCharacterIndex: 0,
      userEntryArray: [],
      livesRemaining: 3,
      gameplayState: "inplay",
      settings: {
        charset: "numeric",
      },
      sounds: {
        wrongGuess: new Audio(require("@/assets/sounds/wrongGuess.wav")),
        correctGuess: new Audio(require("@/assets/sounds/correctGuess.wav")),
        gameOver: new Audio(require("@/assets/sounds/gameOver.wav")),
      },
    };
  },
  methods: {
    setWord() {
      this.word = rs.generate({ length: 1000, charset: this.settings.charset });
    },
    setCurrentCharacter() {
      this.currentDigit = this.word[this.currentCharacterIndex];
      this.textSoFarArray.push(this.currentDigit);
      this.userEntryArray = [];
      setTimeout(() => {
        this.gameplayState = "recollecting";
      }, 3000);
    },
    handleKeyPress(keyValue) {
      if (!this.acceptKeyPress) return;

      this.userEntryArray.push(keyValue);
      this.gameplayState = "recollecting";
    },
    deleteCharacter() {
      if (this.userEntryArray.length == 0) return;
      this.userEntryArray.splice(this.userEntryArray.length - 1, 1);
    },
    submitEntry() {
      if (!this.acceptKeyPress) return;

      if (this.userEntryArray.length == this.textSoFarArray.length) {
        if (this.userEntry == this.textSoFar) {
          this.gameplayState = "correct_guess";
          this.sounds.correctGuess.play();

          setTimeout(() => {
            this.score++;
            this.setCurrentCharacter();
            this.currentCharacterIndex++;
            this.gameplayState = "inplay";
          }, 1500);
        } else {
          this.loseLife();
        }
      } else {
        this.loseLife();
      }
    },
    loseLife() {
      this.livesRemaining = Math.max(this.livesRemaining - 1, 0);

      if (this.livesRemaining <= 0) {
        this.gameplayState = "game_over";
        this.livesRemaining = 3;
        this.sounds.gameOver.play();
      } else {
        this.gameplayState = "wrong_guess";
        this.sounds.wrongGuess.play();
        setTimeout(this.restartGame, 1500);
      }
    },
    restartGame() {
      this.setWord();
      this.currentCharacterIndex = 0;
      this.textSoFarArray = [];
      this.setCurrentCharacter();
      this.gameplayState = "inplay";
    },
  },
  mounted() {
    this.setWord();
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
  height: 170px;
  color: var(--secondary-text-color);
  box-shadow: 0px 8px 0px 0px rgba(0, 0, 0, 0.54) inset;
  user-select: none;
}

.keypads {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 32px;
}

.keypads-h-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.keypads-h-grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-device-width: 375px) {
  .keypads {
    row-gap: 8px;
  }
}

@media screen and (max-width: 812px) {
  #game {
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
  }
}
</style>
