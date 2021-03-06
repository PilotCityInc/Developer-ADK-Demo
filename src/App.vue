<template>
  <v-app>
    <Module v-model="programDocStub" :current-user="currentUser" />
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from '@vue/composition-api';
import * as Realm from 'realm-web';
import Module from './Module/Module.vue';
import MongoDoc from './Module/types';

export default defineComponent({
  name: 'App',

  components: {
    Module
  },

  setup() {
    const programDocStub: Ref<MongoDoc> = ref({
      data: {
        adks: [],
        programDesc: 'Mocked Description',
        programName: 'Mocked Name'
      },
      update: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });

    const app = new Realm.App({ id: 'programdev-aogmg' });
    const email = undefined;
    const password = undefined;
    if (!email || !password) {
      throw Error('ENTER ACCOUNT EMAIL AND PASSWORD TO TEST');
    }
    const creds = Realm.Credentials.emailPassword(email, password);
    app.logIn(creds);
    const currentUser = computed(() => app.currentUser);

    return {
      programDocStub,
      currentUser
    };
  }
});
</script>
