// Импортируем необходимые функции из Vue: ref для создания реактивных переменных,
// computed для вычисляемых свойств, onMounted для выполнения кода при монтировании компонента,
// и Ref для типизации реактивных переменных.
import { ref, computed, onMounted, type Ref } from 'vue';

// Импортируем defineStore из Pinia для создания хранилища состояния.
import { defineStore } from 'pinia';

// Импортируем необходимые функции и типы из Directus SDK: authentication (для аутентификации),
// createDirectus (для создания клиента Directus), readItems (для чтения данных) и rest (для использования REST API),
// а также тип DirectusClient для типизации клиента.
import { authentication, createDirectus, readItems, rest, type DirectusClient } from '@directus/sdk';

// Определяем интерфейс IAbout для типизации данных о компании.
export interface IAbout {
  OrgName: string;
  OrgBody: string;
  appLogo: string;
}

// Создаём Pinia хранилище с именем "directus".
export const useDirectusStore = defineStore('directus', () => {
  // Создаём реактивную переменную для хранения клиента Directus (может быть null).
  const client: Ref<DirectusClient<any> | null> = ref(null);
  
  // Создаём реактивную переменную для хранения данных о компании (объект с полями OrgName, OrgBody и appLogo).
  const aboutData: Ref<IAbout> = ref({
    OrgBody: "",
    OrgName: "",
    appLogo: ""
  });

  // Создаём реактивную переменную для хранения данных главной страницы (массив).
  const homePage: Ref<any[]> = ref([]);

  // Функция для загрузки данных из Directus.
  const load = async () => {
    // Создаём клиент Directus с указанием URL и добавляем аутентификацию и использование REST API.
    client.value = createDirectus('https://directus.danya.evil-chan.ru')
      .with(authentication()) // Аутентификация
      .with(rest()); // REST API

    // Если клиент не был создан, выбрасываем ошибку.
    if (client.value === null) {
      throw new Error("Не верный логин или пароль");
    }

    // Выполняем вход в систему с помощью предоставленных учетных данных.
    // @ts-ignore: Unreachable code error
    await client.value.login("admin.danya@evil-chan.ru", "?={pxt9?#1#!R\\");

    // Загружаем данные о компании и сохраняем их в переменную aboutData.
    // @ts-ignore: Unreachable code error
    aboutData.value = await client.value.request(
      // @ts-ignore: Unreachable code error
      readItems("about", {
        fields: ['OrgName', 'OrgBody', "appLogo"],
      })
    );

    // Загружаем данные для главной страницы и сохраняем их в переменную homePage.
    // @ts-ignore: Unreachable code error
    homePage.value = await client.value.request(
      // @ts-ignore: Unreachable code error
      readItems("pins", {
        fields: ["*"]
      })
    );
  };

  // Функция для получения данных о компании.
  const getAbout = async (): Promise<IAbout> => {
    await load(); // Загружаем данные, если они ещё не загружены.
    return aboutData.value; // Возвращаем данные о компании.
  };

  // Функция для получения логотипа компании.
  const getLogo = async (): Promise<string> => {
    await load(); // Загружаем данные, если они ещё не загружены.
    return aboutData.value.appLogo; // Возвращаем URL логотипа.
  };

  // Функция для получения данных главной страницы.
  const getHome = async (): Promise<any[]> => {
    await load(); // Загружаем данные, если они ещё не загружены.
    return homePage.value; // Возвращаем данные главной страницы.
  };

  // Возвращаем все необходимые функции и данные из хранилища.
  return { client, getAbout, getLogo, getHome, aboutData };
});
