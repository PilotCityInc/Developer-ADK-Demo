<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-outcomes">
      <div class="module-outcomes__container">
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="presets__section-title">General</div>
        <!-- <span class="presets__question-title">Maximum minutes for video (Default: 3 minutes)</span> -->
        <validation-provider v-slot="{ errors }" slim rules="numeric">
          <v-select
            v-model="programDoc.data.adks[index].videoMaxLength"
            outlined
            x-large
            rounded
            :items="maxMinutes"
            :error-messages="errors"
            label="Maximum minutes for delivered YouTube video"
          ></v-select>
        </validation-provider>
        <div class="module-default__scope mt-12">
          <v-btn
            x-large
            depressed
            rounded
            outlined
            :disabled="invalid"
            :loading="loading"
            @click="process()"
          >
            Save
          </v-btn>
        </div>
        <v-alert v-if="success || error" class="mt-3" :type="success ? 'success' : 'error'">{{
          message
        }}</v-alert>
        <!-- <div class="presets__nopresets">No tweaking necessary</div> -->
        <!-- <v-divider class="presets__divider"></v-divider>
        <div class="presets__section-title">Instructions</div>
        <Instruct v-model="setupInstructions" />
        <v-divider class="presets__divider"></v-divider>
        <div class="presets__section-title">Defaults</div>

        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="groupActivity"
            :error-messages="errors"
            :items="group"
            disabled
            label="What activity group does this belong to?"
            outlined
          ></v-select>
        </validation-provider>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="requiredActivity"
            :error-messages="errors"
            :items="required"
            disabled
            label="Is this activity required for participants to complete?"
            outlined
          ></v-select>
        </validation-provider> -->

        <!-- <v-select
          :items="lockOrder"
          label="Lock activity group and placement order?"
          outlined
        ></v-select> -->
        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="deliverableActivity"
            :error-messages="errors"
            :items="deliverable"
            disabled
            label="Is this a deliverable?"
            outlined
          ></v-select>
        </validation-provider> -->
        <!-- <v-select
          :items="accessibility"
          label="Make this activity accessible to participants anytime?"
          outlined
        ></v-select> -->
        <!-- <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="endEarlyActivity"
            :error-messages="errors"
            :items="endEarly"
            disabled
            label="Allow participants to end program early after completion of this activity?"
            outlined
          ></v-select>
        </validation-provider> -->
        <!-- POST-ACTIVITY REFLECTION -->
        <!-- <v-text-field
          label="Post-Activity Reflection"
          placeholder="Now that you know the scope of the project, provide a summary of your interpretation."
          outlined
          hide-details
        ></v-text-field>
        <div class="presets__reflection">
          <v-btn class="presets__reflection-buttons" small depressed outlined>Save</v-btn>
          <v-btn class="presets__reflection-buttons" small depressed outlined>Preview</v-btn>
        </div> -->
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <!-- If activity is required, show button below, make tooltip show up while disabled, right now tooltip doesn't show up -->
        <!-- <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" disabled v-bind="attrs" v-on="on">Delete Activity</v-btn>
            </template>
            <span>Required activities cannot be deleted</span>
          </v-tooltip>
        </div> -->
        <!-- Delete break when the two delete buttons above and below have been integrated as one solution -->
        <!-- <br /> -->
        <!-- If activity is optional, show button below -->
        <!-- <div><v-btn color="red" disabled depressed>Delete Activity</v-btn></div> -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { reactive, ref, toRefs, PropType, computed } from '@vue/composition-api';
import { loading } from 'pcv4lib/src';
// import Instruct from './ModuleInstruct.vue';
import { group, required, deliverable, endEarly, maxMinutes } from './const';
import { MongoDoc } from '../types';

export default {
  name: 'ModulePresets',
  components: {
    // Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },
  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const index = programDoc.value.data.adks.findIndex(obj => obj.name === 'demo');

    const presets = reactive({
      maxMinutes,
      group,
      required,
      deliverable,
      endEarly
    });
    const defaultActivity = reactive({
      minutes: 3,
      groupActivity: 'Project',
      requiredActivity: 'Yes',
      deliverableActivity: 'Yes',
      endEarlyActivity: 'Creator has not allowed participants to end early after this activity'
    });
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    return {
      ...toRefs(presets),
      setupInstructions,
      ...toRefs(defaultActivity),
      programDoc,
      index,
      ...loading(programDoc.value.update, 'Saved', 'Something went wrong, try again later')
    };
  }
};
</script>

<style lang="scss">
.presets {
  &__question-title {
    font-family: Raleway;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    // margin-top: 25px;
  }
  &__reflection-buttons {
    margin-right: 10px;
    margin-top: 10px;
  }

  &__reflection {
    margin-left: auto;
  }

  &__divider {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  &__section-title {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 40px;
  }

  &__nopresets {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }
}
</style>
