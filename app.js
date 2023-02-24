function getAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundsCounter: 0,
      winner: null,
      battleLog: [],
    };
  },
  computed: {
    playerHealthBar() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    monsterHealthBar() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    activateSpecialAttack() {
      return this.roundsCounter % 3 !== 0;
    },
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
  },

  methods: {
    playAgain() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.winner = null),
        (this.battleLog = []);
    },
    attackMonster() {
      this.roundsCounter++;
      const attackValue = getAttackValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessages("Player", "Attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getAttackValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessages("Monster", "Attack", attackValue);
    },
    specialAttack() {
      this.roundsCounter++;
      const attackValue = getAttackValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessages("Player", "SpecialAttack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.roundsCounter++;
      const healValue = getAttackValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessages("Player", "Heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessages(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
