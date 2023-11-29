<template>
  <form
    :style="{
      backgroundImage: 'url(/image/lotteryMsgBg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
    class="
      fixed top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-[205px]
      bg-white
      border border-white
      w-[90%] h-[350px]
      flex flex-col items-center justify-center
      mt-[2px]
      md:w-[600px] md:h-[350px]
      rounded-lg
    "
  >
    <h1
      class="
        text-center
        text-[32px]
        font-bold
        text-white
        mb-3
      "
    >
      {{ title }}
    </h1>
    <div
      v-if="img"
      class="w-[120px] h-[120px]"
    >
      <img :src="getImageUrl(img)" alt="Prize Image" />
    </div>
    <div
      v-else
      class="w-[150px] h-[150px]"
    >
      <img src="http://192.168.86.219:3000/image/cry.png" alt="No Prize" />
    </div>
    <span
      class="
        text-[24px]
        font-bold
        text-white
      "
      v-html="message"
    >
    </span>
    <span
      class="text-white"
    >
      {{ quantity }}
    </span>
    <button
      type="submit"
      class="
         w-20
         border border-white
         p-2 mt-3
         bg-black
         text-white
         rounded-lg
         z-10000
       "
      @click.prevent="onConfirm"
    >
      確認
    </button>
  </form>
  <div v-if="lotteryMachineStore.playFireWork" id="containerLeft">
    <div class="fireworks"><img src="/image/fireworks.png"></div>
  </div>
  <div v-if="lotteryMachineStore.playFireWork" id="containerRight">
    <div class="fireworks"><img src="/image/fireworks.png"></div>
  </div>
</template>

<script setup lang="ts">
import { useLotteryMachineStore } from '../store/lotteryMachine';

const lotteryMachineStore = useLotteryMachineStore();

const props = defineProps({
  title: String,
  message: String,
  quantity: String,
  img: String,
  onConfirm: Function
});

const getImageUrl = (path:string) => {
  return `http://192.168.86.219:3000${path.startsWith('/') ? '' : '/'}${path}`;
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#containerLeft {
  width: 100%;
  position: absolute;
  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%);
}

#containerRight {
  width: 100%;
  position: absolute;
  top: 20%;
  left: 90%;
  transform: translate(-50%, -50%);
}

.fireworks {
  transform: scale(0);
  animation: fireworks 4s 0s infinite;
}

@keyframes fireworks {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(0.5);
  }

  100% {
    opacity: 0;
  }
}
</style>
