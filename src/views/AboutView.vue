<template>
  <div class="about">
    <h1 style="text-align: center;" >{{ OrgName ? OrgName : "Выгружаю барахло с сервера"  }}</h1>
    <div v-html="OrgBody" ></div>
  </div>
</template>

<script setup lang="ts">
import { useDirectusStore } from "@/stores/directus"
import { onMounted, ref } from "vue";

const OrgName = ref("")
const OrgBody = ref("")

onMounted(async () => {
  const api = useDirectusStore()
  const _result = await api.getAbout()
  OrgName.value = _result.OrgName
  OrgBody.value = _result.OrgBody

})


</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
