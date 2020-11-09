<template>
  <v-container class="module-edit">
    <div class="module-edit__container"></div>
  </v-container>
</template>

<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',

  setup() {
    const setup = reactive({
      outcomes: ['Build portfolio project', 'Qualify for internship to execute on project'],
      outcomesValue: ['Build portfolio project', 'Qualify for internship to execute on project'],
      deliverables: [
        'Business Model Canvas',
        'One Sentence Pitch',
        'Elevator Pitch',
        'Design & Prototype Log',
        'Prototype Demo',
        'Presentation Deck'
      ],
      deliverablesValue: [
        'Business Model Canvas',
        'One Sentence Pitch',
        'Elevator Pitch',
        'Design & Prototype Log',
        'Prototype Demo',
        'Presentation Deck'
      ],
      chips: ['Must use employer product'],
      items: ['Must use employer product', 'Must use employer service', 'Must use employer process']
    });
    return {
      ...toRefs(setup)
    };
  }
};
</script>

<style lang="scss">
.module-setup {
  &__buildscope {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
