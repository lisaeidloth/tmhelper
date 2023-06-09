import {defineStore} from "pinia";
import {TestAnswer} from "~/utils/types";

export const useQuestionStore = defineStore("question", {
    state: () => ({
        answers: [],
        done: ref(false)
    }),
    getters: {
      recentQuestionIndex(state) {
          //get the index of the answer of the question, the user has to answer, last one, if done
          return state.done? state.answers.length - 1 : state.answers.length
      }
    },
    actions: {
        setDone() {
            this.done = true
        }
    }
})