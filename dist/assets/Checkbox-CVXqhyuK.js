import{a_ as h,j as a,a8 as P,a7 as y,a9 as B,cd as M,c5 as g,b1 as l,aa as n,af as _,r as u,ab as R,ac as S,ad as H,ae as E}from"./index-nP3sWgOM.js";const O=h(a.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=h(a.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=h(a.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return y("MuiCheckbox",o)}const x=P("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),N=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:c,color:s,size:r}=o,t={root:["root",c&&"indeterminate",`color${l(s)}`,`size${l(r)}`]},d=E(t,L,e);return n({},e,d)},D=B(M,{shouldForwardProp:o=>g(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:c}=o;return[e.root,c.indeterminate&&e.indeterminate,e[`size${l(c.size)}`],c.color!=="default"&&e[`color${l(c.color)}`]]}})(({theme:o,ownerState:e})=>n({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette[e.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:_(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${x.checked}, &.${x.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${x.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),W=a.jsx(U,{}),q=a.jsx(O,{}),w=a.jsx(V,{}),G=u.forwardRef(function(e,c){var s,r;const t=R({props:e,name:"MuiCheckbox"}),{checkedIcon:d=W,color:f="primary",icon:z=q,indeterminate:i=!1,indeterminateIcon:m=w,inputProps:I,size:p="medium",className:$}=t,j=S(t,N),C=i?m:z,k=i?m:d,v=n({},t,{color:f,indeterminate:i,size:p}),b=F(v);return a.jsx(D,n({type:"checkbox",inputProps:n({"data-indeterminate":i},I),icon:u.cloneElement(C,{fontSize:(s=C.props.fontSize)!=null?s:p}),checkedIcon:u.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:p}),ownerState:v,ref:c,className:H(b.root,$)},j,{classes:b}))});export{G as C};