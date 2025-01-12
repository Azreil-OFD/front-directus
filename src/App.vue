<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDirectusStore, type IAbout } from './stores/directus';
import { computed, onMounted, ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

const Directus = useDirectusStore();
const logo = ref("");
const aboutData: Ref<IAbout> = storeToRefs(useDirectusStore()).aboutData

const logoUrl = computed(() => aboutData.value.appLogo.length !== 0 ? 'https://directus.danya.evil-chan.ru/assets/' + aboutData.value.appLogo + '.jpg' : "")
onMounted(async () => {
  console.log(aboutData.value);
});
</script>

<template>
  <header>
    <div class="logo-container">
      <img alt="Company Logo" class="logo" v-if="logoUrl.length !== 0" :src="logoUrl" width="125" height="125" />
    </div>
    <nav class="navigation">
      <RouterLink to="/" class="nav-link">Главная</RouterLink>
      <RouterLink to="/about" class="nav-link">О Компании</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 640px;
  padding: 2rem;
  background-color: #0000009a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.navigation {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary, #ffffff);
  background-color: rgb(41, 41, 41);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background-color: var(--color-primary, #727272);
  color: #fff;
}

@media (min-width: 1024px) {
  header {
    padding: 2rem 4rem;
  }

  .navigation {
    font-size: 1.2rem;
  }
}
</style>
