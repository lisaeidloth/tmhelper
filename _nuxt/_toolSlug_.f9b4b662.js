import{u as C,q as V}from"./query.53b35fd3.js";import{h as T,a as z,l as A,r as f,o as s,z as a,u as o,S as e,Y as d,R as m,X as p,v as c,V as y,W as x,c as g,Z as L,$ as j,a0 as q,y as D}from"./entry.8a2e67bc.js";import"./utils.6f5140f3.js";import"./preview.496a16a7.js";const b=_=>(j("data-v-bc902654"),_=_(),q(),_),H={class:"ml-4 pa-4"},M={key:0},R={class:"mb-2 text-primary"},Z=["innerHTML"],$={key:0},E={key:1,class:"d-flex flex-row",style:{gap:"15px"}},F={class:"d-flex flex-column flex-grow-1",style:{"flex-basis":"0"}},K=b(()=>e("h3",{class:"mt-2 py-2 pl-1 bg-grey-lighten-3"},"Vorteile",-1)),Q={class:"d-flex flex-column flex-grow-1",style:{"flex-basis":"0"}},W=b(()=>e("h3",{class:"mt-2 py-2 pl-1 bg-grey-lighten-3"},"Nachteile",-1)),X=b(()=>e("h2",null,"Abgleich Kriterien",-1)),Y={class:"d-flex justify-space-between"},G={key:0,class:"ml-auto"},J=T({__name:"[toolSlug]",setup(_){const k=z().params.toolSlug,{data:l,pending:S}=C("tools-tool-"+k,()=>V("/tools").findOne().then(t=>t.body).then(t=>t.filter(v=>v.slug===k)[0]),"$rrZigBzmhQ"),{data:B,pending:N}=C("criteria-tool",()=>V("/criteria").findOne().then(t=>t.body)),h=A(()=>!S.value&&(l.value.pros_cons.advantages.length>0||l.value.pros_cons.disadvantages.length>0));function w(t){return t.type==="option"}function I(t){return l.value.rating[t.slug].map(u=>{var i;return(i=t.options)==null?void 0:i.find(r=>r.key===u).name}).join(", ")}return(t,v)=>{const u=f("v-divider"),i=f("v-list-item"),r=f("v-list");return s(),a("div",H,[!o(S)&&!o(N)?(s(),a("div",M,[e("h1",R,d(o(l).name),1),e("div",{class:"pr-5",innerHTML:o(l).description},null,8,Z),m(u,{class:"my-5"}),o(h)?(s(),a("h2",$,"Vor- & Nachteile")):p("",!0),o(h)?(s(),a("div",E,[e("div",F,[K,m(r,{density:"compact"},{default:c(()=>[(s(!0),a(y,null,x(o(l).pros_cons.advantages,n=>(s(),g(i,{class:"mb-2 pl-0 bg-grey-lighten-4","prepend-icon":"mdi-circle-small"},{default:c(()=>[e("div",null,[e("span",null,d(n),1)])]),_:2},1024))),256))]),_:1})]),e("div",Q,[W,m(r,{density:"compact"},{default:c(()=>[(s(!0),a(y,null,x(o(l).pros_cons.disadvantages,n=>(s(),g(i,{class:"mb-2 pl-0 bg-grey-lighten-4","prepend-icon":"mdi-circle-small"},{default:c(()=>[e("div",null,[e("span",null,d(n),1)])]),_:2},1024))),256))]),_:1})])])):p("",!0),o(h)?(s(),g(u,{key:2,class:"my-5"})):p("",!0),X,m(r,{class:"pr-5"},{default:c(()=>[(s(!0),a(y,null,x(o(B),(n,O)=>(s(),g(i,{key:n.slug,"append-icon":!w(n)&&o(l).rating[n.slug]>0?"mdi-check":void 0,class:L([O%2===0?"even":"odd","pl-0"])},{default:c(()=>[e("div",Y,[e("span",null,d(n.short),1),w(n)?(s(),a("span",G,d(I(n)),1)):p("",!0)])]),_:2},1032,["append-icon","class"]))),128))]),_:1})])):p("",!0)])}}});const te=D(J,[["__scopeId","data-v-bc902654"]]);export{te as default};
