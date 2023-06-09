<template>
  <div class="ma-8">
    <div v-if="!questionStore.done">
      <v-btn color="primary" to="/threathelper" block>Start Test</v-btn>
    </div>
    <div v-else-if="!pending">
      <h1>Ergebnis</h1>
      <v-expansion-panels class="mt-3">
        <v-expansion-panel v-for="(result, index) in toolResult" :key="result.tool.slug">
          <v-expansion-panel-title>
            <div class="d-flex align-center w-100" style="gap: 3em">
              <span class="circled">{{ index + 1 }}</span>
              <div class="w-100 d-flex justify-space-between align-center w-100">
                <h3 :class="result.accepted? '' : 'invalid'">{{ result.tool.name }}</h3>
                <span class="mr-10">{{ result.points }} / {{ criteria.body.length }} Punkte</span>
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list class="w-100">
              <div class="w-100 pa-3 d-flex flex-row-reverse">
                <span>Soll</span><span class="mr-4">Ist</span>
              </div>
              <div class="w-100 pa-3" v-for="crit in criteria.body" :key="crit.slug">
                <div class="w-100 d-flex align-center justify-space-between">
                  <span>{{ crit.name }}</span>
                  <div>
                    <v-icon
                        :icon="result.tool.rating[crit.slug] > 0? 'mdi-check-circle-outline' : 'mdi-circle-outline'"
                        class="mr-4">
                    </v-icon>
                    <v-icon
                        :color="questionStore.answers.find(it => it.criteriaSlug === crit.slug).answer === 2? 'primary' : undefined"
                        :icon="questionStore.answers.find(it => it.criteriaSlug === crit.slug).answer > 0? 'mdi-check-circle-outline' : 'mdi-circle-outline'"
                    ></v-icon>
                  </div>

                </div>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useQuestionStore} from "~/stores/questionStore";
import {computed, useAsyncData} from "#imports";
import {ResultEntry} from "~/utils/types";
import {el} from "vuetify/locale";

const questionStore = useQuestionStore()
const { data:tools, pending:pendingTools } = useAsyncData('tools', () => queryContent('/tools').findOne())
const { data:criteria, pending:pendingCriteria } = useAsyncData('criteria', () => queryContent('/criteria').findOne())

const pending = computed(() => {
  return pendingTools.value || pendingCriteria.value
})

const toolResult = computed(() => {
  const result: ResultEntry[] = []
  if(pending.value || !questionStore.done) {
    return result
  } else {
    tools.value.body.forEach(tool => {
      let points = 0
      let accepted = true
      for(const critSlug in tool.rating) {
        // toolCritRating = rating of tool fulfilling criteria or not
        const toolCritRating = tool.rating[critSlug]
        // answer = user's input in questionnaire
        const answer = questionStore.answers.find(it => it.criteriaSlug === critSlug).answer
        if(answer === 0 || (answer === 1 && toolCritRating > 0)) {
          points++
        } else if(answer === 2) {
          if(toolCritRating > 0) {
            points++
          } else {
            accepted = false
          }
        }
      }
      result.push({
        tool: tool,
        points: points,
        accepted: accepted
      })
    })
  }
  result.sort((a,b) => {
    const sorted = b.points - a.points
    if(sorted == 0) {
      if(a.accepted == b.accepted) return 0
      if(!a.accepted) return 1
      if(!b.accepted) return -1
    }
    return sorted
  })
  return result
})


</script>

<style scoped>
.circled {
  color: green;
  border: 1px solid green;
  border-radius: 89px;
  padding: 5px 8px;
}

.invalid {
  color: #E0E0E0;
}
</style>