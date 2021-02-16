import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Demo from '@/Module/Module.vue';

const vuetify = new Vuetify();
describe('Module.vue', () => {
  it("Let's organizers give instructions for students to submit demo videos with adjustable maximum length", () => {
    const wrapper = shallowMount(Demo, {
      vuetify
    });
    expect(wrapper.html()).toContain('module__header');
  });
});
