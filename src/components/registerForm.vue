<template>
  <div
    v-if="loginStore.showRegisterForm"
    class="
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-white
      p-5
      flex flex-col
      items-start
      justify-start
      w-[470px] h-auto
      rounded-lg
      shadow-2xl
    "
  >
    <div class="w-full text-center">
      <h1
        class="
          text-[48px]
          mb-2
          font-bold text-black
        "
      >
        遊戲註冊
      </h1>
    </div>
    <div
      class="
        border-b-2 border-black
        w-full
        my-2
      ">
    </div>
    <form
      @submit.prevent="loginStore.registerPost"
      class="
        flex flex-col
        items-center
        w-full
        mt-4
      "
    >
      <div class="w-[90%] flex flex-col items-start">
        <div class="relative w-full ">
          <label class="flex items-center">
            <span class="pl-4 pr-2">電話 :</span>
            <div
              :class="{ 'border-red-500': loginStore.showPhoneWrongMsg, 'border-black': !loginStore.showWrongMsg }"
              class="border border-black rounded w-[80%] flex items-center">
              <input
                class="flex-1 pl-4 py-2 rounded-l focus:outline-none"
                type="text"
                placeholder="請輸入10碼手機號碼"
                v-model="loginStore.phoneNum"
                @input="loginStore.updatePhoneNum"
              />
              <span class="pr-4 text-gray-400">
                {{ loginStore.phoneNumLength }}/10
              </span>
            </div>
          </label>
        </div>
        <span
          v-if="loginStore.showPhoneWrongMsg"
          class="
            text-xs
            text-red-500
            my-1
            ml-16
          "
        >
          {{ loginStore.phoneWrongMsg }}
        </span>
        <span
          v-else
          class="
            text-xs
            text-red-500
            my-1
          "
        >
          &nbsp;
        </span>
        <div class="relative w-full">
          <label class="flex items-center">
            <span class="pl-4 pr-2">暱稱 :</span>
            <div
              :class="{ 'border-red-500': loginStore.showWrongMsg, 'border-black': !loginStore.showWrongMsg }"
              class="border border-black rounded w-[80%] flex items-center"
            >
              <input
                class="
                  flex-1 pl-4 py-2
                  rounded-l
                  focus:outline-none
                "
                placeholder="請輸入暱稱"
                v-model="loginStore.playerName"
                @input="loginStore.updatePlayerName"
              />
              <span class="pr-4 text-gray-400">
                {{ loginStore.playerNameLength }}/6
              </span>
            </div>
          </label>
        </div>
      </div>
      <span
        v-if="loginStore.showWrongMsg"
        class="
          text-xs
          text-red-500
          my-1
          mr-44
          "
        >
          {{ loginStore.wrongMessage }}
      </span>
      <span
        v-else
        class="
          text-xs
          text-red-500
          block
          my-1
        "
      >
        &nbsp;
      </span>
      <div class="self-end mr-10">
        <button
          type="submit"
            class="
              w-24 h-8
              bg-gray-400
              text-white
              rounded
            "
          >
            註冊
        </button>
        <button
          type="button"
          class="
            w-24 h-8
            bg-white
            text-black border border-black
            rounded
            ml-2
          "
          @click="loginStore.closeRegisterForm"
        >
          返回
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '../store/login';

const loginStore = useLoginStore();

</script>
