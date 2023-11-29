
<template>
  <div
    :style="{ backgroundImage: 'url(/image/bg02.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }"
    class="w-full min-h-screen bg-gray-200 flex flex-col items-center min-w-[610px] ">
      <Menu />
    <div
      class="
        flex-1 flex items-center
      "
    >
    </div>
    <div
      v-if="playerStore.showHistoryRecord"
    >
      <historyRecord />
    </div>
    <div
      class="flex-1 flex items-center"
    >
      <lotteryMachine />
    </div>
    <div
      v-if="prizeStore.showPrizeList"
    >
      <prizeInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../store/player';
import { usePrizeStore } from '../store/prize';

import Menu from '../components/headerMenu.vue';
import historyRecord from '../components/historyRecord.vue';
import lotteryMachine from '../components/lotteryMachine.vue';
import prizeInfo from '../components/prizeInfo.vue';

const playerStore = usePlayerStore();
const prizeStore = usePrizeStore();

</script>

<style scoped>
.faded {
  opacity: 0.5;
  pointer-events: none;
}
</style>