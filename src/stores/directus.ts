import { ref, computed, onMounted, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { authentication, createDirectus, readItems, rest, type DirectusClient } from '@directus/sdk';

export interface IAbout {
  OrgName: string
  OrgBody: string
  appLogo: string
}

export const useDirectusStore = defineStore('directus', () => {
  const client: Ref<DirectusClient<any> | null> = ref(null);
  const aboutData: Ref<IAbout> = ref({
    OrgBody: "",
    OrgName: "",
    appLogo: ""
  })

  const homePage: Ref<any[]> = ref([])

  const load = async () => {
    client.value = createDirectus('https://directus.danya.evil-chan.ru')
      .with(authentication())
      .with(rest());

    if (client.value === null) {
      throw new Error("Не верный логин или пароль")
    }
    // @ts-ignore: Unreachable code error
    await client.value.login("admin.danya@evil-chan.ru", "?={pxt9?#1#!R\\");

    // @ts-ignore: Unreachable code error
    aboutData.value = await client.value.request(
      // @ts-ignore: Unreachable code error
      readItems("about", {
        fields: ['OrgName', 'OrgBody', "appLogo"],
      })
    );
    // @ts-ignore: Unreachable code error
    homePage.value = await client.value.request(
      // @ts-ignore: Unreachable code error
      readItems("pins", {
        fields: ["*"]
      })
    );


  }
  const getAbout = async (): Promise<IAbout> => {
    await load();
    return aboutData.value
  }
  const getLogo = async (): Promise<string> => {
    await load();
    return aboutData.value.appLogo
  }
  const getHome = async (): Promise<any[]> => {
    await load();
    return homePage.value
  }

  return { client, getAbout, getLogo, getHome, aboutData,  }
})
