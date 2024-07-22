import{Q as W,c,O as Y,a4 as O,as as _,at as g,au as $,j as e,G as h,$ as M,B as A,W as U,o as Q,av as V}from"./index-BBlBa7Qk.js";import{I as H}from"./ImageUpload-B5CAPUTE.js";import{u as J}from"./formik.esm-iq-b8xKy.js";import{c as K,a as b}from"./index.esm-CIT1Jkon.js";import{T as q,S as w}from"./TextField-CILEcrSZ.js";import{I as k,B as G}from"./InputLabel-BvzpAYWJ.js";import{M as E}from"./Skeleton-IcUOLArC.js";import{A as X,D as Z,h as ee,G as te}from"./GetToAction-DPWmTIJ3.js";import{S as ae}from"./SearchBar-BUTMD4PE.js";import{l as ie}from"./lodash-B-mYtyDl.js";import"./IconButton-D_eKau7j.js";import"./Checkbox-CM1tfGSp.js";const P=B=>{var T,l,j,y,C,S,I,v,z,a,r,N;const{dialogProps:u,near_by_data:s,edit:x}=B,o=W(),[p,f]=c.useState([]),{cities:m,loading:F}=Y(i=>i.location);c.useEffect(()=>{o(O())},[]);const D=i=>{f(i)},n=i=>{f(p.filter(d=>d!==i))},t=J({initialValues:{name:(s==null?void 0:s.name)||"",description:(s==null?void 0:s.description)||"",cityId:((T=s==null?void 0:s.cityId)==null?void 0:T._id)||"",type:(s==null?void 0:s.type)||""},validationSchema:K({name:b().required("Required"),description:b().required("Required"),cityId:b().required("Required"),type:b().required("Required")}),onSubmit:i=>{const d=new FormData;d.append("name",i.name),d.append("description",i.description),d.append("cityId",i.cityId),d.append("type",i.type),p&&p.map(L=>{d.append("file",L)}),x==="edit"?o(_({formData:d,id:s==null?void 0:s._id})).then(()=>{o(g({page:1,page_size:10}))}):(o($(d)),then(()=>{o(g({page:1,page_size:10}))})),u==null||u.onClose()}}),R=[{_id:"top_sights",name:"Top Sights"},{_id:"restaurants",name:"Restaurants"},{_id:"comunication",name:"Comunication"}];return e.jsx("div",{children:e.jsxs("form",{onSubmit:t.handleSubmit,children:[e.jsxs(h,{container:!0,spacing:2,children:[e.jsx(h,{item:!0,xs:12,sm:6,children:e.jsx(q,{color:"secondary",fullWidth:!0,id:"name",name:"name",label:"Name",value:(l=t.values)==null?void 0:l.name,onChange:t==null?void 0:t.handleChange,error:((j=t.touched)==null?void 0:j.name)&&!!((y=t.errors)!=null&&y.name),helperText:((C=t.touched)==null?void 0:C.name)&&((S=t.errors)==null?void 0:S.name)})}),e.jsx(h,{item:!0,xs:12,sm:6,children:e.jsx(q,{color:"secondary",fullWidth:!0,id:"description",name:"description",label:"Description",minRows:2,value:(I=t.values)==null?void 0:I.description,onChange:t.handleChange,error:((v=t.touched)==null?void 0:v.description)&&!!((z=t.errors)!=null&&z.description),helperText:t.touched.description&&t.errors.description})}),e.jsx(h,{item:!0,xs:12,sm:6,children:e.jsxs(M,{fullWidth:!0,error:t.touched.type&&!!t.errors.type,color:"secondary",children:[e.jsx(k,{id:"type-label",children:"Type"}),e.jsx(w,{labelId:"type-label",id:"type",name:"type",value:(a=t.values)==null?void 0:a.type,onChange:t.handleChange,label:"Type",children:R.map(i=>e.jsx(E,{value:i==null?void 0:i._id,children:i==null?void 0:i.name},i._id))}),t.touched.cityId&&t.errors.cityId&&e.jsx("div",{style:{color:"red",fontSize:"12px"},children:t.errors.cityId})]})}),e.jsx(h,{item:!0,xs:12,sm:6,children:e.jsxs(M,{fullWidth:!0,error:t.touched.cityId&&!!t.errors.cityId,color:"secondary",children:[e.jsx(k,{id:"cityId-label",children:"City"}),e.jsx(w,{labelId:"cityId-label",id:"cityId",name:"cityId",value:(r=t.values)==null?void 0:r.cityId,onChange:t.handleChange,label:"City",children:(N=m==null?void 0:m.cities)==null?void 0:N.map(i=>e.jsx(E,{value:i==null?void 0:i._id,children:i==null?void 0:i.name},i._id))}),t.touched.cityId&&t.errors.cityId&&e.jsx("div",{style:{color:"red",fontSize:"12px"},children:t.errors.cityId})]})}),e.jsx(h,{item:!0,xs:12,children:e.jsx(H,{files:p,setFiles:D,deleteFile:n,multiple:!0})})]}),e.jsx(A,{sx:{display:"flex",justifyContent:"flex-end",marginTop:2},children:e.jsx(G,{type:"submit",variant:"outlined",color:"secondary",size:"medium",children:"Submit"})})]})})},xe=()=>{const[B,u]=c.useState(""),[s,x]=c.useState(null),[o,p]=c.useState({open:!1,onClose:()=>p({...o,open:!1})}),[f,m]=c.useState({page:0,pageSize:10}),[F,D]=c.useState(""),{nearBy:n,loading:t,status:R,error:T}=Y(a=>a.location),l=W();c.useEffect(()=>{l(g({page:1,page_size:10}))},[l]);const j=()=>{u("Add NearBy Locations"),x(e.jsx(P,{dialogProps:o})),p({...o,open:!0})},y=a=>{const r=n==null?void 0:n.nearbies.find(N=>N._id===a);u("Update NearBy Locations"),x(e.jsx(P,{dialogProps:o,near_by_data:r,edit:"edit"})),p({...o,open:!0})},C=a=>{a.pageSize==f.pageSize?(l(g({page:a.page+1,page_size:a.pageSize})),m(a)):(l(g({page:a.page,page_size:a.pageSize})),m({page:1,pageSize:a.pageSize}))},S=a=>{l(V({id:a}))},I=[{field:"name",headerName:"Name",flex:1},{field:"cityId",headerName:"City ",flex:1,renderCell:a=>{var r;return(r=a==null?void 0:a.value)==null?void 0:r.name}},{field:"description",headerName:"Description",flex:2},{field:"type",headerName:"Type",flex:1},{field:"createdAt",headerName:"Added Date",flex:1,renderCell:a=>ee(a.value).format("DD/MM/YYYY")},{field:"_id",headerName:"Action",flex:1,renderCell:a=>te(a.value,y,S)}],v=c.useCallback(ie.debounce(a=>{l(g({page:1,page_size:10,search:a}))},3e3),[]),z=a=>{const r=a.target.value;D(r),v(r)};return e.jsxs("div",{children:[e.jsx(X,{title:B,content:s,dialogProps:o}),e.jsxs(A,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[e.jsx(A,{children:e.jsx(ae,{value:F,onChange:z,placeholder:"Search...",size:"small",color:"secondary"})}),e.jsx(G,{sx:{borderRadius:2},variant:"outlined",color:"secondary",size:"large",onClick:j,startIcon:e.jsx(U,{size:14}),children:"Near by"})]}),e.jsx(Q,{children:e.jsx(Z,{data:n==null?void 0:n.nearbies,columns:I,getRowId:a=>a._id,loading:t,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:n==null?void 0:n.count,paginationMode:"server",onPaginationModelChange:C,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{xe as default};
