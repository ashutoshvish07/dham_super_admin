import{a as j,M as i,N as w,j as t,B as x,G as h,r,u as B,S as F,F as M,P as N}from"./index-nP3sWgOM.js";import{G}from"./GetToAction-p5I7uB52.js";import{A as R}from"./Dialog-D7RuuEns.js";import{u as _}from"./formik.esm-Dyqt8FN9.js";import{c as E,a as Y}from"./index.esm-B2q6Cw9c.js";import{T as I}from"./TextField-Btu36Zmo.js";import{B as z}from"./Button-DYMAArme.js";import{l as q}from"./lodash-CeyOGm4C.js";import{h as O}from"./moment-G82_0lEo.js";import{D as $}from"./DataTable-BAyMAVN6.js";import"./InputLabel-DaDe49tm.js";import"./MenuItem-vSBr2iRT.js";import"./index-CcBqUUtn.js";import"./DialogContent-CAWl_w7U.js";import"./Autocomplete-Cb93hnIo.js";import"./Close-CYbAYMXT.js";import"./Checkbox-CVXqhyuK.js";import"./Skeleton-DY2pMhD5.js";import"./colorManipulator-BTVsESXO.js";import"./useThemeProps-Cp5GSgP0.js";const U=u=>{const{dialogProps:c,guid_data:s,edit:g}=u,o=j(),n=E({name:Y().required("Required")}),a=_({initialValues:{name:(s==null?void 0:s.name)||""},validationSchema:n,onSubmit:m=>{const l=new FormData;l.append("name",m.name),g?o(updateGuidAsync({formData:l,id:s==null?void 0:s._id})).then(()=>{o(i({page:1,page_size:10}))}):o(w(l)).then(()=>{o(i({page:1,page_size:10}))}),c.onClose()}});return t.jsx("div",{children:t.jsx(x,{component:"form",onSubmit:a.handleSubmit,sx:{mt:3},children:t.jsxs(h,{container:!0,spacing:2,children:[t.jsx(h,{item:!0,xs:12,sm:12,children:t.jsx(I,{fullWidth:!0,id:"name",name:"name",label:"Name",color:"secondary",value:a.values.name,onChange:a.handleChange,error:a.touched.name&&!!a.errors.name,helperText:a.touched.name&&a.errors.name})}),t.jsx(h,{item:!0,xs:12,sx:{display:"flex",justifyContent:"flex-end",marginTop:2},children:t.jsx(z,{color:"secondary",variant:"outlined",type:"submit",children:"Submit"})})]})})})},de=()=>{var f;const[u,c]=r.useState(""),[s,g]=r.useState(null),[o,n]=r.useState({open:!1,onClose:()=>n({...o,open:!1})}),[a,m]=r.useState({page:0,pageSize:10}),[l,C]=r.useState(""),p=j(),{properties:d,loading:y,error:V}=B(e=>e.hotel);r.useEffect(()=>{p(i({page:1,page_size:10}))},[p]);const P=()=>{c("Add Properties"),g(t.jsx(U,{dialogProps:o})),n({...o,open:!0})},b=e=>{c("Update Properties"),n({...o,open:!0})},v=e=>{},A=[{field:"name",headerName:"Propertie Name ",flex:2},{field:"createdAt",headerName:"Added Date",flex:2,renderCell:e=>O(e.value).format("DD/MM/YYYY")},{field:"_id",headerName:"Action",flex:2,renderCell:e=>G(e.value,b,v)}],D=e=>{e.pageSize==a.pageSize?(p(i({page:e.page+1,page_size:e.pageSize})),m(e)):(p(i({page:e.page,page_size:e.pageSize})),m({page:1,pageSize:e.pageSize}))},T=r.useCallback(q.debounce(e=>{p(i({page:a.page+1,page_size:a==null?void 0:a.pageSize,search:e}))},1e3),[]),k=e=>{const S=e.target.value;C(S),T(S)};return t.jsxs("div",{children:[t.jsx(R,{title:u,content:s,dialogProps:o}),t.jsxs(x,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[t.jsx(x,{children:t.jsx(F,{value:l,handleSearchChange:k})}),t.jsx(z,{sx:{borderRadius:2},variant:"outlined",color:"secondary",size:"large",onClick:P,startIcon:t.jsx(M,{size:14}),children:"Properties"})]}),t.jsx(N,{children:t.jsx($,{data:d.propertyType,columns:A,getRowId:e=>e.id,loading:y,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:(f=d==null?void 0:d.propertyType)==null?void 0:f.length,paginationMode:"server",onPaginationModelChange:D,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{de as default};
