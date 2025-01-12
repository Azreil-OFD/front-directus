<script setup lang="ts">
  // Импортируем необходимые модули из vue-router для навигации.
  import { RouterLink, RouterView } from 'vue-router';

  // Импортируем хранилище Directus и тип IAbout для типизации данных.
  import { useDirectusStore, type IAbout } from './stores/directus';

  // Импортируем необходимые функции из Vue: computed для вычисляемых свойств,
  // onMounted для выполнения кода при монтировании компонента, ref для реактивных переменных
  // и тип Ref для типизации реактивных переменных.
  import { computed, onMounted, ref, type Ref } from 'vue';

  // Импортируем storeToRefs из Pinia для работы с реактивными ссылками на состояние хранилища.
  import { storeToRefs } from 'pinia';

  // Получаем доступ к хранилищу Directus.
  const Directus = useDirectusStore();

  // Создаём реактивную переменную для хранения URL логотипа.
  const logo = ref("");

  // Создаём реактивную переменную для хранения данных о компании с типом IAbout.
  const aboutData: Ref<IAbout> = storeToRefs(useDirectusStore()).aboutData;

  // Вычисляем URL логотипа на основе данных из хранилища.
  const logoUrl = computed(() => aboutData.value.appLogo.length !== 0 
    ? 'https://directus.danya.evil-chan.ru/assets/' + aboutData.value.appLogo + '.jpg' 
    : "");

  // Хук onMounted выполняется при монтировании компонента.
  onMounted(async () => {
    // Логируем данные о компании для проверки.
    console.log(aboutData.value);
  });
</script>

<template>
  <!-- Заголовок компонента с логотипом и навигационным меню. -->
  <header>
    <div class="logo-container">
      <!-- Отображаем логотип, если URL логотипа не пустой. -->
      <img alt="Company Logo" class="logo" v-if="logoUrl.length !== 0" :src="logoUrl" width="125" height="125" />
    </div>
    <nav class="navigation">
      <!-- Навигационные ссылки, использующие компонент RouterLink для переходов по страницам. -->
      <RouterLink to="/" class="nav-link">Главная</RouterLink>
      <RouterLink to="/about" class="nav-link">О Компании</RouterLink>
    </nav>
  </header>

  <!-- Место для отображения контента страницы, который будет меняться в зависимости от маршрута. -->
  <RouterView />
</template>

<style scoped>
  /* Стили для контейнера header, который содержит логотип и навигацию. */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 640px;
    padding: 2rem;
    background-color: #0000009a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Стили для контейнера логотипа, центрируем изображение. */
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Стили для логотипа: круглое изображение с анимацией при наведении. */
  .logo {
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  /* Эффект увеличения логотипа при наведении. */
  .logo:hover {
    transform: scale(1.1);
  }

  /* Стили для контейнера навигации. */
  .navigation {
    display: flex;
    gap: 2rem;
  }

  /* Стили для ссылок навигации: добавление фона, отступов и закруглений. */
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

  /* Эффект изменения фона и текста при наведении на ссылку или при активном маршруте. */
  .nav-link:hover,
  .nav-link.router-link-exact-active {
    background-color: var(--color-primary, #727272);
    color: #fff;
  }

  /* Медиа-запрос для экранов с шириной 1024px и выше. */
  @media (min-width: 1024px) {
    /* Увеличиваем отступы и размер шрифта для больших экранов. */
    header {
      padding: 2rem 4rem;
    }

    .navigation {
      font-size: 1.2rem;
    }
  }
</style>
