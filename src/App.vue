<template>
  <div>
    <input v-model="email" type="text" placeholder="email" />
    <input v-model="password" type="password" placeholder="password" />
    <button type="submit" @click="logIn()">log in</button>
    |
    <button type="submit" @click="logOut()">log out</button>
    <v-app>
      <Module
        :team-doc="teamDoc"
        :current-user="currentUser"
        :user-type="userTypeStub"
        @inputTeamDoc="teamDoc = $event"
      />
    </v-app>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from '@vue/composition-api';
import * as Realm from 'realm-web';
import Module from './Module/Module.vue';
import { MongoDoc } from './Module/types';

export default defineComponent({
  name: 'App',

  components: {
    Module
  },

  setup() {
    const teamDoc: Ref<MongoDoc | null> = ref({
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
    const userTypeStub = 'participant';
    if (userTypeStub === 'organizer') teamDoc.value = null;
    const app = new Realm.App({ id: 'programdev-aogmg' });
    const email = ref('');
    const password = ref('');

    async function logIn() {
      const creds = Realm.Credentials.emailPassword(email.value, password.value);
      await app.logIn(creds);
      window.location.reload();
    }
    async function logOut() {
      await app.currentUser?.logOut();
      window.location.reload();
    }

    const currentUser = computed(() => app.currentUser);
    return {
      teamDoc,
      userTypeStub,
      currentUser,
      email,
      password,
      logIn,
      logOut
    };
  }
});
</script>
