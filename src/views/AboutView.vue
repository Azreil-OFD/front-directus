<template>
  <!-- Основной контейнер с классом "about" для отображения информации. -->
  <div class="about">
    <!-- Заголовок с названием организации, если оно есть, иначе показываем сообщение о загрузке данных. -->
    <h1 style="text-align: center;">
      {{ OrgName ? OrgName : "Выгружаю барахло с сервера" }}
    </h1>
    <!-- Используем директиву v-html для вставки HTML содержимого из OrgBody. -->
    <div v-html="OrgBody"></div>
  </div>
</template>

<script setup lang="ts">
  // Импортируем хранилище Directus для работы с API.
  import { useDirectusStore } from "@/stores/directus";
  
  // Импортируем необходимые функции из Vue: onMounted (для выполнения кода при монтировании компонента)
  // и ref (для создания реактивных переменных).
  import { onMounted, ref } from "vue";

  // Создаём реактивные переменные для хранения данных о названии организации и её содержимом.
  const OrgName = ref("");
  const OrgBody = ref("");

  // Используем хук onMounted для выполнения кода при монтировании компонента.
  onMounted(async () => {
    // Получаем доступ к хранилищу Directus через useDirectusStore().
    const api = useDirectusStore();

    // Получаем данные о организации с помощью метода getAbout() из хранилища.
    const _result = await api.getAbout();
    
    // Присваиваем данные из _result в реактивные переменные.
    OrgName.value = _result.OrgName;
    OrgBody.value = _result.OrgBody;
  });
</script>

<style>
  /* Медиа-запрос для экранов с шириной 1024px и выше. */
  @media (min-width: 1024px) {
    .about {
      /* Устанавливаем минимальную высоту для блока .about, чтобы он занимал всю высоту экрана. */
      min-height: 100vh;
      /* Настроим Flexbox для вертикального выравнивания контента по центру. */
      display: flex;
      align-items: center;
    }
  }
</style>
