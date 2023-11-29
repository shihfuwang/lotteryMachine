<template>
  <div
    class="
      relative flex flex-col items-center
      max-w-full max-h-screen
      min-h-[300px] min-w-[560px]
      w-[90vw] h-[600px]
      rounded-lg
      p-5
      sm:w-[500px]
      mb-20
    "
  >
    <div
      class="
        box max-w-full max-h-full
        w-[90%] h-[350px]
        my-4
        sm:w-[90%]
        flex items-center justify-center
      "
    >
      <LuckyWheel
        ref="myLucky"
        width="400px"
        height="400px"
        :prizes="lotteryMachineStore.prizes"
        :blocks="lotteryMachineStore.blocks"
        :buttons="lotteryMachineStore.buttons"
        :default-config="lotteryMachineStore.defaultConfig"
        @start="startCallback"
        @end="endCallback"
      />
      <div
        v-if="lotteryMachineStore.showMessage"
      >
          <messagePrompt
            title="通知"
            :message="`是否要消耗 ${usdt}x 1 進行抽獎嗎?`"
            button-text="是"
            :on-confirm="gameStart"
          />
      </div>
      <div
        v-if="lotteryMachineStore.showLotteryMessage"
      >
        <lotteryMessage
          :title="lotteryMachineStore.lotteryMessageTitle"
          :message="lotteryMachineStore.lotteryMessage"
          :quantity="lotteryMachineStore.getPrize.name !== '' ? 'x' + lotteryMachineStore.getPrize.quantity : ''"
          :img="lotteryMachineStore.getPrize.img"
          :on-confirm="lotteryMachineStore.gameOver"
        />
      </div>
      <div
        v-if="lotteryMachineStore.showWrongMessage"
      >
        <messagePrompt
          title="抽獎失敗"
          :message="lotteryMachineStore.wrongMessage"
          button-text="是"
          :on-confirm="lotteryMachineStore.closeWrongMessage"
        />
      </div>
    </div>
    <div
      :class="{ 'faded': prizeStore.showPrizeList || playerStore.showHistoryRecord || lotteryMachineStore.showLotteryMessage || lotteryMachineStore.showMessage || lotteryMachineStore.gameStart }"
      class="
        w-full flex flex-col
        items-center justify-center
        my-5
      "
    >
      <button
        :class="{ btnStyle: true }"
        class="
          w-[60%] h-[50px]
          border border-gold
          rounded-3xl
          bg-white
          text-white
          "
        @click="prizeStore.getPrizeListInfo"
      >
        獎品一覽
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePrizeStore } from '../store/prize';
import { useLotteryMachineStore } from '../store/lotteryMachine';
import { usePlayerStore } from '../store/player';
import messagePrompt from '../components/messagePrompt.vue';
import lotteryMessage from '../components/lotteryMessage.vue'

const usdt = '<img src="/image/usdt_white.png" class="inline mr-1 w-8 mb-1" alt="usdt">';
const prizeStore = usePrizeStore();
const playerStore = usePlayerStore();
const lotteryMachineStore = useLotteryMachineStore();
const myLucky = ref(null);

const startCallback = () => {
  lotteryMachineStore.startBtn();
};

async function gameStart() {
  playerStore.fetchPlayerData();

  if (playerStore.playerData.ticketsQuantity == 0) {
    lotteryMachineStore.showWrongMessage = true;
    lotteryMachineStore.showMessageX = false;
    lotteryMachineStore.wrongMessage = "你沒有抽獎卷摟QQ";
    return
  }

  const success = await lotteryMachineStore.startGetPrize();
  playerStore.fetchPlayerData();
  let prizeIndex: number;
  if (lotteryMachineStore.getPrize.name == "") {
    prizeIndex = 1;
  } else {
    prizeIndex = 0;
  }

  if (success && lotteryMachineStore.getPrize.name == "") {
    lotteryMachineStore.isNoPrize = true;
    lotteryMachineStore.gameStart = true;
    myLucky.value.play();
    setTimeout(() => {
      myLucky.value.stop(prizeIndex)
    }, 1000);
  } else if (success && lotteryMachineStore.getPrize.name !== null) {
    playerStore.fetchPlayerData();
    lotteryMachineStore.isNoPrize = false;
    lotteryMachineStore.gameStart = true;
    myLucky.value.play();
    setTimeout(() => {
      myLucky.value.stop(prizeIndex)
    }, 1000);
  }
}

const endCallback = () => {
  lotteryMachineStore.showLotteryMessage = true;
  if (!lotteryMachineStore.isNoPrize) {
    const quantityDisplay = `x${lotteryMachineStore.getPrize.quantity}`;
    lotteryMachineStore.lotteryMessageContent = {
      title: lotteryMachineStore.lotteryMessageTitle,
      quantity: quantityDisplay,
      message: lotteryMachineStore.lotteryMessage,
      img: lotteryMachineStore.getPrize.img
    };
  }
}

</script>

<style scoped>
.btnStyle {
  background: linear-gradient(270deg,
      #ffdb70 3.12%,
      #000000 42.71%,
      #000000 58.85%,
      #ffdb70 95.83%),
    linear-gradient(0deg, #000000, #000000);
  border: 3px solid #ffdb70;
  border-radius: 52px;
  box-shadow: 3px 3px 2px #333 inset;
}
</style>
