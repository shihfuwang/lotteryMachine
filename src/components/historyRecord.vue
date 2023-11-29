<template>
  <div
    class="
      fixed top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      w-[290px] h-[400px]
      border border-black
      rounded-lg
      z-50 mt-10
      bg-gray-200
      sm:w-[290px] sm:h-[400px]
      md:w-[400px] md:h-[550px]
      2xl:w-[500px] 2xl:h-[650px]
      overflow-y-auto p-2
    "
  >
    <i
      class="
        fa-solid fa-x fa-l
        absolute right-12 top-[51px]
        cursor-pointer
      "
      style="color: black;"
      @click="playerStore.showHistoryBtn"
    >
    </i>
    <h1
      class="
        text-center
        mt-12
        text-[28px]
        md:text-[40px]
        text-black
      "
    >
      抽獎紀錄
    </h1>
    <div class="p-2">
      <div
        class="
          overflow-y-auto
          w-[200px] h-[230px]
          mx-auto md:w-[300px]
          md:h-[340px]
          2xl:w-[400px]
          2xl:h-[435px]
        "
      >
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" class="py-2 px-6">
                獎品名稱
              </th>
              <th scope="col" class="py-2 px-6">
                數量
              </th>
              <th scope="col" class="py-2 px-6">
                抽獎時間
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in playerStore.lotteryHistory"
              :key="index" class="bg-white border-b"
            >
              <th
                scope="row"
                class="
                  py-4 px-6
                  font-medium
                  text-gray-900
                  whitespace-nowrap
                  h-10
                "
              >
                <span v-if="record.prizeName">
                  {{ record.prizeName }}
                </span>
                <span v-else>
                  未中獎
                </span>
              </th>
              <td class="py-4 px-6">
                {{ record.quantity }}
              </td>
              <td class="py-4 px-6">
                {{ record.lotteryTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../store/player';

const playerStore = usePlayerStore();
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f3f3f3;
}
</style>