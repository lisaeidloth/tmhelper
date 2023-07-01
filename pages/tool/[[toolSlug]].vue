<template>
  <div class="pa-4">
    <div v-if="!pendingTools && !pendingCritertias">
      <h1>{{ tool.slug }}</h1>
      <span>{{ tool.description }}</span>

      <v-list>
        <v-list-item
          v-for="(crit, index) of criterias" :key="crit.slug"
          :append-icon="!isOption(crit) && tool.rating[crit.slug] > 0? 'mdi-check' : undefined"
          :class="index % 2 === 0? 'even' : 'odd'"
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

import {useAsyncData} from "#imports";
import {CriteriaEntry, ToolEntry} from "~/utils/types";

const toolSlug = useRoute().params.toolSlug

const { data:tool, pending:pendingTools } = useAsyncData<ToolEntry>('tools',
    () => queryContent('/tools').findOne()
        .then(data => data.body)
        .then(bodyArr => bodyArr.filter(it => it.slug === toolSlug)[0] as ToolEntry)
)

const { data:criterias, pending:pendingCritertias } = useAsyncData("criteria",
    () => queryContent('/criteria').findOne()
        .then(data => data.body as Array<CriteriaEntry>)
)

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