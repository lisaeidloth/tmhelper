<template>
  <div>
    <div v-if="!pending" class="d-flex flex-column ma-auto" style="gap: 1em; max-width: 70%" @keydown.enter="next">
      <h1 class="mt-4 mb-2">
        Wie wichtig ist Ihnen das folgende Kriterium?
      </h1>
      <div style="height: 130px">
        <Transition name="slide" class="position-absolute"
                    :leave-to-class="leaveTo" :enter-from-class="enterFrom"
        >
          <v-card class="pa-8" elevation="3" :key="currentCriteria" rounded style="width: 70%">
            {{ data.body[currentCriteria].name }}
          </v-card>
        </Transition>
      </div>
      <div v-if="data.body[currentCriteria].type === 'option'" class="d-flex flex-row align-self-center" style="height: 60px">
        <v-checkbox
            v-for="option in data.body[currentCriteria].options"
            :key="option.id"
            :label="option.name"
            v-model="currentOptions"
            :value="option.key"
            style="margin: 0 5em 0 5em"
        >
        </v-checkbox>
      </div>
      <v-slider v-else min="0" max="2" v-model="currentRating" step="1" show-ticks="always" tick-size="10"
                :ticks="label"
                color="primary" thumb-color="green" track-color="blue"
                append-icon="mdi-plus" prepend-icon="mdi-minus" ref="slider"
      ></v-slider>
      <v-btn @click="next" class="ma-auto mt-5 mb-7" color="primary" size="large">
        {{ lastQst ? 'Abschließen' : 'Weiter' }}
      </v-btn>
      <div class="d-flex justify-space-evenly">
        <v-icon
            class="click-icon"
            :class="`${i === currentCriteria? 'active' : ''} ${i <= answers.length? 'clickable' : ''}`"
            v-for="(crit, i) in data.body"
            :icon="i >= answers.length? 'mdi-circle-outline' : 'mdi-circle'"
            :key="i"
            @click="i <= answers.length? setCurrentQst(+i) : null"
        >
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, useAsyncData} from "#imports";
import {CriteriaContent, TestAnswer} from "~/utils/types";
import {VSlider} from "vuetify/components/VSlider";
import {useQuestionStore} from "~/stores/questionStore";

const questionStore = useQuestionStore()
questionStore.reset()

const {data, pending} = useAsyncData<CriteriaContent>('index-th', () => queryContent('/criteria').findOne())
const label = {
  0: "egal",
  1: "wichtig",
  2: "zwingend erforderlich"
}

const slider = ref<VSlider>()
const leaveTo = ref("slide-left")
const enterFrom = ref("slide-right")
const currentCriteria = ref(questionStore.recentQuestionIndex)

const currentRating = ref(0) // for likert scale question
const currentOptions = ref<Array<number>>([]) // for option type question

const answers = questionStore.answers
const lastQst = computed(() => {
  return !pending.value && currentCriteria.value >= data.value!.body.length - 1
})

function next() {
  enterFrom.value = "slide-right"
  leaveTo.value = "slide-left"
  const testAnswer: TestAnswer = {
    qIndex: currentCriteria.value,
    criteriaSlug: data.value?.body[currentCriteria.value].slug!,
    answer: data.value?.body[currentCriteria.value].type === "option" ? currentOptions.value : currentRating.value
  }
  if (!questionStore.done) {
    questionStore.updateAnswer(testAnswer)
  }
  if (lastQst.value) {
    // TODO
    questionStore.setDone()
    useRouter().push("/result")
  } else {
    currentCriteria.value += 1
    currentRating.value = 0
    currentOptions.value = []
  }
}

function setCurrentQst(index: number) {

  if (currentCriteria.value < answers.length) {
    if (data.value?.body[currentCriteria.value].type === "option") {
      answers[currentCriteria.value].answer = currentOptions.value
    } else {
      answers[currentCriteria.value].answer = currentRating.value
    }
  }
  if (index < currentCriteria.value) {
    enterFrom.value = "slide-left"
    leaveTo.value = "slide-right"
  } else {
    enterFrom.value = "slide-right"
    leaveTo.value = "slide-left"
  }

  currentCriteria.value = index

  if (index < answers.length) {
    if (data.value?.body[index].type === "option") {
      currentOptions.value = answers[index].answer
    } else currentRating.value = answers[index].answer
  } else {
    currentOptions.value = []
    currentRating.value = 0
  }
}
</script>

<style scoped>

.click-icon {
  color: #E0E0E0;
}

.click-icon.active {
  color: rgb(var(--v-theme-secondary));
}

.clickable {
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
}

.clickable:hover {
  color: rgb(var(--v-theme-secondary-darken-1));
}

.slide-enter-active, .slide-leave-active {
  position: absolute;
}

.slide-enter-active {
  transition: all 1s cubic-bezier(.19, .33, .51, .75);
}

.slide-leave-active {
  transition: all 1s cubic-bezier(.19, .33, .51, .75);
}

.slide-left, .slide-right {
  opacity: 0;
}

.slide-left {
  transform: translateX(-130%);
}

.slide-right {
  transform: translateX(100%);
}
</style>