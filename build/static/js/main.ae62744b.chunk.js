(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(13),r=t.n(a),u=t(0),c=t.n(u),o=t(2),i=t(3),l=t.n(i),m="/api/persons",s=function(){return l.a.get(m).then((function(e){return e.data}))},f=function(e){return l.a.post(m,e).then((function(e){return e.data}))},d=function(e,n){return l.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return l.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=(t(36),function(e){var n=e.value,t=e.onChangeFunction;return c.a.createElement("input",{value:n,onChange:t})}),v=function(e){var n=e.name,t=e.number,a=e.nameOnChange,r=e.numberOnChange,u=e.onSubmission;return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:u},c.a.createElement("div",null,"Name: ",c.a.createElement("input",{value:n,onChange:a})),c.a.createElement("div",null,"Number: ",c.a.createElement("input",{value:t,onChange:r})),c.a.createElement("button",{type:"submit"},"Add")))},p=function(e){var n=e.persons,t=e.deleteFunction;return c.a.createElement("div",null,n.map((function(e,n){return c.a.createElement("div",{key:n,style:{display:"flex"}},c.a.createElement("p",null,e.name," ",e.number," "),c.a.createElement("button",{"data-key":e.id,"data-name":e.name,onClick:t,style:{height:"20px",marginLeft:"10px",marginTop:"15px"}},"Delete"))})))},E=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],a=n[1],r=Object(u.useState)(""),i=Object(o.a)(r,2),l=i[0],m=i[1],E=Object(u.useState)(""),g=Object(o.a)(E,2),O=g[0],j=g[1],C=Object(u.useState)(""),y=Object(o.a)(C,2),S=y[0],k=y[1],w=Object(u.useState)(t),N=Object(o.a)(w,2),x=N[0],T=N[1],F=Object(u.useState)(null),A=Object(o.a)(F,2),D=A[0],I=A[1],L=Object(u.useState)(null),J=Object(o.a)(L,2),B=J[0],P=J[1];Object(u.useEffect)((function(){s().then((function(e){a(e),T(e)}))}),[]);var R=function(e){var n=e.message,t=e.className;return null===n?null:c.a.createElement("div",{className:t},"Added ",n)};return c.a.createElement("div",null,c.a.createElement(R,{message:B,className:"notification"}),c.a.createElement(R,{message:D,className:"error"}),c.a.createElement("h2",null,"Phonebook"),c.a.createElement("h3",null,"Search the phonebook"),c.a.createElement(b,{value:S,onChangeFunction:function(e){k(e.target.value);var n=e.target.value,a=t.filter((function(e){return 0===e.name.toLowerCase().indexOf(n.toLowerCase())}));T(a)}}),c.a.createElement("h3",null,"Add to the phonebook"),c.a.createElement(v,{name:l,number:O,nameOnChange:function(e){m(e.target.value)},numberOnChange:function(e){j(e.target.value)},onSubmission:function(e){e.preventDefault();var n=t.find((function(e){return e.name===l})),r={name:l,number:O};n&&window.confirm("".concat(l," is already added to the phone book. \n    Replace the old number with the new number?"))?d(n.id,r).then((function(e){a(t.map((function(t){return t.id!==n.id?t:e}))),T(t.map((function(t){return t.id!==n.id?t:e}))),P(r.name),setTimeout((function(){P(null)}),5e3)})).catch((function(e){I("Information of ".concat(r.name," has already been removed from the server")),setTimeout((function(){I(null)}),5e3)})):f(r).then((function(e){a(t.concat(e)),T(t.concat(e)),P(r.name),setTimeout((function(){P(null)}),5e3)}))}}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(p,{persons:x,deleteFunction:function(e){var n=e.target.dataset.name;if(window.confirm("Delete ".concat(n,"?"))){var r=Number(e.target.dataset.key);h(r).then((function(e){var n=t.filter((function(e){return e.id!==r}));a(n),T(n)})).catch((function(e){I("Information of ".concat(n," has already been removed from the server")),setTimeout((function(){I(null)}),5e3)}))}}}))};r.a.render(c.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.ae62744b.chunk.js.map