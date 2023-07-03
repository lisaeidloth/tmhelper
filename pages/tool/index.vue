<template>
  <div>
    <h1>Threat-Modeling-Tools</h1>
    <v-list v-if="!pendingTools">
      <v-list-item v-for="tool of tools" :to="{name: 'tool-toolSlug', params: { toolSlug: tool.slug }}" prepend-icon="mdi-arrow-right">{{tool.name}}</v-list-item>
    </v-list>
  </div>

</template>

<script setup lang="ts">

import {useAsyncData} from "#imports";
import {ToolEntry} from "~/utils/types";

const {data: tools, pending: pendingTools} = useAsyncData<ToolEntry[]>('tools-tools',
    () => queryContent('/tools').findOne()
        .then(data => data.body)
        .then(bodyArr => bodyArr as ToolEntry[])
)

</script>

<style scoped></style>