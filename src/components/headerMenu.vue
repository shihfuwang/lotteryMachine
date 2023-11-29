<template>
  <div
    :class="{ 'faded': prizeStore.showPrizeList || playerStore.showHistoryRecord || lotteryMachineStore.showLotteryMessage || lotteryMachineStore.showMessage || lotteryMachineStore.gameStart}"
    class="
      w-full h-20
      bg-gradient-to-b from-[#190c04] via-[#231508] to-[#7d6946]
      shadow-[0_2px_4px_0_rgba(0,0,0,0.6)]
      flex justify-between items-center
    "
  >
    <div class="flex justify-start items-center">
      <span
        :class="{'custom-span': true }"
        class="
          w-[150px] text-[16px]
          text-center text-black
          p-1 ml-3 mr-3
          inline-block
        "
      >
        <i class="fa-solid fa-user"></i>
          {{ playerStore.playerData.playerName }}
      </span>
      <span
        :class="{'custom-span': true }"
        class="
          w-[150px] text-[16px]
          text-center text-black
          rounded-2xl
          p-1 ml-3
          inline-block
        "
      >
        <span v-html="usdt"></span>
        &nbsp;{{ playerStore.playerData?.ticketsQuantity }}
    </span>
    </div>
    <span
      :class="{'custom-span': true }"
      class="
        w-[120px]
        text-[16px] text-center
        text-black
        rounded-2xl
        p-1 ml-3 mr-3
        inline-block
        cursor-pointer
      "
      @click="playerStore.getPlayerHistoryRecord">
      <i class="fa-solid fa-book"></i>
        抽獎紀錄
    </span>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../store/player';
import { useLoginStore } from '../store/login';
import { useLotteryMachineStore } from '../store/lotteryMachine';
import { usePrizeStore } from '../store/prize';
import { onMounted } from 'vue';

const usdt = '<img src="/image/usdt_black.png" class="inline w-5 mb-[2px] " alt="usdt">';

const playerStore = usePlayerStore();
const loginStore = useLoginStore();
const lotteryMachineStore = useLotteryMachineStore();
const prizeStore = usePrizeStore();

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    loginStore.setLoginStatus(true);
    playerStore.fetchPlayerData();
  }
});

</script>
