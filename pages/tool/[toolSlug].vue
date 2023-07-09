<template>
  <div class="ml-4 pa-4">
    <div v-if="!pendingTools && !pendingCritertias">
      <h1 class="mb-2 text-primary">{{ tool.name }}</h1>
      <div class="pr-5" v-html="tool.description"></div>
      <v-divider class="my-5"></v-divider>
      <h2 v-if="showAdvantages">Vor- & Nachteile</h2>
      <div v-if="showAdvantages" class="d-flex flex-row" style="gap: 15px">
        <div class="d-flex flex-column flex-grow-1" style="flex-basis: 0">
          <h3 class="mt-2 py-2 pl-1 bg-grey-lighten-3">Vorteile</h3>
          <v-list density="compact">
            <v-list-item
                v-for="advantages of tool.pros_cons.advantages"
                class="mb-2 pl-0 bg-grey-lighten-4"
                prepend-icon="mdi-circle-small"
            >
              <div>
                <span>{{ advantages }}</span>
              </div>
            </v-list-item>
          </v-list>
        </div>
        <div class="d-flex flex-column flex-grow-1" style="flex-basis: 0">
          <h3 class="mt-2 py-2 pl-1 bg-grey-lighten-3">Nachteile</h3>
          <v-list density="compact">
            <v-list-item
                v-for="disadvantages of tool.pros_cons.disadvantages"
                class="mb-2 pl-0 bg-grey-lighten-4"
                prepend-icon="mdi-circle-small"
            >
              <div>
                <span>{{ disadvantages }}</span>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <v-divider v-if="showAdvantages" class="my-5"></v-divider>
      <h2>Abgleich Kriterien</h2>
      <v-list class="pr-5">
        <v-list-item
            v-for="(crit, index) of criterias" :key="crit.slug"
            :append-icon="!isOption(crit) && tool.rating[crit.slug] > 0? 'mdi-check' : undefined"
            :class="index % 2 === 0? 'even' : 'odd'"
            class="pl-0"
        >
          <div class="d-flex justify-space-between">
            <span>{{ crit.short }}</span>
            <span v-if="isOption(crit)" class="ml-auto">{{ mapOptionsToString(crit) }}</span>
          </div>
        </v-list-item>
      </v-list>
    </div>
  </div>

</template>


<script setup lang="ts">

import {computed, useAsyncData} from "#imports";
import {CriteriaEntry, ToolEntry} from "~/utils/types";

const toolSlug = useRoute().params.toolSlug

const {data: tool, pending: pendingTools} = useAsyncData<ToolEntry>('tools-tool-' + toolSlug,
    () => queryContent('/tools').findOne()
        .then(data => data.body)
        .then(bodyArr => bodyArr.filter(it => it.slug === toolSlug)[0] as ToolEntry)
)

const {data: criterias, pending: pendingCritertias} = useAsyncData("criteria-tool",
    () => queryContent('/criteria').findOne()
        .then(data => data.body as Array<CriteriaEntry>)
)


const showAdvantages = computed(() => {
  return !pendingTools.value && (tool.value.pros_cons.advantages.length > 0 || tool.value.pros_cons.disadvantages.length > 0)
})

function isOption(crit: CriteriaEntry): boolean {
  return crit.type === "option"
}

function mapOptionsToString(crit: CriteriaEntry): string {
  const provides = tool.value.rating[crit.slug].map(key => crit.options?.find(it => it.key === key).name)
  return provides.join(', ')
}

</script>

<style scoped>

.odd {
  background: #f5f5f5
}

</style>