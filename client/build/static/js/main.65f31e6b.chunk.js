(this.webpackJsonpanime=this.webpackJsonpanime||[]).push([[0],{106:function(e,t,a){},123:function(e,t,a){},124:function(e,t,a){},125:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(31),r=a.n(s),i=(a(85),a(5)),o=a(25),l=a(7),j=a(39),d=a(6),b=(a(86),a(28)),u=a.n(b),O=a(130),h=a(80),m=(a(105),a(106),a(132)),p=a(131),g=a(79),x=a(1),f=c.a.memo((function(e){return Object(x.jsx)(c.a.Fragment,{children:Object(x.jsx)("div",{className:"list",children:Object(x.jsxs)(m.a,{children:[Object(x.jsxs)(o.b,{className:"linkstyle",to:"/anime/".concat(e.id),children:[Object(x.jsxs)(m.a.Body,{children:[Object(x.jsx)(m.a.Title,{children:Object(x.jsx)("b",{children:e.name})}),Object(x.jsx)(m.a.Text,{children:e.descriptions})]}),Object(x.jsxs)(p.a,{className:"list-group-flush",children:[Object(x.jsxs)(g.a,{children:[Object(x.jsx)("b",{children:"Episodes-"})," ",e.episodes_count]}),Object(x.jsxs)(g.a,{children:[Object(x.jsx)("b",{children:"Year- "}),e.season_year]}),Object(x.jsxs)(g.a,{children:[Object(x.jsx)("b",{children:"Overall Avg Rating- "}),e.OverallRating]}),Object(x.jsxs)(g.a,{children:[Object(x.jsx)("b",{children:"Genres-"})," ",e.genres.join(", ")]})]}),Object(x.jsx)("br",{})]}),e.trailer_url?Object(x.jsxs)(m.a.Link,{href:"".concat(e.trailer_url),children:["Trailer- ",e.trailer_url]}):""]})})})})),v=a(32),S=a.n(v),N=a(129);var _=function(){var e=Object(n.useRef)(!1),t=Object(n.useRef)(),a=Object(n.useRef)(),c=Object(n.useState)(""),s=Object(d.a)(c,2),r=s[0],i=s[1],o=Object(n.useState)([]),b=Object(d.a)(o,2),m=b[0],p=b[1],g=Object(n.useState)({curr:1,maxpage:null}),v=Object(d.a)(g,2),_=v[0],y=v[1],w=Object(n.useState)({condition:!1,msg:"Loading"}),C=Object(d.a)(w,2),k=C[0],E=C[1],R=Object(n.useState)(!1),T=Object(d.a)(R,2),P=T[0],L=T[1],A=Object(n.useState)({title:!0,genres:!1,description:!1}),F=Object(d.a)(A,2),I=F[0],D=F[1],z=Object(n.useState)("https://api.aniapi.com/v1/anime?title="),U=Object(d.a)(z,2),B=U[0],J=U[1],H=function(e,t,a){var n,c;E({condition:!0,msg:"Loading"}),L(!0),u.a.get("".concat(B).concat(e,"&page=").concat(t,"&per_page=20")).then((function(e){if(console.log(e.data),e.data.data)return n=e.data.data.documents.map((function(e){return e.id})),c=e.data.data.documents,a?(p([].concat(Object(j.a)(m),Object(j.a)(e.data.data.documents))),y((function(e){return Object(l.a)(Object(l.a)({},e),{},{curr:t})}))):(p(e.data.data.documents),y((function(t){return{curr:1,maxpage:e.data.data.last_page+1}})),E({condition:!1,msg:"Loading"})),u.a.post("".concat("https://radiant-refuge-11101.herokuapp.com","/map-ratings/[").concat(n,"]"))})).then((function(e){var t=c.map((function(t){return e.data.rating[t.id]?Object(l.a)(Object(l.a)({},t),{},{OverallRating:e.data.rating[t.id]}):t}));L(!1),p([].concat(Object(j.a)(m),Object(j.a)(t)))})).catch((function(e){L(!1)}))};Object(n.useEffect)((function(){if(e.current){if(r){var t=setTimeout((function(){H(r,1,0)}),500);return function(){clearTimeout(t)}}p([])}else e.current=!0}),[r]),Object(n.useEffect)((function(){var e={root:a.current,rootMargin:"0px",threshold:1},n=new IntersectionObserver((function(e,t){if(e[0].isIntersecting){var a=_.curr+1;a<_.maxpage&&r?H(r,a,1):E({condition:!1,msg:"End of Results"})}}),e);return n.observe(t.current),function(){return t.current?n.unobserve(t.current):""}}),[m,_]);var K=m.map((function(e,t){return Object(x.jsx)(f,{image:e.cover_image,name:e.titles.en,trailer_url:e.trailer_url,descriptions:e.descriptions.en,season_year:e.season_year,episodes_count:e.episodes_count,genres:e.genres,id:e.id,OverallRating:e.OverallRating?e.OverallRating:"---"},t)})),W=function(e){"title"===e.target.value?(D({title:!0,genres:!1,description:!1}),J("https://api.aniapi.com/v1/anime?title=")):"genres"===e.target.value?(D({title:!1,genres:!0,description:!1}),J("https://api.aniapi.com/v1/anime?genres=")):(D({title:!1,genres:!1,description:!0}),J("https://api.aniapi.com/v1/anime?description="))};return Object(x.jsx)(S.a,{active:P,spinner:Object(x.jsx)(N.a,{animation:"grow",variant:"primary",size:"lg"}),children:Object(x.jsx)("div",{className:"App",children:Object(x.jsxs)("div",{className:"wrapper",children:[Object(x.jsx)("div",{className:"heading",children:Object(x.jsx)("h1",{children:"Anime Search"})}),Object(x.jsxs)("div",{className:"search",children:[Object(x.jsx)(O.a,{onChange:function(e){return i(e.target.value)},size:"large",placeholder:"Search here",prefix:Object(x.jsx)(h.a,{})}),Object(x.jsx)("input",{type:"checkbox",value:"title",className:"boxes",checked:I.title,onChange:W}),"Title",Object(x.jsx)("input",{type:"checkbox",value:"genres",className:"boxes",checked:I.genres,onChange:W}),"Genres",Object(x.jsx)("input",{className:"boxes",type:"checkbox",value:"description",checked:I.description,onChange:W}),"Description"]}),Object(x.jsxs)("div",{ref:a,className:"listings",children:[K,Object(x.jsx)("div",{ref:t,children:Object(x.jsxs)("span",{children:[k.msg,"..."]})})]})]})})})};a(123);var y=function(){var e=Object(n.useState)(""),t=Object(d.a)(e,2),a=t[0],s=t[1],r=Object(n.useState)(""),l=Object(d.a)(r,2),j=l[0],b=l[1],O=Object(n.useState)(""),h=Object(d.a)(O,2),m=h[0],p=h[1],g=Object(n.useState)(!1),f=Object(d.a)(g,2),v=f[0],_=f[1],y=Object(n.useState)(!1),w=Object(d.a)(y,2),C=w[0],k=w[1];return Object(x.jsx)(c.a.Fragment,{children:Object(x.jsxs)(S.a,{active:v,spinner:Object(x.jsx)(N.a,{animation:"grow",variant:"primary",size:"lg"}),children:[C?Object(x.jsx)(i.a,{to:"/"}):"",Object(x.jsx)("div",{className:"auth-wrapper",children:Object(x.jsx)("div",{className:"auth-inner",children:Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={email:a,password:j};_(!0),console.log("https://radiant-refuge-11101.herokuapp.com"),u.a.post("".concat("https://radiant-refuge-11101.herokuapp.com","/login"),t,{withCredentials:!0}).then((function(e){localStorage.setItem("isAuthenticated",JSON.stringify({id:e.data.data.user._id,email:e.data.data.user.email})),k(!0),_(!1)})).catch((function(e){_(!1),p(e.response.data.message)}))},children:[Object(x.jsx)("h3",{children:"Login"}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Email"}),Object(x.jsx)("input",{type:"text",className:"form-control",placeholder:"Email",onChange:function(e){return s(e.target.value)}})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Password"}),Object(x.jsx)("input",{type:"password",className:"form-control",placeholder:"Password",onChange:function(e){return b(e.target.value)}}),Object(x.jsx)("h5",{className:"display-error",children:m})]}),Object(x.jsx)("button",{className:"btn btn-primary btn-block",children:"Login"}),Object(x.jsx)(o.b,{to:"/signup",className:"btn btn-danger btn-block",children:"Signup"})]})})})]})})};a(124);var w=function(e){var t=Object(n.useState)(""),a=Object(d.a)(t,2),s=a[0],r=a[1],l=Object(n.useState)(""),j=Object(d.a)(l,2),b=j[0],O=j[1],h=Object(n.useState)(""),m=Object(d.a)(h,2),p=m[0],g=m[1],f=Object(n.useState)(!1),v=Object(d.a)(f,2),_=v[0],y=v[1],w=Object(n.useState)(""),C=Object(d.a)(w,2),k=C[0],E=C[1],R=Object(n.useState)(!1),T=Object(d.a)(R,2),P=T[0],L=T[1],A=Object(n.useState)({e:"",m:""}),F=Object(d.a)(A,2),I=F[0],D=F[1];return Object(x.jsx)(c.a.Fragment,{children:Object(x.jsxs)(S.a,{active:_,spinner:Object(x.jsx)(N.a,{animation:"grow",variant:"primary",size:"lg"}),children:[P?Object(x.jsx)(i.a,{to:"/"}):"",Object(x.jsx)("div",{className:"auth-wrapper",children:Object(x.jsx)("div",{className:"auth-inner",children:Object(x.jsxs)("div",{children:[Object(x.jsx)("h3",{children:"SignUp"}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Email"}),Object(x.jsx)("input",{type:"text",className:"form-control",placeholder:"Email",onChange:function(e){return r(e.target.value)}}),Object(x.jsx)("h5",{className:"display-error",children:I.e})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Name"}),Object(x.jsx)("input",{type:"name",className:"form-control",placeholder:"Name",onChange:function(e){return E(e.target.value)}})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Password"}),Object(x.jsx)("input",{type:"password",className:"form-control",placeholder:"Password",onChange:function(e){return O(e.target.value)}})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{children:"Confirm Password"}),Object(x.jsx)("input",{type:"password",className:"form-control",placeholder:"Password",onChange:function(e){return g(e.target.value)}}),Object(x.jsx)("h5",{className:"display-error",children:I.m})]}),Object(x.jsx)("button",{className:"btn btn-primary btn-block",onClick:function(e){var t={email:s,password:b,passwordConfirm:p,name:k};y(!0),u.a.post("".concat("https://radiant-refuge-11101.herokuapp.com","/signup"),t,{withCredentials:!0}).then((function(e){localStorage.setItem("isAuthenticated",JSON.stringify({id:e.data.data.user._id,email:e.data.data.user.email})),L(!0),y(!1)})).catch((function(e){var t,a;y(!1);var n=null===(t=e.response.data.message.errors.email)||void 0===t?void 0:t.message,c=null===(a=e.response.data.message.errors.passwordConfirm)||void 0===a?void 0:a.message;D({e:n,m:c})}))},children:"SignUp"}),Object(x.jsx)(o.b,{to:"/login",className:"btn btn-danger btn-block",children:"Login"})]})})})]})})},C=c.a.lazy((function(){return a.e(3).then(a.bind(null,137))}));var k=function(){function e(e){var t=e.element;return localStorage.getItem("isAuthenticated")?t:Object(x.jsx)(i.a,{to:"/login"})}return console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_URL:"https://radiant-refuge-11101.herokuapp.com"})),Object(x.jsx)(n.Suspense,{fallback:Object(x.jsx)("div",{children:"Loading..."}),children:Object(x.jsx)(o.a,{children:Object(x.jsxs)(i.d,{children:[Object(x.jsx)(i.b,{path:"/login",element:Object(x.jsx)(y,{})}),Object(x.jsx)(i.b,{path:"/signup",element:Object(x.jsx)(w,{})}),Object(x.jsx)(i.b,{path:"/",element:Object(x.jsx)(e,{element:Object(x.jsx)(_,{})})}),Object(x.jsx)(i.b,{path:"/anime/:id",element:Object(x.jsx)(e,{element:Object(x.jsx)(C,{})})})]})})})},E=function(e){e&&e instanceof Function&&a.e(4).then(a.bind(null,138)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(k,{})}),document.getElementById("root")),E()},85:function(e,t,a){},86:function(e,t,a){}},[[125,1,2]]]);
//# sourceMappingURL=main.65f31e6b.chunk.js.map