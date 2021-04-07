<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-default pa-0">
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
                    <div class="module-default__collapse-title">
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
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <v-container class="d-flex flex-row pa-5 mt-12">
        <validation-provider
          v-slot="{ errors }"
          class="module-default__youtube-verify-button"
          slim
          :rules="{
            regex: /^((?:https?:)?\/\/)((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
            required: true
          }"
        >
          <v-text-field
            v-model="link"
            :readonly="!adkTeamData && userType !== 'organizer'"
            rounded
            :error-messages="errors.concat(apiErrors)"
            outlined
            :label="`YouTube: Enter ${adkData.videoMaxLength}-Minute Project Video`"
            placeholder="https://youtu.be/yourvideocode"
            prepend-inner-icon="mdi-youtube"
            @input="apiErrors = []"
          ></v-text-field>
        </validation-provider>
        <v-btn
          class="module-default__youtube-verify-button ml-3"
          rounded
          x-large
          outlined
          depressed
          :loading="verifyLoading"
          :disabled="invalid || (!adkTeamData && userType !== 'organizer')"
          @click="verifyLink()"
          >Verify Link</v-btn
        >
      </v-container>
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
      <div
        v-if="!submittedVideo"
        class="d-flex headline font-weight-bold justify-center align-center module-default__youtube"
      >
        No video yet
      </div>
      <v-btn
        v-if="submittedVideo"
        rounded
        color="pink"
        dark
        class="mb-4 mt-4"
        depressed
        small
        label
        :href="`https://youtu.be/${submittedVideo.id}`"
      >
        <!-- <v-icon left>mdi-check</v-icon> -->
        {{ submittedVideo.snippet.title }}
        <v-icon x-small right>mdi-open-in-new</v-icon>
      </v-btn>
      <iframe
        v-if="submittedVideo"
        class="module-default__youtube"
        width="100%"
        height="330"
        :src="`https://www.youtube.com/embed/${submittedVideo.id}`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <!-- <v-text-field
        disabled
        placeholder="3:25"
        outlined
        append-icon="mdi-close-circle"
      ></v-text-field> -->
      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
      <!-- <div class="module-default__none">Design your activity here</div> -->
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { ref, PropType, defineComponent } from '@vue/composition-api';
import * as Realm from 'realm-web';
// eslint says it can't find these modules from @types/node
// can be fixed by removing "./node_modules/@types" from typeRoots in tsconfig.json
// but then you get errors for unit test related imports
// anyway this doesn't matter since it will be server-side
import { getModAdk } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import { MongoDoc, Video } from '../types';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    teamDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    currentUser: {
      required: true,
      type: Object as PropType<Realm.User>
    }
  },
  setup(props, ctx) {
    const { adkData } = getModAdk(props, ctx.emit, 'demo');
    const { adkData: adkTeamData, adkIndex } =
      getModAdk(props, ctx.emit, 'demo', { submittedVideo: null }, 'teamDoc', 'inputTeamDoc') ??
      null;
    const link = ref(
      adkTeamData.value.submittedVideo
        ? `https://youtu.be/${adkTeamData.value.submittedVideo.id}`
        : ''
    );
    // TODO: when teamDoc works, add submitted link from there if it exists
    const submittedVideo = ref<Video | null>(adkTeamData?.value.submittedVideo);
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);

    const apiErrors = ref<Array<string>>([]);

    const verifyLoading = ref(false);
    async function verifyLink() {
      if (!adkTeamData?.value && props.userType !== 'organizer') {
        apiErrors.value.push('not in team');
        return;
      }
      verifyLoading.value = true;
      const user: Realm.User = props.currentUser as Realm.User;
      const res: {
        statusCode: number;
        error?: string;
        body?: { submittedVideo: Video };
      } = await user.callFunction('ADK_Demo', {
        operation: 'submitResponse',
        payload: {
          videoLink: link.value,
          // TODO: probably want to move this part to server side
          videoMaxLength: adkData.value.videoMaxLength
        }
      });
      if (res.statusCode === 200) {
        submittedVideo.value = res.body!.submittedVideo;
        if (props.userType !== 'organizer') {
          adkTeamData.value.submittedVideo = submittedVideo.value;
          props.teamDoc?.update(() => ({
            isComplete: true,
            adkIndex
          }));
        }
      } else if (res.error) {
        apiErrors.value.push(res.error);
      }
      verifyLoading.value = false;
    }

    return {
      setupInstructions,
      showInstructions,
      link,
      adkData,
      adkTeamData,
      submittedVideo,
      apiErrors,
      verifyLoading,
      verifyLink
    };
  }
});
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
    width: 100%;
  }

  &__collapse-divider {
    // margin: 15px 0 75px;
    padding-right: 0;
    padding-left: 0;
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
    border: 0;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    // border: 5px solid #dedede;
    // margin: 0px;
    background-color: #dedede;
    color: #ffffff;
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
    // width: 100%;
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
    letter-spacing: 0;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>
