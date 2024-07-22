import{u as F,Q as k,bw as D,aD as b,O as x,c as h,j as e,bx as E,$ as p,am as j,aw as L,aS as y,T as m,B as g,by as W,G as t,bz as z,bA as M}from"./index-BBlBa7Qk.js";import{A as q,a as H}from"./AuthCardWrapper-D1AmCNZ4.js";import{c as T,a as w}from"./index.esm-CIT1Jkon.js";import{F as $}from"./formik.esm-iq-b8xKy.js";import{d as G,a as O}from"./VisibilityOff-BBSdqRqn.js";import{I as f,F as c,B as Q}from"./InputLabel-BvzpAYWJ.js";import{I as V}from"./IconButton-D_eKau7j.js";const _=({...l})=>{const i=F(),v=k(),A=D();b(i.breakpoints.down("md")),x(s=>s.customization),h.useState(!0);const I=x(s=>s.auth);console.log(I);const[d,B]=h.useState(!1),C=()=>{B(!d)},S=s=>{s.preventDefault()};return e.jsx(e.Fragment,{children:e.jsx($,{initialValues:{email:"",password:"",submit:null},validationSchema:T().shape({email:w().email("Must be a valid email").max(255).required("Email is required"),password:w().max(255).required("Password is required")}),onSubmit:(s,{setSubmitting:a,setErrors:r})=>{v(E({email:s.email,password:s.password})).then(n=>{console.log("res at AuthLogin",n),n.payload.success&&A("/otp-verification"),a(!1)}).catch(n=>{r({submit:n.message}),a(!1)})},children:({errors:s,handleBlur:a,handleChange:r,handleSubmit:n,isSubmitting:P,touched:o,values:u})=>e.jsxs("form",{noValidate:!0,onSubmit:n,...l,children:[e.jsxs(p,{fullWidth:!0,error:!!(o.email&&s.email),sx:{...i.typography.customInput},children:[e.jsx(f,{htmlFor:"outlined-adornment-email-login",children:"Email Address"}),e.jsx(j,{id:"outlined-adornment-email-login",type:"email",value:u.email,name:"email",onBlur:a,onChange:r,label:"Email Address ",inputProps:{}}),o.email&&s.email&&e.jsx(c,{error:!0,id:"standard-weight-helper-text-email-login",children:s.email})]}),e.jsxs(p,{fullWidth:!0,error:!!(o.password&&s.password),sx:{...i.typography.customInput},children:[e.jsx(f,{htmlFor:"outlined-adornment-password-login",children:"Password"}),e.jsx(j,{id:"outlined-adornment-password-login",type:d?"text":"password",value:u.password,name:"password",onBlur:a,onChange:r,endAdornment:e.jsx(L,{position:"end",children:e.jsx(V,{"aria-label":"toggle password visibility",onClick:C,onMouseDown:S,edge:"end",size:"large",children:d?e.jsx(G,{}):e.jsx(O,{})})}),label:"Password",inputProps:{}}),o.password&&s.password&&e.jsx(c,{error:!0,id:"standard-weight-helper-text-password-login",children:s.password})]}),e.jsx(y,{direction:"row",alignItems:"center",justifyContent:"flex-end",spacing:1,children:e.jsx(m,{variant:"subtitle1",color:"secondary",sx:{textDecoration:"none",cursor:"pointer"},children:"Forgot Password?"})}),s.submit&&e.jsx(g,{sx:{mt:3},children:e.jsx(c,{error:!0,children:s.submit})}),e.jsx(g,{sx:{mt:2},children:e.jsx(W,{children:e.jsx(Q,{disableElevation:!0,disabled:P,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]})})})},Z=()=>{const l=b(i=>i.breakpoints.down("md"));return e.jsx(q,{children:e.jsxs(t,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:e.jsx(t,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:e.jsx(H,{children:e.jsxs(t,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[e.jsx(t,{item:!0,sx:{mb:3},children:e.jsx(z,{to:"#","aria-label":"logo",children:e.jsx(M,{})})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,direction:{xs:"column-reverse",md:"row"},alignItems:"center",justifyContent:"center",children:e.jsx(t,{item:!0,children:e.jsxs(y,{alignItems:"center",justifyContent:"center",spacing:1,children:[e.jsx(m,{color:"secondary.main",gutterBottom:!0,variant:l?"h3":"h2",children:"Hi, Welcome Back"}),e.jsx(m,{variant:"caption",fontSize:"16px",textAlign:{xs:"center",md:"inherit"},children:"Enter your credentials to continue"})]})})})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(_,{})})]})})})})}),e.jsx(t,{item:!0,xs:12,sx:{m:3,mt:1}})]})})};export{Z as default};
