<script setup lang="ts">
  // Импортируем хранилище Directus для взаимодействия с API.
  import { useDirectusStore } from '@/stores/directus';

  // Импорт компонента WelcomeItem, который будет отображать отдельные элементы.
  import WelcomeItem from './WelcomeItem.vue';

  // Импортируем необходимые функции из Vue: onMounted (для выполнения кода при монтировании компонента),
  // ref (для создания реактивных переменных) и тип Ref для объявления типов.
  import { onMounted, ref, type Ref } from 'vue';

  // Создаём реактивную переменную result, которая будет хранить данные, полученные с API.
  const result: Ref<any> = ref([]);

  // onMounted - хук, который выполняется при монтировании компонента.
  onMounted(async () => {
    // Получаем доступ к хранилищу Directus через useDirectusStore().
    const api = useDirectusStore();
    
    // Получаем данные с API через метод getHome и для каждого элемента данных выполняем операцию.
    (await api.getHome()).forEach((e: any) => {
      // Добавляем каждый элемент в реактивную переменную result.
      result.value.push(e);
    });
  });
</script>

<template>
  <!-- Основной блок компонента, оборачивающий контент с классом "welcome". -->
  <div class="welcome">
    
    <!-- Если данные ещё не загружены (пустой массив), показываем индикатор загрузки. -->
    <div v-if="result.length === 0">
      <!-- Заголовок, который сообщает пользователю о подключении. -->
      <h1>Подключаюсь...</h1>
      <!-- Изображение с индикатором загрузки. -->
      <img src="../assets/load.webp" alt="Loading...">
    </div>

    <!-- Используем компонент WelcomeItem для каждого элемента из массива result. -->
    <WelcomeItem v-for="item in result" :key="item.id">
      <!-- Шаблон для отображения иконки элемента. -->
      <template #icon>
        <span class="material-symbols-outlined">{{ item.icon }}</span>
      </template>

      <!-- Шаблон для отображения заголовка элемента. -->
      <template #heading>
        <h1>{{ item.title }}</h1>
      </template>

      <!-- Отображаем текст элемента. -->
      {{ item.text }}
    </WelcomeItem>
  </div>
</template>

<style>
  /* Медиа-запрос для экранов с шириной 1024px и выше. */
  @media (min-width: 1024px) {
    .welcome {
      /* Устанавливаем отступы и минимальную высоту для блока welcome. */
      padding: 3vh;
      min-height: 100vh;
      /* Настроим Flexbox для вертикального расположения элементов. */
      display: flex;
      flex-direction: column;
    }
  }
</style>
