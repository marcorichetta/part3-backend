(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(13),c=n.n(u),o=n(14),l=n(2),i=function(e){var t=e.filterHandler;return r.a.createElement(r.a.Fragment,null,"Filter:",r.a.createElement("input",{onChange:t}))},m=function(e){var t=e.newName,n=e.newNumber,a=e.NameSubmit,u=e.NameChange,c=e.NumberChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"Name:",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,"Number:",r.a.createElement("input",{value:n,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},f=function(e){var t=e.personsList,n=e.handleDelete;return r.a.createElement("ul",null,t.map(function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return n(e.id,e.name)}},"Delete"))}))},d=n(3),s=n.n(d),b="/api/persons",h=function(){return s.a.get(b).then(function(e){return e.data})},p=function(e){return s.a.post(b,e).then(function(e){return e.data})},E=function(e,t){return s.a.put("".concat(b,"/").concat(e),t).then(function(e){return e.data})},g=function(e,t){window.confirm("Delete ".concat(t,"?"))&&s.a.delete("".concat(b,"/").concat(e))},v=function(e){var t=e.message,n=e.type,a={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return a.color="error"===n?"red":"green",null===t?null:r.a.createElement("div",{style:a},t)},w=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(!0),d=Object(l.a)(c,2),s=d[0],b=d[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),O=j[0],N=j[1],S=Object(a.useState)(""),C=Object(l.a)(S,2),y=C[0],k=C[1],D=Object(a.useState)(""),L=Object(l.a)(D,2),T=L[0],F=L[1],B=Object(a.useState)(null),H=Object(l.a)(B,2),I=H[0],J=H[1],x=Object(a.useState)(null),z=Object(l.a)(x,2),A=z[0],P=z[1];Object(a.useEffect)(function(){h().then(function(e){u(e)})},[]);var R=s?n:n.filter(function(e){return e.name.toLowerCase().includes(T.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{type:A,message:I}),r.a.createElement(i,{filterHandler:function(e){F(e.target.value),b(!1)}}),r.a.createElement("h2",null,"New contact"),r.a.createElement(m,{newName:O,newNumber:y,NameSubmit:function(e){e.preventDefault();var t={content:{name:O,number:y,id:n.length+1}};if(0!==n.filter(function(e){return e.name===O}).length){if(window.confirm("".concat(O," is already added to phonebook, replace the old number with a new one?"))){var a=n.find(function(e){return e.name===O}),r=Object(o.a)({},a,{number:y});return E(r.id,r).then(function(e){u(n.map(function(t){return t.id!==r.id?t:e}))}).catch(function(e){P("error"),J("Information of ".concat(r.name," has already been removed from server.")),setTimeout(function(){J(null),P("")},5e3)}),J("".concat(r.name," number was updated")),setTimeout(function(){J(null)},5e3),!0}return!1}p(t).then(function(e){u(n.concat(e)),N(""),k("")}),J("".concat(O," was added to the phonebook")),setTimeout(function(){J(null)},5e3)},NameChange:function(e){N(e.target.value)},NumberChange:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Contacts"),r.a.createElement(f,{personsList:R,handleDelete:function(e,t){g(e,t),u(n.filter(function(t){return t.id!==e})),J("".concat(t," has been removed from server.")),setTimeout(function(){J(null),P("")},5e3)}}))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.46e4888e.chunk.js.map