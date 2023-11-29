<template>
  <div
    :style="{
      backgroundImage: 'url(/image/bg03.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
    class="
      fixed top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      w-[90%] h-[80vh]
      border border-white
      rounded-lg
      z-50
      bg-gray-200
      mt-10
      sm:w-[90%]
    "
  >
    <i
      class="
        fa-solid fa-x fa-xl
        absolute right-4 top-5
        cursor-pointer
      "
      style="color: #fff;"
      @click="prizeStore.showPrizeInfo"
    >
    </i>
    <h1
      class="
        text-center
        mt-5
        text-4xl
        text-white
      "
    >
      獎品一覽
    </h1>
    <div class="border-b-2 border-white w-[95%] my-5 mx-auto"></div>
    <div class="p-4 h-[60vh] overflow-y-auto">
      <div
        v-if="prizeStore.prizeList.length > 0"
        class="
          flex flex-wrap justify-center
          gap-8 font-black
        "
      >
        <div
          v-for="prize in prizeStore.prizeList"
          :key="prize.prizeId"
          class="
            border border-white
            rounded-lg p-5 text-white
            w-[22%] min-w-[22%]
          "
          :style="{ backgroundImage: 'url(/image/)', backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <img
            :src="getImageUrl(prize.img)"
            alt="獎品圖片"
            class="
              w-28 h-28
              object-contain
              mx-auto
            "
          >
          <div
            class="
              text-center
              mt-2
              font-black
            "
          >
            {{ prize.prizeName }}
          </div>
          <div
            class="
              border-b-2
              border-white
              w-[90%]
              my-2
              mx-auto
            ">
          </div>
          <div
            class="
              text-sm m-3
              text-white
              text-center
            "
          >
            數量: {{ prize.quantity }}
          </div>
          <div
            class="
              text-sm m-3
              text-white
              text-center
            "
          >
            中獎機率: {{ prize.prizeProbability }}%
          </div>
        </div>
      </div>
      <div
        v-else
        class="
          text-center
          text-white
          font-bold
        "
      >
        目前還沒有獎品~
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrizeStore } from '../store/prize';
const prizeStore = usePrizeStore();
const getImageUrl = (path) => {
  return `http://192.168.86.219:3000/${path}`;
};
</script>

<style scoped></style>
