import{a1 as s,C as n}from"./entry.8a2e67bc.js";const r=s("question",{state:()=>({answers:[],done:n(!1)}),getters:{recentQuestionIndex(e){return e.done?e.answers.length-1:e.answers.length}},actions:{setDone(){this.done=!0},reset(){this.answers=[],this.done=!1},updateAnswer(e){this.answers[e.qIndex]=e}}});export{r as u};