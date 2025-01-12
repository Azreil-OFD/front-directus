<script setup lang="ts">
import { useDirectusStore } from '@/stores/directus';
import WelcomeItem from './WelcomeItem.vue'
import { onMounted, ref, type Ref } from 'vue';
const result: Ref<any> = ref([])
onMounted(async () => {
  const api = useDirectusStore();
  (await api.getHome()).forEach((e: any) => {
    result.value.push(e)
  })
})
</script>

<template>
  <div class="welcome">
    <div  v-if="result.length === 0"  >
      <h1>Подключаюсь...</h1>
      <img src="../assets/load.webp"alt="">
    </div>


    <WelcomeItem v-for="item in result">
      <template #icon>
        <span class="material-symbols-outlined">{{ item.icon }}</span>
      </template>
      <template #heading>
        <h1>{{ item.title }}</h1>
      </template>
      {{ item.text }}
    </WelcomeItem>
  </div>
</template>
<style>
@media (min-width: 1024px) {
  .welcome {
    padding: 3vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
 
  }
}
</style>