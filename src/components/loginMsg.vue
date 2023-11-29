<template>
  <form
   class="
     fixed top-1/2 left-1/2
     transform -translate-x-1/2 -translate-y-[130px]
     bg-white
     border border-black
     w-[90%] h-[280px]
     flex flex-col items-center justify-center
     md:w-[600px] md:h-[300px]
     rounded-lg
     text-black
   "
 >
   <h1
     class="
       text-center
       text-[32px]
       font-bold
       text-black
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
const props = defineProps({
 title: String,
 message: String,
 buttonText: String,
 onConfirm: Function
});
</script>
