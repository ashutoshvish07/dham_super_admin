import{c as r,O as A,Q as _,a0 as M,a2 as N,a3 as Y,j as t,G as y,B as I,a4 as h,a5 as G,W as R,o as O,a6 as P}from"./index-BBlBa7Qk.js";import{u as U}from"./formik.esm-iq-b8xKy.js";import{I as V}from"./ImageUpload-B5CAPUTE.js";import{A as W}from"./AutoComplete-BFe37Sf7.js";import{T as q}from"./TextField-CILEcrSZ.js";import{B as v}from"./InputLabel-BvzpAYWJ.js";import{A as K,D as L,h as Q,G as $}from"./GetToAction-DPWmTIJ3.js";import{l as H}from"./lodash-B-mYtyDl.js";import"./IconButton-D_eKau7j.js";import"./Skeleton-IcUOLArC.js";import"./Checkbox-CM1tfGSp.js";const D=S=>{var o;const[u,x]=r.useState([]),{cities_data:n,dialogProps:d,type:j}=S,{states:{states:c}}=A(s=>s.location),i=_();r.useEffect(()=>{i(M())},[]);const a=U({initialValues:{stateId:((o=n==null?void 0:n.stateId)==null?void 0:o._id)||"",name:(n==null?void 0:n.name)||""},onSubmit:s=>{var m;const p=new FormData;p.append("name",s.name),p.append("stateId",(m=s==null?void 0:s.stateId)==null?void 0:m._id),u&&u.map(z=>{p.append("file",z)}),j==="edit"?i(N({city_id:n==null?void 0:n._id,formData:p})).then(()=>{i(getAllCityAsync({page:1,page_size:10})),d==null||d.onClose()}):i(Y(p)).then(()=>{i(getAllCityAsync({page:1,page_size:10})),d==null||d.onClose()})}}),f=s=>{x(s)},l=s=>{x(u.filter(p=>p!==s))};return t.jsx("div",{children:t.jsxs("form",{onSubmit:a.handleSubmit,children:[t.jsxs(y,{container:!0,spacing:2,children:[t.jsx(y,{item:!0,xs:12,children:t.jsx(W,{options:c||[],label:"Select State",id:"state-select",name:"stateId",value:a.values.stateId,onChange:s=>{a.setFieldValue("stateId",s||"")},error:a.touched.stateId&&!!a.errors.stateId,helperText:a.touched.stateId&&a.errors.stateId,required:!0,optionKey:"_id",optionLabel:"name",color:"secondary"})}),t.jsx(y,{item:!0,xs:12,children:t.jsx(q,{fullWidth:!0,id:"name",name:"name",label:"City Name",value:a.values.name,onChange:a.handleChange,error:a.touched.name&&!!a.errors.name,helperText:a.touched.name&&a.errors.name})}),t.jsx(y,{item:!0,xs:12,children:t.jsx(V,{label:"Upload Your Images",files:u,setFiles:f,deleteFile:l})})]}),t.jsx(I,{sx:{display:"flex",justifyContent:"flex-end",marginTop:2},children:t.jsx(v,{type:"submit",variant:"outlined",color:"secondary",size:"medium",children:"Submit"})})]})})},re=()=>{var b;const[S,u]=r.useState(""),[x,n]=r.useState(null),[d,j]=r.useState(""),[c,i]=r.useState({open:!1,onClose:()=>i({...c,open:!1})}),[a,f]=r.useState({page:0,pageSize:10}),l=_(),{cities:o,loading:s,error:p}=A(e=>e.location),{states:m}=A(e=>e.location);r.useEffect(()=>{l(h({page:1,page_size:10}))},[l]);const z=()=>{u("Add City"),n(t.jsx(D,{dialogProps:c,state:m==null?void 0:m.states})),i({...c,open:!0})},F=e=>{const g=o==null?void 0:o.cities.find(C=>C._id===e);u("Edit Country"),n(t.jsx(D,{dialogProps:c,cities_data:g,type:"edit"})),i({...c,open:!0})},T=e=>{l(P({city_id:e})),l(h({page:1,page_size:10}))},w=[{field:"file",headerName:"Media",width:200,renderCell:e=>{var g,C;return t.jsx("img",{alt:(g=e==null?void 0:e.value)==null?void 0:g.Bucket,src:(C=e==null?void 0:e.value)==null?void 0:C.Url,height:140,width:80})}},{field:"name",headerName:"City name",flex:2},{field:"createdAt",headerName:"Added Date",flex:2,renderCell:e=>Q(e.value).format("DD/MM/YYYY")},{field:"_id",headerName:"Action",flex:1,renderCell:e=>$(e.value,F,T)}],B=e=>{e.pageSize==a.pageSize?(l(h({page:e.page+1,page_size:e.pageSize})),f(e)):(l(h({page:e.page,page_size:e.pageSize})),f({page:1,pageSize:e.pageSize}))},k=r.useCallback(H.debounce(e=>{l(h({page:a.page+1,page_size:a==null?void 0:a.pageSize,search:e}))},1e3),[]),E=e=>{const g=e.target.value;j(g),k(g)};return t.jsxs("div",{children:[t.jsx(K,{title:S,content:x,dialogProps:c}),t.jsxs(I,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[t.jsx(I,{children:t.jsx(G,{value:d,handleSearchChange:E})}),t.jsx(v,{sx:{borderRadius:2},variant:"outlined",color:"secondary",size:"large",onClick:z,startIcon:t.jsx(R,{size:14}),children:"City"})]}),t.jsx(O,{children:t.jsx(L,{data:o==null?void 0:o.cities,columns:w,getRowId:e=>e._id,loading:s,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:(b=o==null?void 0:o.cities)==null?void 0:b.length,paginationMode:"server",onPaginationModelChange:B,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{re as default};
