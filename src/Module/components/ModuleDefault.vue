<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-default__container">
      <div class="module-default__instructions">
        <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
          <v-expansion-panel>
            <v-expansion-panel-header
              v-show="showInstructions"
              hide-actions
              class="pa-0"
              @click="showInstructions = true"
            >
              <template v-slot="{ open }">
                <v-scroll-y-transition hide-on-leave>
                  <div v-if="!open" class="d-flex flex-column justify-center">
                    <v-icon color="grey lighten-2" class="d-flex justify-center">
                      mdi-chevron-down
                    </v-icon>
                    <div color="grey lighten-2" class="module-default__collapse-title">
                      INSTRUCTIONS
                    </div>
                  </div>
                </v-scroll-y-transition>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Instruct readonly />
              <div @click="showInstructions = true">
                <div class="module-default__collapse-title">CLOSE</div>
                <!-- <div class="hr"/> OPTIONAL -->
                <v-icon color="grey lighten-2" class="d-flex justify-center">
                  mdi-chevron-up
                </v-icon>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-progress-linear
        class="module-default__collapse-divider"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <div class="module-edit__container">
        <div class="module-default__row">
          <validation-provider
            v-slot="{ errors }"
            slim
            :rules="{
              regex: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
              required: true
            }"
          >
            <v-text-field
              v-model="link"
              label="Prototype Demonstration Video"
              :error-messages="errors"
              outlined
              placeholder="Enter YouTube video link"
              prepend-inner-icon="mdi-youtube"
            ></v-text-field>
          </validation-provider>

          <v-btn
            class="module-default__youtube-verify-button ml-3"
            x-large
            outlined
            depressed
            :disabled="invalid"
            @click="save()"
            >Verify Link</v-btn
          >
        </div>
        <!-- <v-chip-group column multiple class="module-default__youtube-data mb-8">
          <v-chip class="mr-2" dark small label color="green">
            <v-icon small left>mdi-check-bold</v-icon>
            Verified YouTube Video
          </v-chip>
          <v-chip color="red" dark class="mr-2" small label>
            <v-icon small left>mdi-close-thick</v-icon>
            Replace with YouTube Video
          </v-chip>
          <v-chip class="mr-2" dark small label color="green">
            <v-icon small left>mdi-check-bold</v-icon>
            Verified Video Length
          </v-chip>
          <v-chip color="red" dark class="mr-2" small label>
            <v-icon small left>mdi-close-thick</v-icon>
            Video Length Exceeds Maximum
          </v-chip>

          <v-chip class="mr-2" dark small label color="green">
            <v-icon small left>mdi-check-bold</v-icon>
            Video is Public or Unlisted
          </v-chip>
          <v-chip color="red" dark class="mr-2" small label>
            <v-icon small left>mdi-close-thick</v-icon>
            Make Video Public or Unlisted
          </v-chip>
        </v-chip-group> -->
        <div>
          <v-btn outlined color="grey darken-1" class="mb-6" depressed x-small label>
            <!-- <v-icon left>mdi-check</v-icon> -->
            Team Yeezy Prototype Demonstration Video
            <v-icon x-small right>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
        <!-- <div class="module-default__youtube"></div> -->
        <iframe
          class="module-default__youtube"
          :src="link2"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <!-- <v-text-field
        disabled
        placeholder="3:25"
        outlined
        append-icon="mdi-close-circle"
      ></v-text-field> -->
        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import Instruct from './ModuleInstruct.vue';

export default {
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  apollo: {},
  setup() {
    const link = ref('');
    const link2 = ref('');
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    function save() {
      link2.value = link.value;
      console.log(link2);
    }
    console.log(link2);

    return {
      setupInstructions,
      showInstructions,
      link,
      save,
      link2
    };
  }
};
</script>

<style lang="scss">
.module-default {
  &__none {
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

  &__row {
    display: flex;
  }

  &__collapse-divider {
    margin-top: 15px;
    margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }

  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    width: 100%;
    height: 330px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    // border: 2px solid #dedede;
    // margin: 0px;
    // background-color: #dedede;

    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }

  &__youtube-data {
    display: flex;
    flex-direction: row;
  }

  &__youtube-verify-button {
    min-height: 56px;
  }

  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>
