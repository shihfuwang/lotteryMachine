<template>
  <div
    class="
      fixed top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      ">
    <div
      class="
        box w-[350px] h-[200px]
        flex flex-col mx-auto
        rounded-lg shadow-2xl
        p-5
      "
    >
    <h1
      class="
        text-center text-2xl
        mb-3
        font-bold
        text-black-900
      "
    >
      遊戲登入
    </h1>
      <div
        class="
          border-b-2 border-black
          w-full
          my-1
        "
      >
      </div>
      <form
        @submit.prevent="handleLogin"
        class="
          flex flex-col
          justify-between
          w-full
        "
      >
        <p
          class="
            text-black text-[24px]
            mx-auto mt-3 text-center
          "
        >
          電話 :
          <input
            :class="['px-4 py-2 rounded w-[56%] mx-auto h-8', loginStore.showWrongMsg ? 'border border-red-500 mb-0' : 'border border-black mb-4']"
            type="text"
            v-model="loginStore.phoneNum"
            @input="loginStore.updatePhoneNum"
          >
        </p>
        <span
          v-if="loginStore.showWrongMsg"
          class="
            text-xs text-red-500 ml-9 mb-1
          ">
            {{ loginStore.wrongMessage }}
        </span>
        <span
          v-else
          class="
            text-xs text-red-500 ml-9 mb-1
          "
          >
        </span>
        <div class="flex justify-between">
          <button
            type="submit"
            class="
              w-[30%] h-8
              px-4 mx-auto
              bg-black text-white
              rounded
            "
          >
            登入
          </button>
          <button
            type="button"
            class="
              w-[30%] h-8
              px-4 mx-auto
              bg-gray-400 text-white
              rounded
            "
            @click="loginStore.showRegisterBtn"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  </div>
  <div>
    <registerForm />
  </div>
  <div
    v-if="loginStore.registerSuccess"
  >
    <loginMsg
      title="註冊成功"
      message="點擊確認回到燈入頁面進行登入"
      button-text="確認"
      :on-confirm="loginStore.messageBtn"
    />
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '../store/login';
import { useRouter } from 'vue-router';
import registerForm from '../components/registerForm.vue';
import loginMsg from '../components/loginMsg.vue'
const loginStore = useLoginStore();
const router = useRouter();

const handleLogin = async () => {
  const loginStatus = await loginStore.handleLogin();
  if (loginStatus) {
    router.push('/gameLobby');
  } else {
    router.push('/');
  }
};
</script>



<style scoped>
</style>
