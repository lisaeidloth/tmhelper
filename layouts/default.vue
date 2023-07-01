<template>
  <div>
    <v-app>
      <v-layout>
        <v-app-bar elevation="2">
          <template v-slot:prepend>
            <router-link to="/">
              <v-icon icon="mdi-periodic-table" to="/" class="ml-1"></v-icon>
            </router-link>
          </template>
          <v-app-bar-title>Threat Modeling Tool-O-Mat</v-app-bar-title>
        </v-app-bar>
        <v-navigation-drawer :expand-on-hover="true" :rail="true">
          <v-list nav>
            <v-list-item v-for="entry in nav" :prepend-icon="entry.icon" :to="entry.target" :title="entry.title" v-show="entry.show()"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-bottom-navigation class="d-lg-none">
          <v-btn v-for="entry in nav" :value="entry.title" :to="entry.target" :icon="entry.icon" v-show="entry.show()"></v-btn>
        </v-bottom-navigation>
        <v-main class="ma-3">
          <slot></slot>
        </v-main>
      </v-layout>
    </v-app>
  </div>

</template>

<script setup lang="ts">
import {useQuestionStore} from "~/stores/questionStore";
import {useDisplay} from "vuetify";

const store = useQuestionStore()
const nav = reactive([
  {
    title: "Tool Finder",
    icon: "mdi-test-tube",
    target: "/threathelper",
    show: () => true
  },
  {
    title: "Ergebnis",
    icon: "mdi-check-decagram-outline",
    target: "/result",
    show: () => store.done
  },
])
</script>

<style scoped></style>