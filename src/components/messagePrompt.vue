<template>
  <form
    :style="{
      backgroundImage: 'url(/image/msgBg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
    class="
      fixed top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      bg-white
      border border-white
      w-[90%] h-[280px]
      flex flex-col items-center justify-center
      md:w-[600px] md:h-[300px]
      rounded-lg
      text-white
    "
 >
  <i
    v-if="lotteryMachine.showMessageX"
    class="
      fa-solid fa-x fa-xl
      absolute right-4 top-8
      cursor-pointer
    "
    style="color: #ffffff;"
    @click="lotteryMachine.MessageXBtn"
  >
  </i>
  <h1
    class="
      text-center
      text-[32px]
      font-bold
      text-white
    "
   >
    {{title}}
   </h1>
   <span
    class="
      mt-6 mb-10
      text-[24px]
    "
    v-html="message"
  >
  </span>
  <button
    type="submit"
    class="
      w-20
      border border-white
      p-2
      bg-black
      text-white
      rounded-lg
    "
    @click.prevent="onConfirm"
  >
    {{ buttonText }}
   </button>
 </form>
</template>

<script setup lang="ts">
import { useLotteryMachineStore } from '../store/lotteryMachine';

const lotteryMachine = useLotteryMachineStore();

const props = defineProps({
 title: String,
 message: String,
 buttonText: String,
 onConfirm: Function
});
</script>
