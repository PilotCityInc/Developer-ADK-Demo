import { shallowMount } from '@vue/test-utils';
import Demo from '@/Module/Module.vue';

describe('Module.vue', () => {
  it("Let's organizers give instructions for students to submit demo videos with adjustable maximum length", () => {
    const wrapper = shallowMount(Demo, {});
    expect(wrapper.text()).toMatch('Demonstration');
  });
});
