import{u as d,q as p}from"./query.53b35fd3.js";import{h as _,r as n,o as t,z as s,u as a,c as r,v as l,V as f,W as g,X as h,S as v,U as x,Y as y}from"./entry.8a2e67bc.js";import"./utils.6f5140f3.js";import"./preview.496a16a7.js";const C=v("h1",null,"Threat-Modeling-Tools",-1),q=_({__name:"index",setup(k){const{data:i,pending:c}=d("tools-tools",()=>p("/tools").findOne().then(e=>e.body).then(e=>e));return(e,B)=>{const m=n("v-list-item"),u=n("v-list");return t(),s("div",null,[C,a(c)?h("",!0):(t(),r(u,{key:0},{default:l(()=>[(t(!0),s(f,null,g(a(i),o=>(t(),r(m,{to:{name:"tool-toolSlug",params:{toolSlug:o.slug}},"prepend-icon":"mdi-arrow-right"},{default:l(()=>[x(y(o.name),1)]),_:2},1032,["to"]))),256))]),_:1}))])}}});export{q as default};