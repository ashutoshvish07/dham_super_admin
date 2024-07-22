import{c as s,Q as z,j as t,B as m,af as F,ag as g,ah as P,O as I,a5 as k,W as B,o as M,ai as R}from"./index-BBlBa7Qk.js";import{F as U,a as N,b as E}from"./formik.esm-iq-b8xKy.js";import{T as O}from"./TextField-CILEcrSZ.js";import{B as S}from"./InputLabel-BvzpAYWJ.js";import{A as Y,D as G,h as L,G as W}from"./GetToAction-DPWmTIJ3.js";import{l as Q}from"./lodash-B-mYtyDl.js";import"./IconButton-D_eKau7j.js";import"./Skeleton-IcUOLArC.js";import"./Checkbox-CM1tfGSp.js";const A=h=>{const{aminity_data:o}=h,[x,f]=s.useState(null),a=z(),u=i=>{const n=i.currentTarget.files[0];f(URL.createObjectURL(n))},l=(i,{setSubmitting:n})=>{const p=new FormData;p.append("name",i.name),i.image&&p.append("file",i.image),type===" edit"?a(F({id:o._id,formData:p})).then(()=>{a(g({page:1,page_size:10}))}):a(P(p)).then(()=>{a(g({page:1,page_size:10}))}),h.dialogProps.onClose(),n(!1)};return t.jsx(U,{initialValues:{name:(o==null?void 0:o.name)||"",file:null},onSubmit:l,children:({setFieldValue:i})=>t.jsxs(N,{children:[t.jsx(m,{mb:2,children:t.jsx(E,{name:"name",children:({field:n})=>t.jsx(O,{...n,label:"Name",variant:"outlined",fullWidth:!0,color:"secondary"})})}),t.jsx(m,{mb:2,children:t.jsxs(S,{variant:"contained",component:"label",color:"secondary",children:["Upload Image",t.jsx("input",{type:"file",hidden:!0,accept:"image/*",onChange:n=>{u(n),i("image",n.currentTarget.files[0])}})]})}),x&&t.jsx(m,{mb:2,children:t.jsx("img",{src:x,alt:"Preview",width:"100"})}),t.jsx(m,{sx:{display:"flex",justifyContent:"flex-end",marginTop:2},children:t.jsx(S,{type:"submit",variant:"outlined",color:"secondary",size:"medium",children:"Submit"})})]})})},ae=()=>{const[h,o]=s.useState(""),[x,f]=s.useState(null),[a,u]=s.useState({open:!1,onClose:()=>u({...a,open:!1})}),[l,i]=s.useState({page:0,pageSize:10}),[n,p]=s.useState(""),r=z(),{amenities:d,loading:b,error:V}=I(e=>e.hotel);s.useEffect(()=>{r(g({page:1,page_size:10}))},[r]);const C=()=>{o("Add Amenities"),f(t.jsx(A,{dialogProps:a})),u({...a,open:!0})},y=e=>{const c=d==null?void 0:d.data.find(j=>j._id===e);o("Update Amenities"),f(t.jsx(A,{dialogProps:a,aminity_data:c,type:"edit"})),u({...a,open:!0})},D=e=>{r(R({id:e})).then(()=>{r(g({page:1,page_size:10}))})},v=[{field:"file",headerName:"Media",width:200,renderCell:e=>{var c,j;return t.jsx("img",{alt:(c=e==null?void 0:e.value)==null?void 0:c.Bucket,src:(j=e==null?void 0:e.value)==null?void 0:j.Url,height:50,width:50,style:{objectFit:"contain"}})}},{field:"name",headerName:"Aminities ",flex:2},{field:"createdAt",headerName:"Added Date",flex:2,renderCell:e=>L(e.value).format("DD/MM/YYYY")},{field:"_id",headerName:"Action",flex:2,renderCell:e=>W(e.value,y,D)}],T=e=>{e.pageSize==l.pageSize?(r(g({page:e.page+1,page_size:e.pageSize})),i(e)):(r(g({page:e.page,page_size:e.pageSize})),i({page:1,pageSize:e.pageSize}))},_=s.useCallback(Q.debounce(e=>{r(g({page:l.page+1,page_size:l==null?void 0:l.pageSize,search:e}))},1e3),[]),w=e=>{const c=e.target.value;p(c),_(c)};return t.jsxs("div",{children:[t.jsx(Y,{title:h,content:x,dialogProps:a}),t.jsxs(m,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[t.jsx(m,{children:t.jsx(k,{value:n,handleSearchChange:w})}),t.jsx(S,{sx:{borderRadius:2},variant:"outlined",color:"secondary",size:"large",onClick:C,startIcon:t.jsx(B,{size:14}),children:"Amenities"})]}),t.jsx(M,{children:t.jsx(G,{data:d.data,columns:v,getRowId:e=>e._id,loading:b,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:d==null?void 0:d.count,paginationMode:"server",onPaginationModelChange:T,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{ae as default};
