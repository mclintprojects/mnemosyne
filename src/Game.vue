<template>
  <div class="scene">
    <div id="game" class="shadow-2xl">
      <div>
        <p class="font-bold text-gray-800 uppercase">RECLL-1</p>
        <p class="text-sm text-gray-500">Digits</p>
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
          <div
            class="flex items-center"
            v-if="
              lengthOfMemorizedTextSoFar > 0 && gameplayState == 'recollecting'
            "
          >
            <img src="./assets/images/text.svg" />
            <p class="ml-2">
              {{ lengthOfMemorizedTextSoFar + 1 }}
              digit{{ lengthOfMemorizedTextSoFar + 1 == 1 ? "" : "s" }} to
              recall
            </p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center mt-6">
          <div v-if="gameplayState == 'inplay'">
            <p class="text-3xl font-bold text-center">
              {{ textSoFar }}
            </p>
            <p class="text-sm uppercase text-center">memorize this :)</p>
          </div>
          <div v-if="gameplayState == 'recollecting'" class="w-full">
            <p class="text-sm uppercase">
              recall the digit{{ lengthOfMemorizedTextSoFar == 0 ? "" : "s" }}
              so far
            </p>
            <p class="text-2xl">
              <span class="blinking" v-if="userEntryArray.length == 0">_</span
              ><span v-else class="font-bold">{{ userEntry }}</span>
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
            <p class="text-sm mt-2">Game over! Tweet score?</p>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-end label-buttons">
        <label-button label="Restart" @click="resetGame" />
      </div>
      <div class="keypads mt-6 lg:mt-12">
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
            <text-button
              text="<- del"
              @click="deleteCharacter"
              hexColor="ff7a7a"
            />
          </div>
          <div class="keypads-h-grid-item">
            <key-pad :value="0" @keypress="handleKeyPress" />
          </div>
          <div class="keypads-h-grid-item">
            <text-button
              text="-> Enter"
              @click="submitEntry"
              hexColor="67B094"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rs from "randomstring";
import KeyPad from "./components/KeyPad.vue";
import TextButton from "./components/TextButton.vue";
import LabelButton from "./components/LabelButton.vue";

const sounds = {
  wrongGuess: new Audio(require("@/assets/sounds/wrongGuess.wav")),
  correctGuess: new Audio(require("@/assets/sounds/correctGuess.wav")),
  gameOver: new Audio(require("@/assets/sounds/gameOver.wav")),
};

export default {
  components: { KeyPad, TextButton, LabelButton },
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
    };
  },
  methods: {
    playSound(sound) {
      const audio = sounds[sound];
      audio.currentTime = 0;
      audio.play();
    },
    setWord() {
      this.word = rs.generate({ length: 1000, charset: this.settings.charset });
    },
    setCurrentCharacter() {
      this.currentDigit = this.word[this.currentCharacterIndex];
      this.textSoFarArray.push(this.currentDigit);
      this.userEntryArray = [];
    },
    handleKeyPress(keyValue) {
      if (!this.acceptKeyPress) return;

      this.userEntryArray.push(keyValue);
      if (this.gameplayState == "inplay") this.gameplayState = "recollecting";
    },
    deleteCharacter() {
      if (this.userEntryArray.length == 0) return;
      this.userEntryArray.splice(this.userEntryArray.length - 1, 1);
    },
    submitEntry() {
      if (this.gameplayState == "game_over") {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `My high score is ${this.score}. Can you memorize longer digits? ${window.location.href}`
          )}`,
          "_blank"
        );
      } else {
        if (!this.acceptKeyPress) return;

        if (this.userEntryArray.length == this.textSoFarArray.length) {
          if (this.userEntry == this.textSoFar) {
            this.score++;
            this.gameplayState = "correct_guess";
            this.playSound("correctGuess");

            setTimeout(() => {
              this.setCurrentCharacter();
              this.currentCharacterIndex++;
              this.gameplayState = "inplay";
              this.requestRecollection();
            }, 1500);
          } else {
            this.loseLife();
          }
        } else {
          this.loseLife();
        }
      }
    },
    loseLife() {
      this.livesRemaining = Math.max(this.livesRemaining - 1, 0);

      if (this.livesRemaining <= 0) {
        this.gameplayState = "game_over";
        this.playSound("gameOver");
      } else {
        this.gameplayState = "wrong_guess";
        this.playSound("wrongGuess");
        this.$toasted.error(
          `You have ${this.livesRemaining} lifeline${
            this.livesRemaining == 1 ? "" : "s"
          } remaining.`
        );
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
    resetGame() {
      this.livesRemaining = 3;
      this.restartGame();
      this.requestRecollection();
    },
    requestRecollection() {
      const millisecondsToWaitBeforeRequestingRecollection =
        this.textSoFarArray.length <= 5
          ? 5000
          : 5000 +
            Math.ceil(parseFloat(this.textSoFarArray.length) / parseFloat(5)) *
              2000;
      console.log(millisecondsToWaitBeforeRequestingRecollection);
      setTimeout(() => {
        if (this.gameplayState == "inplay") this.gameplayState = "recollecting";
      }, millisecondsToWaitBeforeRequestingRecollection);
    },
  },
  mounted() {
    this.setWord();
    this.setCurrentCharacter();
    this.requestRecollection();
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
  background: #f7f7f7;
}

#game {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: var(--background-color);
  width: 390px;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 32px;
  border-radius: 20px;
  border: 2px solid rgb(199, 199, 199);
  user-select: none;
}

.screen {
  background-color: #181d23;
  border-radius: 6px;
  width: 100%;
  padding: 24px;
  height: 170px;
  color: var(--secondary-text-color);
  box-shadow: 0px -6px 0px 0px rgba(0, 0, 0, 0.54) inset;
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

@media screen and (min-width: 1024px) {
  #game {
  }
}
</style>
